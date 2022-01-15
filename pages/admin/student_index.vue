<template>
  <v-app>
    <h2 class="mt-2">
      生徒一覧
    </h2>
    <v-card
      class="mt-5"
    >
      <v-toolbar
        flat
      >
        <v-card-title
          class="ml-auto"
        >
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-card-title>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="students"
        :items-per-page="5"
        :search="search"
        class="elevation-1 text-h6"
      >
        <template #top>
          <v-toolbar
            flat
          >
            <v-dialog
              v-model="dialog"
              max-width="700px"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  生徒追加
                </v-btn>
              </template>
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
                          v-model="showStudent.name"
                          class="text-h5 pt-1 pl-4"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      class="ml-5"
                    >
                      <v-list-item-content>
                        <v-list-item-subtitle>メールアドレス</v-list-item-subtitle>
                        <v-text-field
                          v-model="showStudent.email"
                          class="text-h6 pt-1 pl-4"
                        />
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        outlined
                        small
                        @click="dialog = false"
                      >
                        ✖️
                      </v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
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
            small
            class="mr-2"
            color="blue"
            @click="showItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            color="red"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'StudentIndex',
  async asyncData ({ $axios }) {
    let students = []
    await $axios.$get('/api/v1/students')
      .then(res => (students = res))
    return { students }
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
    showStudent: {
      name: '',
      email: '',
      post_code: '',
      address: '',
      birthday: '',
      student_icon: '',
      teacher_id: ''
    }
  }),
  methods: {
    showItem (item) {
      this.showStudent = Object.assign({}, item)
      this.dialog = true
    },
    setImage () {
      if (this.showStudent.student_icon) {
        return this.showStudent.student_icon
      } else {
        return '/img/default_icon.png'
      }
    },
    deleteItem (item) {
      this.showStudent = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      const url = `/api/v1/students/${this.showStudent.id}`
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
          this.$router.go('/admin_student_index')
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
      const url = `/api/v1/students/${this.showStudent.id}`
      this.$axios.put(url, this.showStudent)
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
          this.$router.go('/admin_student_index')
        })
    }
  }
}
</script>
