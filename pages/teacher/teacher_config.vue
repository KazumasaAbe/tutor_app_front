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
                    <v-img
                      v-model="teacher.teacher_icon"
                      max-height="300"
                      max-width="300"
                      :src="setImage()"
                    />
                    <div class="col-12 clearfix">
                      <div class="float-right pencil">
                        <v-icon
                          class="mr-2"
                          color="primary"
                          v-bind="attrs"
                          v-on="on"
                          @click="editItem(teacherItem)"
                        >
                          mdi-pencil
                        </v-icon>
                      </div>
                    </div>
                  </template>
                  <v-card style="background-color:#F5E7CF;">
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
                    <v-text-container>
                      <v-col
                        cols="12"
                      >
                        <v-img
                          v-model="teacher.teacher_icon"
                          max-height="250"
                          max-width="250"
                          :src="iconImage()"
                        />
                        <span class="imgup">画像アップロード</span>
                      </v-col>
                    </v-text-container>
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
                    <div class="namefield">
                      <div class="name-title">
                        <p style="color: #9A9A9A;">
                          名前
                        </p>
                      </div>
                      <div>
                        <span class="b-name-size">
                          &emsp;{{ teacherItem.name }}
                        </span>
                      </div>
                    </div>
                    <div class="col-12 clearfix">
                      <div class="float-right pencil2">
                        <v-icon
                          class="mr-2"
                          color="primary"
                          v-bind="attrs"
                          v-on="on"
                          @click="editItem(teacherItem)"
                        >
                          mdi-pencil
                        </v-icon>
                      </div>
                    </div>
                  </template>
                  <v-card class="name-card">
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
                    <div class="emailfield">
                      <div class="name-title">
                        <p style="color: #9A9A9A;">
                          メールアドレス
                        </p>
                      </div>
                      <div>
                        <span class="b-name-size">
                          &emsp;{{ teacherItem.email }}
                        </span>
                      </div>
                    </div>
                    <div class="col-12 clearfix">
                      <div class="float-right pencil3">
                        <v-icon
                          class="mr-2"
                          color="primary"
                          v-bind="attrs"
                          v-on="on"
                          @click="editItem(teacherItem)"
                        >
                          mdi-pencil
                        </v-icon>
                      </div>
                    </div>
                  </template>
                  <v-card style="background-color:#F5E7CF;">
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
                              >
                                {{ teacherItem.email }}
                              </v-text-field>
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
                      <div class="subjectfield">
                        <div class="name-title">
                          <p style="color: #9A9A9A;">
                            担当教科
                          </p>
                        </div>
                        <span
                          class="b-name-size"
                        >
                          &emsp;{{ subjects.subject.join(',') }}
                        </span>
                      </div>
                      <div class="col-12 clearfix">
                        <div class="float-right pencil4">
                          <v-icon
                            class="mr-2"
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                            @click="subjectItem(teacherItem, subjects)"
                          >
                            mdi-pencil
                          </v-icon>
                        </div>
                      </div>
                    </div>
                  </template>
                  <v-card style="background-color:#F5E7CF;">
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
                    <div>
                      <span class="title"><b>自己紹介</b></span>
                      <div class="box5">
                        {{ teacherItem.introduction }}
                      </div>
                    </div>
                    <div class="col-12 clearfix">
                      <div class="float-right pencil5">
                        <v-icon
                          class="mr-2"
                          color="primary"
                          v-bind="attrs"
                          v-on="on"
                          @click="editItem(teacherItem)"
                        >
                          mdi-pencil
                        </v-icon>
                      </div>
                    </div>
                  </template>
                  <v-card style="background-color:#F5E7CF;">
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
        // id: '',
        subject: []
      }]
    },
    teachers: []
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
      this.teacher = Object.assign({}, teacherItem)
      this.dialog = true
    },
    subjectItem (teacherItem, subjects) {
      this.teacher = Object.assign({}, teacherItem)
      this.teacher.subjects = Object.assign({}, subjects)
      this.dialog = true
    },
    iconImage () {
      if (this.teacher.teacher_icon) {
        return this.teacher.teacher_icon
      } else {
        return '/img/default_icon2.png'
      }
    },
    setImage () {
      if (this.teacher.teacher_icon) {
        return this.teacher.teacher_icon
      } else {
        return '/img/default_icon.png'
      }
    },
    close () {
      this.dialog1 = false
      this.dialog2 = false
      this.dialog3 = false
      this.dialog4 = false
      this.dialog5 = false
    },
    save () {
      const url = `/api/v1/teachers/${this.teacher.id}`
      this.$axios.$patch(url, this.teacher)
      this.$store.dispatch(
        'flashMessage/showMessage',
        {
          message: '先生情報を更新しました!',
          type: 'info',
          status: true
        }
      )
      this.$router.go('/teacher/teacher_config')
      this.close()
    }
  }
}
</script>
<style scoped>
.box4 {
  width: 800px;
  height: 500px;
  padding: 0.5em 1em;
  margin: 2em 0;
  font-weight: bold;
  background: #FFF;
  border: solid 3px #9A9A9A; /*線*/
  border-radius: 10px; /*角の丸み*/
}
.box5 {
  width: 700px;
  height: 150px;
  margin: -10px auto;
  border: solid 3px #9A9A9A; /*線*/
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
.name-card {
  background-color:#F5E7CF;
}
.b-name-size{
  font-size: 26px;
}
.name-title {
  margin-bottom: -20px;
}
.namefield {
  border-bottom: 3px solid #9A9A9A;
  padding-bottom: 2px;
}
.text-field >>> input {
 text-align: center;
 font-size: 28px;
}
.emailfield {
  border-bottom: 3px solid #9A9A9A;
  padding-bottom: 2px;
  margin-top: -45px;
}
.subjectfield {
  border-bottom: 3px solid #9A9A9A;
  padding-bottom: 2px;
  margin-top: 5px;
}
.pencil {
  position: absolute;
  top: 300px;
  left: 300px;
}
.pencil2 {
  position: absolute;
  top: 115px;
  right: 10px;
}
.pencil3 {
  position: absolute;
  top: 185px;
  right: 10px;
}
.pencil4 {
  position: absolute;
  top: 260px;
  right: 10px;
}
.pencil5 {
  position: absolute;
  right: 20px;
  bottom: 170px;
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
