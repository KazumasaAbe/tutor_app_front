<template>
  <v-app>
    <h2 class="mt-2">
      生徒一覧
    </h2>
    <v-data-table
      :headers="headers"
      :items="students"
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
              v-model="dialogNew"
              max-width="600px"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2 mt-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="showAddStudent"
                >
                  生徒追加
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
            v-model="dialogNew"
            persistent
            max-width="650px"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">新規登録（生徒）</span>
                <v-spacer />
                <v-icon
                  class="mr-2"
                  label="名前"
                  @click="dialogNew = false"
                >
                  mdi-close-box-outline
                </v-icon>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <p
                        v-for="(error , i) in errors"
                        :key="i"
                        class="text-red"
                      >
                        ・{{ error }}
                      </p>
                      <p v-show="conformed_error">
                        <span v-if="errorCheck" class="text-red">・{{ conformed_error_message }}</span>
                      </p>
                      <p v-show="result == 'success'">
                        <span>登録完了しました</span>
                      </p>
                      <p v-show="result_makeroom">
                        <span v-if="result_makeroom == 'ルームの作成に失敗しました'" class="text-red">{{ result_makeroom }}</span>
                        <span v-else>{{ result_makeroom }}</span>
                      </p>
                      <v-form autocomplete="off">
                        <v-text-field
                          v-model="addStudent.name"
                          prepend-icon="mdi-account-circle"
                          autocomplete="off"
                          label="名前"
                        />
                        <v-text-field
                          v-model="addStudent.email"
                          prepend-icon="mdi-email-outline"
                          autocomplete="off"
                          label="メールアドレス"
                        />
                        <v-text-field
                          v-model="addStudent.password"
                          :type="showPassword ? 'text' : 'password'"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          prepend-icon="mdi-lock"
                          autocomplete="new-password"
                          label="パスワード"
                          @click:append="showPassword = !showPassword"
                        />
                        <v-text-field
                          v-model="addStudent.password_conformed"
                          :type="showPassword ? 'text' : 'password'"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          autocomplete="new-password"
                          prepend-icon="mdi-lock"
                          label="パスワード確認"
                          @click:append="showPassword = !showPassword"
                        />
                        <v-col
                          class="d-flex"
                          cols="12"
                          sm="6"
                        >
                          <v-select
                            v-model="addStudent.selectTeacherValue"
                            :items="selectTeacher"
                            label="担当の先生"
                            prepend-icon="mdi-account-circle"
                            dense
                            outlined
                            @change="fetchValue($event)"
                          />
                        </v-col>
                        <v-card-actions>
                          <v-btn
                            elevation="2"
                            block
                            color="primary"
                            @click="postStudent"
                          >
                            新規登録
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogEdit"
            max-width="600px"
          >
            <v-card>
              <v-card>
                <v-row>
                  <v-col
                    class="ml-12 pl-12"
                    cols="9"
                  >
                    <v-card-title>
                      <span
                        class="mt-2 text-h5 font-weight-black"
                      >
                        {{ showStudent.name }}くん（生徒）
                      </span>
                    </v-card-title>
                    <v-list-item>
                      <v-icon
                        large
                      >
                        mdi-account-circle-outline
                      </v-icon>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          class="ml-3 mb-n2"
                        >
                          名前
                        </v-list-item-subtitle>
                        <v-text-field
                          v-model="showStudent.name"
                          class="text-h6 pt-1 pl-4"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      class="mt-n5"
                    >
                      <v-icon
                        large
                      >
                        mdi-email
                      </v-icon>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          class="ml-3 mb-n2"
                        >
                          メールアドレス
                        </v-list-item-subtitle>
                        <v-text-field
                          v-model="showStudent.email"
                          class="text-h6 pt-1 pl-4"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      class="mt-n5"
                    >
                      <v-icon x-large>
                        mdi-home-variant-outline
                      </v-icon>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          class="ml-3 mb-n1"
                        >
                          郵便番号
                        </v-list-item-subtitle>
                        <v-row>
                          <v-text-field
                            v-model="showStudent.post_code"
                            class="text-h6 ml-7"
                          />
                          <v-btn
                            class="mt-3 mr-5"
                            color="primary"
                            small
                            @click="searchAddressInfo"
                          >
                            検索
                          </v-btn>
                        </v-row>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      class="mt-n8 ml-10"
                    >
                      <v-list-item-content>
                        <v-text-field
                          v-model="showStudent.address"
                          class="text-h7 pt-1 pl-4"
                        />
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      class="mt-n5"
                    >
                      <v-icon x-large>
                        mdi-cake-variant
                      </v-icon>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          class="ml-3 mb-n2"
                        >
                          生年月日
                        </v-list-item-subtitle>
                        <div>
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template #activator="{ on, attrs }">
                              <v-text-field
                                v-model="showStudent.birthday"
                                class="text-h6 pt-1 pl-4"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="showStudent.birthday"
                              :active-picker.sync="activePicker"
                              :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                              min="2000-01-01"
                              locale="jp-ja"
                              :day-format="date => new Date(date).getDate()"
                              @change="save"
                            />
                          </v-menu>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      class="mt-n5"
                    >
                      <v-avatar
                        class="profile"
                        size="45"
                      >
                        <v-img
                          :src="setImage()"
                        />
                      </v-avatar>

                      <v-list-item-content>
                        <v-list-item-subtitle
                          class="ml-2 mb-n2"
                        >
                          担当の先生
                        </v-list-item-subtitle>
                        <v-select
                          v-model="showStudent.teacher_id"
                          item-text="name"
                          item-value="id"
                          :items="allTeachers"
                          class="text-h6 pt-1 ml-3"
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
                <v-card-actions>
                  <v-col
                    cols="10"
                    class="mt-n5 ml-10 pl-10 mb-2"
                  >
                    <v-btn
                      color="primary"
                      dark
                      block
                      @click="update"
                    >
                      保存
                    </v-btn>
                  </v-col>
                </v-card-actions>
              </v-card>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                この生徒を削除します。よろしいですか？
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
          class=""
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
    let students = []
    await $axios.$get('/api/v1/students')
      .then(res => (students = res))
    return { students }
  },
  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
    search: '',
    dialogNew: false,
    dialogEdit: false,
    dialogDelete: false,
    showPassword: false,
    conformed_error: false,
    conformed_error_message: 'パスワードが違います',
    result: '',
    result_makeroom: '',
    errors: [],
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
    addStudent: {
      name: '',
      email: '',
      password: '',
      password_conformed: '',
      selectTeacherValue: '',
      teacher_id: ''
    },
    addRoom: {
      student_id: '',
      teacher_id: ''
    },
    showStudent: {
      name: '',
      email: '',
      post_code: '',
      address: '',
      birthday: '',
      student_icon: '',
      teacher_id: '',
      teachers: {
        teacher_name: '',
        teacher_icon: ''
      }
    },
    selectTeacher: [],
    teachersList: [],
    labels: {
      name: '名前',
      email: 'メールアドレス',
      password: 'パスワード'
    },
    nameTeachers: [],
    addressData1: '',
    addressData2: '',
    addressData3: '',
    allTeachers: []
  }),

  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  mounted () {
    this.$axios
      .get('/api/v1/teachers')
      .then((response) => {
        this.allTeachers = response.data
        response.data.forEach((v, i) => {
          if (v.name !== null) {
            this.selectTeacher.push(v.name)
            this.teachersList.push(v)
          }
        })
      })
  },
  methods: {
    postStudent () {
      this.conformed_error = this.errorCheck()
      this.result = ''
      this.result_makeroom = ''
      this.errors.length = 0
      if (this.conformed_error) {
        this.conformed_error = true
      } else {
        this.errors.length = 0
        for (let i = this.teachersList.length - 1; i >= 0; i--) {
          if (this.teachersList[i].name === this.addStudent.selectTeacherValue) {
            this.addStudent.teacher_id = this.teachersList[i].id
          }
        }
        this.regStudent()
      }
    },
    async regStudent () {
      try {
        const res = await this.$axios.$post('/api/v1/student', this.addStudent)
        this.result = res.status
        this.errors.length = 0
        this.addRoom.student_id = res.data.id
        this.addRoom.teacher_id = res.data.teacher_id
        this.regRoom()
        this.errors.length = 0
        this.addStudent.name = ''
        this.addStudent.email = ''
        this.addStudent.password = ''
        this.addStudent.password_conformed = ''
        this.addStudent.selectTeacherValue = ''
      } catch (e) {
        this.errors = e.response.data.errors.full_messages
      }
    },
    async regRoom () {
      try {
        if (this.addRoom.teacher_id !== null && this.addRoom.student_id !== null) {
          const res = await this.$axios.$post('/api/v1/rooms', this.addRoom)
          this.result_makeroom = res
          console.log(res)
        }
      } catch (e) {
        console.log(e.response)
      }
    },
    showAddStudent () {
      this.dialogNew = true
      this.result = ''
      this.result_makeroom = ''
      this.errors.length = 0
      this.addStudent.name = ''
      this.addStudent.email = ''
      this.addStudent.password = ''
      this.addStudent.password_conformed = ''
      this.addStudent.selectTeacherValue = ''
    },
    fetchValue ($event) {
      this.addStudent.selectTeacherValue = $event
    },
    showItem (item) {
      this.showStudent = Object.assign({}, item)
      this.nameTeachers = this.showStudent.teacher_name
      this.dialogEdit = true
    },
    setImage () {
      if (this.showStudent.teacher_icon) {
        return this.showStudent.teacher_icon
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
    },
    save (showStudent) {
      this.$refs.menu.save(showStudent)
    },
    searchAddressInfo () {
      const axios = require('axios')
      const url = 'http://zipcloud.ibsnet.co.jp/api/search?zipcode='
      axios.get(url + this.showStudent.post_code).then((res) => {
        this.addressData1 = res.data.results[0].address1
        this.addressData2 = res.data.results[0].address2
        this.addressData3 = res.data.results[0].address3
        this.showStudent.address = this.addressData1 + this.addressData2 + this.addressData3
      })
    },
    selectTeachers () {
      const axios = require('axios')
      let nameTeachers = []
      axios.get('/api/v1/students')
        .then(res => (nameTeachers = res))
      return { nameTeachers }
    },
    errorCheck () {
      if (this.addStudent.password !== this.addStudent.password_conformed) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style>
.text-red {
  color: red;
}
</style>
