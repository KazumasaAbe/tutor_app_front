<template>
  <v-app>
    <h2 class="mt-2">
      先生一覧
    </h2>
    <v-data-table
      :headers="headers"
      :items="teachers"
      :items-per-page="5"
      :search="search"
      class="elevation-1 text-h6 mt-3"
    >
      <template #top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>
            <v-dialog
              v-model="dialog"
              max-width="650px"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2 mt-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  先生追加
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
            max-width="650px"
          >
            <v-card>
              <v-card>
                <v-row>
                  <v-col>
                    <v-avatar
                      class="profile pt-3 ml-3 mt-3"
                      size="200"
                      tile
                    >
                      <v-img
                        :src="setImage()"
                      />
                    </v-avatar>
                  </v-col>
                  <v-col
                    class="mt-4"
                    cols="6"
                  >
                    <v-list-item
                      class="ml-5"
                    >
                      <v-list-item-content>
                        <v-list-item-subtitle>名前</v-list-item-subtitle>
                        <v-text-field
                          v-model="showTeacher.name"
                          class="text-h5 pt-1 pl-4"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      class="ml-5 mt-n5"
                    >
                      <v-list-item-content>
                        <v-list-item-subtitle>メールアドレス</v-list-item-subtitle>
                        <v-text-field
                          v-model="showTeacher.email"
                          class="text-h6 pt-1 pl-4"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      class="ml-5 mt-n5"
                    >
                      <v-list-item-content>
                        <v-list-item-subtitle>担当教科</v-list-item-subtitle>
                        <v-text-field
                          v-model="showTeacher.subject"
                          class="text-h5 pt-1 pl-4"
                        />
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col>
                    <v-card-actions>
                      <v-spacer />
                      <v-icon
                        class="mr-2"
                        @click="close"
                      >
                        mdi-close-box-outline
                      </v-icon>
                    </v-card-actions>
                  </v-col>
                </v-row>
                <v-col>
                  <v-list-item-subtitle
                    class="pb-2 pl-2"
                  >
                    自己紹介
                  </v-list-item-subtitle>
                  <v-textarea
                    v-model="showTeacher.introduction"
                    outlined
                    class="text-h5"
                  />
                </v-col>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="update"
                  >
                    更新
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    キャンセル
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                この先生を削除します。よろしいですか？
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn color="red darken-1" text @click="closeDelete">
                  いいえ
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                  はい
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          class="mr-1"
          color="blue"
          @click="showItem(item)"
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
    </v-data-table>
  </v-app>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    let teachers = []
    await $axios.$get('/api/v1/teachers')
      .then(res => (teachers = res))
    return { teachers }
  },
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: '名前',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: '', value: '', sortable: false },
      { text: '', value: '', sortable: false },
      { text: '', value: '', sortable: false },
      { text: '', value: '', sortable: false },
      { text: '', value: '', sortable: false },
      { text: '', value: '', sortable: false },
      { text: '', value: '', sortable: false },
      { text: '', value: '', sortable: false },
      { text: '編集/削除', value: 'actions', sortable: false }
    ],
    showTeacher: {
      name: '',
      email: '',
      teacher_icon: '',
      introduction: '',
      subjects: {
        id: [],
        subject: []
      }
    }
  }),
  methods: {
    showItem (item) {
      this.showTeacher = Object.assign({}, item)
      this.dialog = true
    },
    setImage () {
      if (this.showTeacher.teacher_icon) {
        return this.showTeacher.teacher_icon
      } else {
        return '/img/default_icon.png'
      }
    },
    deleteItem (item) {
      this.showTeacher = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      const url = `/api/v1/teachers/${this.showTeacher.id}`
      this.$axios.delete(url)
        .then(() => {
          this.$store.dispatch(
            'flashMessage/showMessage',
            {
              message: '先生情報を削除しました',
              type: 'danger',
              status: true
            }
          )
          this.$router.go('/admin_teacher_index')
        })
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    update () {
      const url = `/api/v1/teachers/${this.showTeacher.id}`
      this.$axios.put(url, this.showTeacher)
        .then((res) => {
          this.dialog = false
          this.$store.dispatch(
            'flashMessage/showMessage',
            {
              message: '先生情報を更新しました',
              type: 'info',
              status: true
            }
          )
          this.$router.go('/admin_teacher_index')
        })
    }
  }
}
</script>
