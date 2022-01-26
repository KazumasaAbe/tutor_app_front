<template>
  <v-row justify="center" align="center">
    <v-app>
      <h2 style="color:#9A9A9A;">
        情報
      </h2>
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
                    v-model="teacher1.teacher_icon"
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
                        @click="editItem(item)"
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
                        v-model="teacher1.teacher_icon"
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
                        &emsp;安部
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
                        @click="editnameItem(item)"
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
                        &emsp;sample@email.com
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
                        @click="editemailItem(item)"
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
                v-model="dialog4"
                max-width="500"
              >
                <template #activator="{ on, attrs }">
                  <div class="subjectfield">
                    <div class="name-title">
                      <p style="color: #9A9A9A;">
                        担当教科
                      </p>
                    </div>
                    <div>
                      <span class="b-name-size">
                        &emsp;国語&emsp;英語
                      </span>
                    </div>
                  </div>
                  <div class="col-12 clearfix">
                    <div class="float-right pencil4">
                      <v-icon
                        class="mr-2"
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                        @click="editemailItem(item)"
                      >
                        mdi-pencil
                      </v-icon>
                    </div>
                  </div>
                </template>
                <v-card style="background-color:#F5E7CF;">
                  <v-card-title>
                    <p>担当教科{{ selected }}</p>
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
                          v-model="selected"
                          label="国語"
                          value="国語"
                          class="checkbox-size"
                        />
                        <v-checkbox
                          v-model="selected"
                          label="算数"
                          value="算数"
                          class="checkbox-size"
                        />
                        <v-checkbox
                          v-model="selected"
                          label="理科"
                          value="理科"
                          class="checkbox-size"
                        />
                        <v-checkbox
                          v-model="selected"
                          label="英語"
                          value="英語"
                          class="checkbox-size"
                        />
                        <v-checkbox
                          v-model="selected"
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
                      <!-- {{}} -->
                    </div>
                  </div>
                  <div class="col-12 clearfix">
                    <div class="float-right pencil5">
                      <v-icon
                        class="mr-2"
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                        @click="editemailItem(item)"
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
                        solo
                        height="145px"
                        class="box5"
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
    </v-app>
  </v-row>
</template>

<script>
export default {
  name: 'Inquiry',
  // async asyncData ({ $axios }) {
  //   let teacher = []
  //   await $axios.$get('/api/v1/teachers/this.$route.query.id')
  //     .then(res => (teacher = res))
  //   return { teacher }
  // },
  data () {
    return {
      // requestUrl: '/api/v1/teachers/:id',
      // page: 1,
      // length: 0,
      // displayLists: [],
      // pageSize: 8,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      teacher1: {
        id: '',
        name: '',
        teacher_icon: '',
        introduction: '',
        subjects: {
          teacher_id: '',
          subject: ''
        }
      }
    }
  },

  // computed: {
  //   teacherId () {
  //     return this.$route.params.id
  //   }
  // },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  methods: {
    editItem (item) {
      // this.editedIndex = this.notices.indexOf(item)
      this.teacher1 = Object.assign({}, item)
      this.dialog = true
    },
    editnameItem (item) {
      this.teacher1 = Object.assign({}, item)
      this.dialog = true
    },
    editemailItem (item) {
      this.teacher1 = Object.assign({}, item)
      this.dialog = true
    },
    // showItem (teacher) {
    //   this.showTeacher = Object.assign({}, teacher)
    //   this.dialog = true
    // },
    iconImage () {
      if (this.teacher1.teacher_icon) {
        return this.teacher1.teacher_icon
      } else {
        return '/img/default_icon2.png'
      }
    },
    setImage () {
      if (this.teacher1.teacher_icon) {
        return this.teacher1.teacher_icon
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
      Object.assign(this.teachers, this.teacher)
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
  margin-top: -10px;
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
</style>
