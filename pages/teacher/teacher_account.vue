<template>
  <v-app>
    <h2 style="color:#9A9A9A;">
      担当生徒
    </h2>
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <template #activator="{ on, attrs }">
        <v-row>
          <v-card
            v-for="(student, i) in displayLists"
            :key="`student-${i}`"
            class="mt-7 mr-10"
            max-width="250"
            height="270"
            v-bind="attrs"
            v-on="on"
            @click="showItem(student)"
          >
            <v-img
              :src="setImage()"
            />

            <v-card-title
              class="text-h5 pt-0 pb-4 justify-center"
              style="color:#9A9A9A;"
            >
              {{ student.name }}くん
            </v-card-title>
          </v-card>
        </v-row>
      </template>
      <v-card>
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
          <v-container>
            <v-row>
              <v-col
                cols="6"
                sm="6"
                md="6"
              >
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
                cols="6"
                sm="6"
                md="6"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>名前</v-list-item-subtitle>
                    <v-list-item-title
                      class="text-center text-h5 pt-1 pl-4"
                    >
                      {{ showStudent.name }}くん
                    </v-list-item-title>
                    <v-divider />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>学年</v-list-item-subtitle>
                    <v-list-item-title
                      class="text-center text-h5 pt-1 pl-4"
                    >
                      {{ calcAge(showStudent.birthday) }}年生
                      <!-- {{ showStudent.birthday }} -->
                    </v-list-item-title>
                    <v-divider />
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col
                cols="12"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>住所</v-list-item-subtitle>
                    <v-list-item-title
                      class="text-h5 pt-1 pl-4"
                    >
                      {{ showStudent.address }}
                    </v-list-item-title>
                    <v-divider />
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
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
                @click="linkmove(showStudent)"
              >
                学力詳細
              </v-btn>
            </template>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div
      class="text-center pt-4 mb-2"
    >
      <v-pagination
        v-model="page"
        :length="length"
        @input="pageChange"
      />
    </div>
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="select_student"
          item-text="name"
          :items="students"
          label="チャットする生徒を選択"
          return-object
        />
      </v-col>
    </v-row>
    <v-row v-if="select_student">
      <v-col>
        {{ select_student.name }}とのトールルーム
        <v-card
          id="container"
          class="line-bc"
          color="light-blue lighten-4"
          max-height="300"
        >
          <span v-if="messages">
            <span
              v-for="(m, i) in messages"
              :key="`m-${i}`"
            >
              <template v-if="m.speaker == 'student'">
                <div class="student-comment">
                  <p>{{ m.content }}</p>
                </div>
              </template>
              <template v-else>
                <div class="balloon">
                  <div class="faceicon">
                    <img src="/img/default_icon.png">
                  </div>
                  <div class="chatting">
                    <div class="says">
                      <p>{{ m.content }}</p>
                    </div>
                  </div>
                </div>
              </template>
            </span>
          </span>
        </v-card>
        <div class="chatfield">
          <v-text-field
            v-model="send_message.content"
            :append-outer-icon="'mdi-send'"
            clear-icon="mdi-close-circle"
            clearable
            label="メッセージ"
            outlined
            @click:append-outer="sendMessage"
          />
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import goTo from 'vuetify/es5/services/goto'
import ActionCable from 'actioncable'
export default {
  middleware: ['teacherRedirect'],
  async asyncData ({ $axios }) {
    let students = []
    await $axios.$get('/api/v1/students')
      .then(res => (students = res))
    return { students }
  },
  data: () => ({
    select_student: '',
    messages: [],
    dialog: false,
    dialogDelete: false,
    students: [],
    showStudent: {
      name: '',
      address: '',
      birthday: '',
      student_icon: '',
      teacher_id: ''
    },
    page: 1,
    length: 0,
    displayLists: [],
    pageSize: 4,
    send_message: {
      speaker: 'student',
      content: '',
      room_name: '',
      teacher_id: '',
      student_id: '',
      room_id: ''
    }
  }),
  computed: {
    ...mapGetters({
      user: 'user_information/getUser'
    })
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    select_student (val) {
      this.setStudent(val)
    },
    messages (val) {
      this.$nextTick(function () {
        this.scrollEnd()
      })
    }
  },
  mounted () {
    this.activeUsers()
    this.length = Math.ceil(this.students.length / this.pageSize)
    this.displayLists = this.students.slice(0, this.pageSize)
  },
  methods: {
    activeUsers () {
      this.students = this.students.filter(student => student.teacher_id === this.user.id)
    },
    // 学年計算
    calcAge (birthday) {
      const today = this.$dayjs()
      const birthDate = this.$dayjs(birthday)
      const baseAge = today.year() - birthDate.year() - 5
      // 今年度の４月１日を取得
      const thisSchoolyear = this.$dayjs().month(4 - 1).date(1)
      // 今日が4月1日より前か後か
      const Schoolyear = today.isBefore(thisSchoolyear) ? baseAge - 1 : baseAge
      return Schoolyear
    },
    showItem (student) {
      this.showStudent = Object.assign({}, student)
      this.dialog = true
    },
    setImage () {
      if (this.showStudent.student_icon) {
        return this.showStudent.student_icon
      } else {
        return '/img/default_icon.png'
      }
    },
    close () {
      this.dialog = false
    },
    pageChange (pageNumber) {
      goTo(0)
      this.displayLists = this.students.slice(this.pageSize * (pageNumber - 1), this.pageSize * (pageNumber))
    },
    linkmove (showStudent) {
      this.showStudent = Object.assign({}, showStudent)
      this.$router.push({ path: '/student/student_detail/', query: { id: this.showStudent.id, name: this.showStudent.name } })
    },
    setStudent (student) {
      this.$axios
        .get(`/api/v1/messages/${student.id}`)
        .then((response) => {
          this.messages = response.data
          this.$nextTick(() => {
            this.scrollEnd()
          })
        })
      this.$axios
        .get(`/api/v1/rooms/${student.id}`)
        .then((response) => {
          this.$nextTick(() => {
            this.room = response.data
            this.url = `${process.env.APIURL}`
            const cable = ActionCable.createConsumer(this.url)
            this.messageChannel = cable.subscriptions.create({ channel: 'ChatChannel', room: this.room[0].id }, {
              received: (data) => {
                this.messages.push({
                  speaker: data.message.speaker,
                  content: data.message.content,
                  room_name: data.message.room_name,
                  teacher_id: data.message.teacher_id,
                  student_id: data.message.student_id,
                  room_id: data.message.room_id
                })
              }
            }
            )
          })
        })
    },
    scrollEnd () {
      this.el = document.getElementById('container')
      this.el.scrollTo(0, this.el.scrollHeight)
    },
    sendMessage () {
      this.dataSet()
      this.messageChannel.perform('speak', {
        message: this.send_message
      })
      this.$axios
        .post('/api/v1/messages', this.send_message)
        .then((response) => {
          this.status = response.data
        })
      this.send_message.content = ''
    },
    // チャット内容の付属データをオブジェクトへ追加
    dataSet () {
      this.send_message.student_id = this.select_student.id
      this.send_message.teacher_id = this.select_student.teacher_id
      this.send_message.room_id = this.room[0].id
    }
  }
}
</script>

