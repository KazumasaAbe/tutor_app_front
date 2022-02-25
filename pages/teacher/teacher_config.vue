<template>
  <v-row justify="center" align="center">
    <v-app>
      <h2 style="color:#9A9A9A;">
        情報
      </h2>
      <div
        v-for="(teacherItem, i) in teachers"
        :key="`teacherItem-${i}`"
      >
        <div class="box4">
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-dialog
                  v-model="dialog1"
                  max-width="500"
                >
                  <template #activator="{ on, attrs }">
                    <v-avatar
                      class="profile pt-3 mt-3 ml-10"
                      size="300"
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
                        v-bind="attrs"
                        v-on="on"
                        @click="editItem(teacherItem)"
                      >
                        mdi-pencil
                      </v-icon>
                    </div>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span style="color:#9A9A9A;">アイコン画像</span>
                      <v-spacer />
                      <v-icon
                        x-large
                        color="black"
                        @click="close"
                      >
                        mdi-close-box-outline
                      </v-icon>
                    </v-card-title>
                    <v-row justify="center" align="center">
                      <v-avatar
                        class="profile pt-3"
                        size="200"
                        tile
                      >
                        <v-img
                          max-height="250"
                          max-width="250"
                          :src="iconImage()"
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
                    <v-card-actions>
                      <v-spacer />
                      <v-dialog>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            large
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                            @click="save"
                          >
                            保存
                          </v-btn>
                        </template>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-col cols="6">
                <v-dialog
                  v-model="dialog2"
                  max-width="500"
                >
                  <template #activator="{ on, attrs }">
                    <v-list>
                      <v-list-item
                        class="mt-6"
                      >
                        <v-list-item-content>
                          <v-list-item-subtitle>名前</v-list-item-subtitle>
                          <v-text-field
                            v-model="teacherItem.name"
                            class="pt-1 b-name-size"
                            readonly
                            prepend-icon="mdi-account-circle"
                          />
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-icon
                            color="primary"
                            class="mr-2"
                            v-bind="attrs"
                            v-on="on"
                            @click="editItem(teacherItem)"
                          >
                            mdi-pencil
                          </v-icon>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </template>
                  <v-card>
                    <v-container>
                      <v-row justify="center" align="center">
                        <v-col
                          cols="11"
                        >
                          <v-card-title>
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
                            <v-col
                              cols="8"
                            >
                              <v-text-field
                                v-model="teacher.name"
                                label="名前"
                                :hide-details="true"
                                class="text-field"
                              />
                            </v-col>
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-card-actions>
                      <v-spacer />
                      <v-dialog>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            large
                            class="save-box"
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                            @click="save"
                          >
                            保存
                          </v-btn>
                        </template>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  v-model="dialog3"
                  max-width="500"
                >
                  <template #activator="{ on, attrs }">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle>メールアドレス</v-list-item-subtitle>
                        <v-text-field
                          v-model="teacherItem.email"
                          class="pt-1 b-name-size"
                          readonly
                          prepend-icon="mdi-email-outline"
                        />
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon
                          color="primary"
                          class="mr-2"
                          v-bind="attrs"
                          v-on="on"
                          @click="editItem(teacherItem)"
                        >
                          mdi-pencil
                        </v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                  <v-card>
                    <v-container>
                      <v-row justify="center" align="center">
                        <v-col
                          cols="12"
                        >
                          <v-card-title>
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
                            <v-col
                              cols="12"
                            >
                              <v-text-field
                                v-model="teacher.email"
                                label="メールアドレス"
                                :hide-details="true"
                                class="text-field"
                              />
                            </v-col>
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-card-actions>
                      <v-spacer />
                      <v-dialog>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            large
                            class="save-box-email"
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                            @click="save"
                          >
                            保存
                          </v-btn>
                        </template>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  v-model="dialog4"
                  max-width="500"
                >
                  <template #activator="{ on, attrs }">
                    <div
                      v-for="subjects in teacherItem.subjects"
                      :key="subjects.id"
                    >
                      <v-list>
                        <v-list-item
                          class="mt-6"
                        >
                          <v-list-item-content class=" subjectfield">
                            <v-list-item-subtitle>担当教科</v-list-item-subtitle>
                            <span
                              class="b-name-size"
                              prepend-icon="mdi-account-circle"
                            >
                              &emsp;{{ subjects.subject.join(',') }}
                            </span>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-icon
                              color="primary"
                              class="mr-2"
                              v-bind="attrs"
                              v-on="on"
                              @click="subjectItem(teacherItem, subjects)"
                            >
                              mdi-pencil
                            </v-icon>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </div>
                  </template>
                  <v-card>
                    <v-card-title>
                      <p>担当教科</p>
                      <v-spacer />
                      <v-icon
                        x-large
                        color="black"
                        @click="close"
                      >
                        mdi-close-box-outline
                      </v-icon>
                    </v-card-title>
                    <v-card-text class="checkbox-size2">
                      <v-col
                        cols="10"
                      >
                        <v-container fluid>
                          <v-checkbox
                            v-model="teacher.subjects.subject"
                            label="国語"
                            value="国語"
                            class="checkbox-size"
                          />
                          <v-checkbox
                            v-model="teacher.subjects.subject"
                            label="算数"
                            value="算数"
                            class="checkbox-size"
                          />
                          <v-checkbox
                            v-model="teacher.subjects.subject"
                            label="理科"
                            value="理科"
                            class="checkbox-size"
                          />
                          <v-checkbox
                            v-model="teacher.subjects.subject"
                            label="英語"
                            value="英語"
                            class="checkbox-size"
                          />
                          <v-checkbox
                            v-model="teacher.subjects.subject"
                            label="社会"
                            value="社会"
                            class="checkbox-size"
                          />
                        </v-container>
                      </v-col>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-dialog>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            large
                            class="save-box"
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                            @click="save"
                          >
                            保存
                          </v-btn>
                        </template>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-col
                cols="12"
                class="box6"
              >
                <v-dialog
                  v-model="dialog5"
                  max-width="500"
                >
                  <template #activator="{ on, attrs }">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          class="mb-5"
                        >
                          自己紹介
                        </v-list-item-title>
                        <div class="box5">
                          {{ teacherItem.introduction }}
                        </div>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon
                          color="primary"
                          class="mr-2"
                          v-bind="attrs"
                          v-on="on"
                          @click="editItem(teacherItem)"
                        >
                          mdi-pencil
                        </v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span>自己紹介</span>
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
                      <v-col
                        cols="12"
                      >
                        <v-textarea
                          v-model="teacher.introduction"
                          solo
                          height="145px"
                          class="box7"
                        />
                      </v-col>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-dialog>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            large
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                            @click="save"
                          >
                            保存
                          </v-btn>
                        </template>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-app>
  </v-row>
