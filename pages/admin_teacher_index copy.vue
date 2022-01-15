<template>
  <v-app>
    <v-card
      class="mt-5"
    >
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="teachers"
        :items-per-page="5"
        :search="search"
        class="elevation-1"
      >
        <template #top>
          <v-toolbar
            flat
          >
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
                  先生追加
                </v-btn>
              </template>
              <v-card>
                <v-row>
                  <v-col>
                    <v-avatar
                      class="profile pt-3"
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
                  >
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle>名前</v-list-item-subtitle>
                        <v-list-item-title
                          class="text-h5 pt-1 pl-4"
                        >
                          {{ showTeacher.name }}
                        </v-list-item-title>
                        <v-divider />
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle>メールアドレス</v-list-item-subtitle>
                        <v-list-item-title
                          class="text-h5 pt-1 pl-4"
                        >
                          {{ showTeacher.email }}
                        </v-list-item-title>
                        <v-divider />
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle>担当教科</v-list-item-subtitle>
                        <v-list-item-title
                          class="text-h5 pt-1 pl-4"
                        >
                          {{ showTeacher.subject }}
                        </v-list-item-title>
                        <v-divider />
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
                <v-col>
                  <v-list-item-subtitle
                    class="pb-2 pl-2"
                  >
                    自己紹介
                  </v-list-item-subtitle>
                  <v-card
                    outlined
                    class="text-h6 pa-5"
                  >
                    {{ showTeacher.introduction }}
                  </v-card>
                </v-col>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    保存
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
            @click="editItem(item), showItem(teacher)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
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
    </v-card>
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
      { text: '編集/削除', value: 'actions', sortable: false }
    ],
    showTeacher: {
      name: '',
      email: '',
      teacher_icon: '',
      introduction: '',
      subjects: {
        teacher_id: '',
        subject: ''
      }
    },
    editedIndex: -1,
    editedItem: {
      name: '',
      email: '',
      teacher_icon: '',
      introduction: '',
      subjects: {
        teacher_id: '',
        subject: ''
      }
    },
    defaultItem: {
      name: '',
      email: '',
      teacher_icon: '',
      introduction: '',
      subjects: {
        teacher_id: '',
        subject: ''
      }
    }
  }),

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  methods: {
    showItem (teacher) {
      this.showTeacher = Object.assign({}, teacher)
      console.log(this.showTeacher)
      this.dialog = true
    },
    setImage () {
      if (this.showTeacher.teacher_icon) {
        return this.showTeacher.teacher_icon
      } else {
        return '/img/default_icon.png'
      }
    },
    editItem (item) {
      this.editedIndex = this.teachers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.teachers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.teachers.splice(this.editedIndex, 1)
      this.closeDelete()
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

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.teachers[this.editedIndex], this.editedItem)
      } else {
        this.teachers.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
