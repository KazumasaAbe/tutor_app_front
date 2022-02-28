<template>
  <v-app>
    <h2 style="color:#9A9A9A;">
      お知らせ一覧
    </h2>
    <v-data-table
      :headers="headers"
      :items="notices"
      :search="search"
      sort-by="created_at"
      :sort-desc="true"
      class="elevation-1"
    >
      <template #[`item.created_at`]="{ item }">
        <span>
          {{ dateFormat(item.created_at) }}
        </span>
      </template>
      <template #top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  新規作成
                </v-btn>
              </template>
            </v-dialog>
          </v-toolbar-title>
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
          <v-dialog
            v-model="dialog"
            max-width="600px"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
                <v-spacer />
                <v-icon
                  x-large
                  color="black"
                  @click="close"
                >
                  mdi-close-box-outline
                </v-icon>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="notice.title"
                        label="title"
                      >
                        <template #prepend>
                          <v-img
                            v-model="notice.title"
                            max-height="25"
                            max-width="25"
                            :src="iconImag()"
                          />
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-img
                        v-model="notice.notice_image"
                        max-height="250"
                        max-width="250"
                        :src="setImage()"
                      />
                      <v-file-input
                        v-model="image"
                        class="mt-3"
                        truncate-length="15"
                        label="File input"
                        prepend-icon="mdi-camera"
                        outlined
                        dense
                        @change="changeFile(image)"
                      />
                    </v-col>
                    <v-col
                      class="notice-text"
                      cols="12"
                      sm="12"
                      md="12"
                    >
                      本文
                      <v-textarea
                        v-model="notice.text"
                        outlined
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-dialog>
                  <template #activator="{ on, attrs }">
                    <v-btn
                      v-if="editedIndex > -1"
                      color="primary"
                      dark
                      class="mb-2 notice-btn"
                      v-bind="attrs"
                      @click="save"
                      v-on="on"
                    >
                      保存
                    </v-btn>
                    <v-btn
                      v-else
                      color="primary"
                      dark
                      class="mb-2 notice-btn"
                      v-bind="attrs"
                      @click="save"
                      v-on="on"
                    >
                      投稿
                    </v-btn>
                  </template>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                本当に削除しますか？
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="closeDelete">
                  キャンセル
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                  削除
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          class="mr-2"
          color="primary"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          color="red"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template #no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
export default {
  middleware: 'adminRedirect',
  async asyncData ({ $axios }) {
    let notices = []
    await $axios.$get('/api/v1/notices')
      .then(res => (notices = res))
    return { notices }
  },
  data: () => ({
    image: null,
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      {
        text: '日付',
        align: 'start',
        value: 'created_at'
      },
      { text: 'title', value: 'title' },
      { text: '編集/削除', value: 'actions', sortable: false }
    ],
    notices: [],
    notice: {
      id: '',
      title: '',
      notice_image: '',
      text: ''
    },
    editedIndex: -1,
    defaultItem: {
      title: '',
      notice_image: '',
      text: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新規作成' : '編集'
    },
    dateFormat () {
      return (date) => {
        return this.$dayjs(date).format('YYYY/MM/DD')
      }
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.notices = []
      this.$axios.$get('/api/v1/notices')
        .then(res => (this.notices = res))
    },

    iconImag () {
      if (this.notice.notice_title) {
        return this.notice.title
      } else {
        return '/img/title.png'
      }
    },
    setImage () {
      if (this.notice.notice_image) {
        return this.notice.notice_image
      } else {
        return '/img/notice_img.png'
      }
    },

    changeFile (img) {
      if (img) {
        this.notice.notice_image = URL.createObjectURL(this.image)
      } else {
        this.notice.notice_image = '/img/notice_img.png'
      }
    },

    editItem (item) {
      this.editedIndex = this.notices.indexOf(item)
      this.notice = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.notices.indexOf(item)
      this.notice = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      const url = `/api/v1/notices/${this.notice.id}`
      this.$axios.$delete(url)
      this.notices.splice(this.editedIndex, 1)
      this.$store.dispatch(
        'flashMessage/showMessage',
        {
          message: '削除しました',
          type: 'error',
          status: true
        }
      )
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.notice = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.notice = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        const url = `/api/v1/notices/${this.notice.id}`
        this.$axios.$patch(url, this.notice)
        Object.assign(this.notices[this.editedIndex], this.notice)
        this.$store.dispatch(
          'flashMessage/showMessage',
          {
            message: '編集しました',
            type: 'success',
            status: true
          }
        )
      } else {
        this.$axios.$post('/api/v1/notices', this.notice)
          .then(res => this.notices.push(res))
        // this.notices.push(this.notice)
        // console.log(this.notices)
        this.$store.dispatch(
          'flashMessage/showMessage',
          {
            message: '新規登録しました',
            type: 'success',
            status: true
          }
        )
      }
      this.close()
    }
  }
}
</script>
<style scoped>
.notice-text {
  margin-top: -50px;
}
.notice-btn {
  margin-top: -50px;
}
</style>