</template>

<script>
export default {
  name: 'Inquiry',
  async asyncData ({ $axios }) {
    let teachers = []
    await $axios.$get('/api/v1/teachers')
      .then(res => (teachers = res))
    return { teachers }
  },
  data: () => ({
    image: null,
    dialog1: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    dialog5: false,
    teacher: {
      name: '',
      email: '',
      teacher_icon: '',
      introduction: '',
      subjects: [{
        subject: []
      }]
    },
    teachers: [],
    editedIndex: -1,
    defaultItem: {}
  }),

  computed: {
    user () {
      return this.$store.state.user_information.user
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  mounted () {
    this.activeUsers()
  },

  methods: {
    activeUsers () {
      this.teachers = this.teachers.filter(teacher => teacher.id === this.user.id)
    },
    editItem (teacherItem) {
      this.editedIndex = this.teachers.indexOf(teacherItem)
      this.teacher = Object.assign({}, teacherItem)
      this.dialog = true
    },
    subjectItem (teacherItem, subjects) {
      this.editedIndex = this.teachers.indexOf(teacherItem)
      this.teacher = Object.assign({}, teacherItem)
      this.teacher.subjects = Object.assign({}, subjects)
      this.dialog = true
    },
    iconImage () {
      if (this.teacher.teacher_icon) {
        return this.teacher.teacher_icon
      } else {
        return '/img/default_icon.png'
      }
    },
    setImage () {
      if (this.teacher.teacher_icon) {
        return this.teacher.teacher_icon
      } else {
        return '/img/default_icon.png'
      }
    },
    changeFile (img) {
      if (img) {
        this.teacher.teacher_icon = URL.createObjectURL(this.image)
      } else {
        this.teacher.teacher_icon = '/img/default_icon.png'
      }
    },
    close () {
      this.dialog1 = false
      this.dialog2 = false
      this.dialog3 = false
      this.dialog4 = false
      this.dialog5 = false
      this.$nextTick(() => {
        this.teacher = Object.assign({}, this.defaultItem)
        this.teacher.subjects = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        const url = `/api/v1/teachers/${this.teacher.id}`
        this.$axios.$patch(url, this.teacher)
          .then((res) => {
            this.defaultItem = res
            Object.assign(this.teachers[this.editedIndex], this.defaultItem)
            this.$store.dispatch(
              'flashMessage/showMessage',
              {
                message: '先生情報を更新しました!',
                type: 'info',
                status: true
              }
            )
            this.close()
          })
      }
    }
  }
}
</script>
<style scoped>
.box4 {
  width: 800px;
  padding: 0.5em 1em;
  margin: 2em 0;
  font-weight: bold;
  background: #FFF;
  border: solid 1px #9A9A9A; /*線*/
  border-radius: 10px; /*角の丸み*/
}
.box5 {
  width: 700px;
  height: 150px;
  margin: -10px auto;
  border: solid 1px #9A9A9A; /*線*/
  border-radius: 5px; /*角の丸み*/
  padding: 20px;
  font-size: 24px;
}
.box7 {
  height: 150px;
  border: solid 3px #9A9A9A; /*線*/
  border-radius: 5px; /*角の丸み*/
}
.title {
  position: absolute;
  top: 325px;
  left: 60px;
  color: #9A9A9A;
}
.box6 {
  margin-top: -20px;
}
.imgup {
  margin-left: 60px;
  background-color: #CDCDCD;
  color: #fff;
  border: solid 3px #CDCDCD; /*線*/
  border-radius: 5px; /*角の丸み*/
}
.b-name-size{
  font-size: 24px;
}
.text-field >>> input {
 text-align: center;
 font-size: 28px;
}
.subjectfield {
  border-bottom: 1px solid #9A9A9A;
  margin-top: -50px;
}
.checkbox-size {
  margin-top: -15px;
}
.checkbox-size2 {
  margin-top: -25px;
}
.save-box {
  margin: -100px 30px 0 0;
}
.save-box-email {
  margin: -40px 30px 0 0;
}
</style>
