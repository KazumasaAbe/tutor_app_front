<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="10">
          <v-card>
            <v-row>
              <v-col cols="5">
                <v-avatar
                  class="profile pt-3 mt-3 ml-10"
                  size="200"
                  tile
                >
                  <v-img
                    :src="setImage()"
                  />
                </v-avatar>
                <div class="text-right mr-5">
                  <v-icon
                    color="primary"
                    class="mr-2"
                    @click="editIconItem()"
                  >
                    mdi-pencil
                  </v-icon>
                </div>
              </v-col>
              <v-col
                class="mt-4"
                cols="7"
              >
                <v-list>
                  <v-list-item
                    class="mt-5"
                  >
                    <v-list-item-content>
                      <v-list-item-subtitle>名前</v-list-item-subtitle>
                      <v-text-field
                        v-model="user.name"
                        class="pt-1"
                        readonly
                        prepend-icon="mdi-account-circle"
                      />
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon
                        color="primary"
                        class="mr-2"
                        @click="editNameItem()"
                      >
                        mdi-pencil
                      </v-icon>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>メールアドレス</v-list-item-subtitle>
                    <v-text-field
                      v-model="user.email"
                      class="pt-1"
                      readonly
                      prepend-icon="mdi-email-outline"
                    />
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon
                      color="primary"
                      class="mr-2"
                      @click="editEmailItem()"
                    >
                      mdi-pencil
                    </v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      郵便番号
                    </v-list-item-subtitle>
                    <v-text-field
                      v-model="user.post_code"
                      prepend-icon="mdi-home-variant-outline"
                      readonly
                    />
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row class="mt-n15">
              <v-col>
                <v-list-item>
                  <v-list-item-content
                    class="ml-8"
                  >
                    <v-text-field
                      v-model="user.address"
                      readonly
                    />
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon
                      color="primary"
                      class="mr-2 mb-2"
                      @click="editAddressItem()"
                    >
                      mdi-pencil
                    </v-icon>
                  </v-list-item-action>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>生年月日</v-list-item-subtitle>
                    <v-text-field
                      v-model="user.birthday"
                      prepend-icon="mdi-calendar"
                      readonly
                    />
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon
                      color="primary"
                      class="mr-2"
                      @click="editBirthdayItem()"
                    >
                      mdi-pencil
                    </v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog
        v-model="iconDialog"
        max-width="600px"
        persistent
      >
        <v-card>
          <v-container>
            <v-row>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="mb-5"
                  >
                    アイコン編集
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    アイコン
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-row>
            <v-row justify="center" align="center">
              <v-avatar
                class="profile pt-3"
                size="200"
                tile
              >
                <v-img
                  :src="editSetImage()"
                />
              </v-avatar>
            </v-row>
            <v-row>
              <v-col cols="10">
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
            </v-row>
            <div class="text-right">
              <v-btn
                color="primary"
                @click="studentInfoSave()"
              >
                Save
              </v-btn>
              <v-btn
                @click="dialogCancel()"
              >
                Cancel
              </v-btn>
            </div>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="nameDialog"
        max-width="600px"
        persistent
      >
        <v-card>
          <v-container>
            <v-row>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="mb-5"
                  >
                    名前編集
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    名前
                  </v-list-item-subtitle>
                  <v-text-field
                    v-model="editStudent.name"
                    class="mt-n3"
                    prepend-icon="mdi-account-circle"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-row>
            <div class="text-right">
              <v-btn
                color="primary"
                @click="studentInfoSave()"
              >
                Save
              </v-btn>
              <v-btn
                @click="dialogCancel()"
              >
                Cancel
              </v-btn>
            </div>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="emailDialog"
        max-width="600px"
        persistent
      >
        <v-card>
          <v-container>
            <v-row>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="mb-5"
                  >
                    メールアドレス編集
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    メールアドレス
                  </v-list-item-subtitle>
                  <v-text-field
                    v-model="editStudent.email"
                    class="mt-n3"
                    prepend-icon="mdi-email-outline"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-row>
            <div class="text-right">
              <v-btn
                color="primary"
                @click="studentInfoSave()"
              >
                Save
              </v-btn>
              <v-btn
                @click="dialogCancel()"
              >
                Cancel
              </v-btn>
            </div>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="addressDialog"
        max-width="600px"
        persistent
      >
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="mb-5"
                    >
                      住所編集
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      郵便番号
                    </v-list-item-subtitle>
                    <v-text-field
                      v-model="editStudent.post_code"
                      class="mt-n3"
                      prepend-icon="mdi-home-variant-outline"
                    />
                  </v-list-item-content>
                  <v-btn
                    class="mt-10 ml-2"
                    color="primary"
                    small
                    @click="searchAddressInfo()"
                  >
                    住所検索
                  </v-btn>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model="editStudent.address"
                    class="ml-10 mt-n5"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-row>
            <div class="text-right">
              <v-btn
                color="primary"
                @click="studentInfoSave()"
              >
                Save
              </v-btn>
              <v-btn
                @click="dialogCancel()"
              >
                Cancel
              </v-btn>
            </div>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="birthdayDialog"
        max-width="600px"
        persistent
      >
        <v-card>
          <v-container>
            <v-row>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="mb-5"
                  >
                    生年月日編集
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    生年月日
                  </v-list-item-subtitle>
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
                        v-model="editStudent.birthday"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="editStudent.birthday"
                      :active-picker.sync="activePicker"
                      :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                      min="2000-01-01"
                      @click="save"
                    />
                  </v-menu>
                </v-list-item-content>
              </v-list-item>
            </v-row>
            <div class="text-right">
              <v-btn
                color="primary"
                @click="studentInfoSave()"
              >
                Save
              </v-btn>
              <v-btn
                @click="dialogCancel()"
              >
                Cancel
              </v-btn>
            </div>
          </v-container>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Inquiry',
  data () {
    return {
      image: null,
      iconDialog: false,
      nameDialog: false,
      emailDialog: false,
      addressDialog: false,
      birthdayDialog: false,
      addressData1: '',
      addressData2: '',
      addressData3: '',
      editStudent: {
        student_icon: '',
        name: '',
        email: '',
        post_code: '',
        address: '',
        birthday: ''
      },
      activePicker: null,
      date: null,
      menu: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user_information/getUser'
    })
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  mounted () {
    // storeのデータを複製
    this.editStudent = JSON.parse(JSON.stringify(this.user))
  },
  methods: {
    setImage () {
      if (this.user.student_icon) {
        return this.user.student_icon
      } else {
        return '/img/default_icon.png'
      }
    },
    editSetImage () {
      if (this.editStudent.student_icon) {
        return this.editStudent.student_icon
      } else {
        return '/img/default_icon.png'
      }
    },
    searchAddressInfo () {
      const axios = require('axios')
      const url = 'http://zipcloud.ibsnet.co.jp/api/search?zipcode='
      axios.get(url + this.editStudent.post_code).then((res) => {
        this.addressData1 = res.data.results[0].address1
        this.addressData2 = res.data.results[0].address2
        this.addressData3 = res.data.results[0].address3
        this.editStudent.address = this.addressData1 + this.addressData2 + this.addressData3
      })
      console.log(this.editStudent.address)
    },
    save (date) {
      this.$refs.menu.save(date)
    },
    editIconItem () {
      this.iconDialog = true
    },
    editNameItem () {
      this.nameDialog = true
    },
    editEmailItem () {
      this.emailDialog = true
    },
    editAddressItem () {
      this.addressDialog = true
    },
    editBirthdayItem () {
      this.birthdayDialog = true
    },
    dialogCancel () {
      this.iconDialog = false
      this.nameDialog = false
      this.emailDialog = false
      this.addressDialog = false
      this.birthdayDialog = false
      this.editStudent = JSON.parse(JSON.stringify(this.user))
      this.image = null
    },
    changeFile (img) {
      if (img) {
        this.editStudent.student_icon = URL.createObjectURL(this.image)
      } else {
        this.editStudent.student_icon = '/img/default_icon.png'
      }
    },
    studentInfoSave () {
      this.$axios
        .put('/api/v1/student', this.editStudent, {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            uid: localStorage.getItem('uid'),
            client: localStorage.getItem('client')
          }
        })
        .then((response) => {
          this.account = Object.assign({}, this.editStudent)
          this.$store.dispatch('user_information/setUser', this.account)
          localStorage.setItem('access-token', response.headers['access-token'])
          localStorage.setItem('client', response.headers.client)
          localStorage.setItem('uid', response.headers.uid)
          localStorage.setItem('token-type', response.headers['token-type'])
          this.$store.dispatch(
            'flashMessage/showMessage',
            {
              message: '更新しました',
              type: 'success',
              status: true
            },
            { root: true }
          )
          this.dialogCancel()
        }
        )
        .catch((e) => {
          console.log(e.response.data.errors.full_messages)
          this.errors = e.response.data.errors.full_messages
        })
    }
  }
}
</script>

<style scope>
</style>