<style>
  .mycomment {
    margin: 10px 0;
  }

  .line-bc {
    padding: 20px 10px;
    margin: 15px auto;
    text-align: right;
    font-size: 14px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .student-comment {
  margin: 10px 0;
}
.student-comment p {
  display: inline-block;
  position: relative;
  margin: 0 10px 0 0;
  padding: 8px;
  max-width: 250px;
  border-radius: 12px;
  background: #30e852;
  font-size: 15px;
}

.student-comment p:after {
  content: "";
  position: absolute;
  top: 3px;
  right: -19px;
  border: 8px solid transparent;
  border-left: 18px solid #30e852;
  -webkit-transform: rotate(-35deg);
  transform: rotate(-35deg);
}

.balloon {
  width: 100%;
  margin: 10px 0;
  overflow: hidden;
}

.balloon .faceicon {
  float: left;
  margin-right: -50px;
  width: 40px;
}

.balloon .faceicon img{
  width: 100%;
  height: auto;
  border-radius: 50%;
}
.balloon .chatting {
  width: 100%;
  text-align: left;
}
.says {
  display: inline-block;
  position: relative;
  margin: 0 0 0 50px;
  padding: 10px;
  max-width: 250px;
  border-radius: 12px;
  background: #edf1ee;
}

.says:after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 3px;
  left: -19px;
  border: 8px solid transparent;
  border-right: 18px solid #edf1ee;
  -webkit-transform: rotate(35deg);
  transform: rotate(35deg);
}
.says p {
  margin: 0;
  padding: 0;
}
</style>
