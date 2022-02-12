<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-card-title class="headline">
            {{ user.email }}さん
          </v-card-title>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card-actions>
            <v-select
              v-model="select_ability"
              item-text="implementation_month"
              :items="descending_abilities"
              :menu-props="{ maxHeight: '200' }"
              label="実施月を選択してください"
              persistent-hint
            />
          </v-card-actions>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card-actions>
            <BarChart
              :chart-data="bar_data_collection"
              :options="bar_options"
            />
          </v-card-actions>
        </v-col>
        <v-col cols="6">
          <v-card-actions>
            <LineChart
              :chart-data="line_data_collection"
              :options="line_options"
            />
          </v-card-actions>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          {{ teacher.name }}とのトールルーム
          <v-card
            id="container"
            class="line-bc"
            color="light-blue lighten-4"
            max-height="300"
          >
            <span
              v-for="(m, i) in messages"
              :key="`m-${i}`"
            >
              <template v-if="m.speaker == 'teacher'">
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
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import ActionCable from 'actioncable'
import BarChart from '~/components/BarChart.vue'

export default {
  components: {
    BarChart
  },
  data () {
    return {
      bar_data_collection: { datasets: [] },
      bar_options: {},
      line_data_collection: { datasets: [] },
      line_options: {},
      abilities: [],
      descending_abilities: [],
      ascending_abilities: [],
      sort_abilities: [],
      abilitiy: {},
      select_ability: {},
      line_label: [],
      national_language_scores: [],
      arithmetic_scores: [],
      science_scores: [],
      english_scores: [],
      society_scores: [],
      messages: [],
      message: '',
      room: {},
      teacher: {},
      send_message: {
        speaker: 'teacher',
        content: '',
        room_name: '',
        teacher_id: '',
        student_id: '',
        room_id: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user_information/getUser'
    })
  },
  watch: {
    select_ability (val, old) {
      this.setAbility(val)
    },
    messages (val, old) {
      this.$nextTick(function () {
        this.scrollEnd()
      })
    }
  },
  mounted () {
    this.$axios
      .get('/api/v1/academic_abilities.json')
      .then((response) => {
        this.abilities = response.data
        this.sortAbilities()
        this.selectAbility()
        this.lineLabelList()
        this.barFillData()
      })
    this.$axios
      .get(`/api/v1/messages/${this.user.id}`)
      .then((response) => {
        this.messages = response.data
      })
    this.$axios
      .get(`/api/v1/teachers/${this.user.teacher_id}`)
      .then((response) => {
        this.teacher = response.data
      })
  },
  created () {
    this.$axios
      .get(`/api/v1/rooms/${this.user.id}`)
      .then((response) => {
        this.room = response.data
        const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
        this.messageChannel = cable.subscriptions.create({ channel: 'ChatChannel', room: this.room[0].id }, {
          received: (data) => {
            this.messages.push({
              speaker: data.speaker,
              content: data.content,
              room_name: data.room_name,
              teacher_id: data.teacher_id,
              student_id: data.student_id,
              room_id: data.room_id
            })
          }
        }
        )
      })
  },
  methods: {
    barFillData () {
      this.bar_data_collection = {
        labels: ['国語', '算数', '理科', '英語', '社会'],
        datasets: [
          {
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            data: [
              this.getNationalLanguageScore(),
              this.getArithmeticScore(),
              this.getScienceScore(),
              this.getEnglishScore(),
              this.getSocietyScore()]
          }
        ]
      }
      this.bar_options = {
        title: {
          display: true,
          fontSize: 18,
          text: '学力確認テスト'
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'top',
          display: false
        },
        layout: {
          padding: 0
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100
              }
            }
          ]
        }
      }
    },
    lineFillData () {
      this.line_data_collection = {
        labels: this.line_label,
        datasets: [
          {
            fill: false,
            label: '国語',
            borderColor: [
              'rgba(255, 99, 132, 0.2)'
            ],
            data: this.national_language_scores
          },
          {
            fill: false,
            label: '算数',
            borderColor: [
              'rgba(54, 162, 235, 0.2)'
            ],
            data: this.arithmetic_scores
          },
          {
            fill: false,
            label: '理科',
            borderColor: [
              'rgba(255, 206, 86, 0.2)'
            ],
            data: this.science_scores
          },
          {
            fill: false,
            label: '社会',
            borderColor: [
              'rgba(75, 192, 192, 0.2)'
            ],
            data: this.english_scores
          },
          {
            fill: false,
            label: '英語',
            borderColor: [
              'rgba(153, 102, 255, 0.2)'
            ],
            data: this.society_scores
          }
        ]
      }
      this.line_options = {
        title: {
          display: true,
          fontSize: 18,
          text: '成長記録'
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'top',
          display: false
        },
        layout: {
          padding: 0
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100
              }
            }
          ]
        }
      }
    },
    getNationalLanguageScore () {
      return this.abilitiy[0].national_language
    },
    getArithmeticScore () {
      return this.abilitiy[0].arithmetic
    },
    getScienceScore () {
      return this.abilitiy[0].science
    },
    getEnglishScore () {
      return this.abilitiy[0].english
    },
    getSocietyScore () {
      return this.abilitiy[0].society
    },
    // ↓セレクトの初期値を最新月にセットする
    selectAbility () {
      this.select_ability = this.descending_abilities[0].implementation_month
    },
    // ↓セレクトで選択月が変わった場合の処理
    setAbility (month) {
      this.abilitiy = this.abilities.filter(
        abilitiy => abilitiy.implementation_month === month)
      this.barFillData()
      this.lineFillData()
    },
    // ↓APIから取得したデータを実施月の昇降順に並び替え
    sortAbilities () {
      // ↓降順で並び替え
      this.descending_abilities = this.abilities.slice()
      this.descending_abilities = this.descending_abilities
        .sort((a, b) => new Date(b.implementation_month) - new Date(a.implementation_month))
      // ↓昇順で並び替え
      this.ascending_abilities = this.abilities.slice()
      this.ascending_abilities = this.ascending_abilities
        .sort((a, b) => new Date(a.implementation_month) - new Date(b.implementation_month))
      this.setLineChatData()
    },
    // 折れ線グラフのデータを教科毎に配列を作成
    setLineChatData () {
      this.national_language_scores = this.ascending_abilities.map(abilitiy => abilitiy.national_language)
      this.arithmetic_scores = this.ascending_abilities.map(abilitiy => abilitiy.arithmetic)
      this.science_scores = this.ascending_abilities.map(abilitiy => abilitiy.science)
      this.english_scores = this.ascending_abilities.map(abilitiy => abilitiy.english)
      this.society_scores = this.ascending_abilities.map(abilitiy => abilitiy.society)
    },
    // 折れ線グラフのラベルをAPIデータから実施月で配列を作成
    lineLabelList () {
      this.line_label = this.abilities.map(abilitiy => abilitiy.implementation_month)
      this.line_label = this.line_label
        .sort((a, b) => new Date(a) - new Date(b))
    },
    // チャット内容をAPIへ送信
    sendMessage () {
      this.dataSet()
      this.$axios
        .post('/api/v1/messages', this.send_message)
        .then((response) => {
          this.status = response.data
        })
      this.send_message.content = ''
    },
    // チャット内容の付属データをオブジェクトへ追加
    dataSet () {
      this.send_message.teacher_id = this.user.teacher_id
      this.send_message.student_id = this.user.id
      this.send_message.room_id = this.room[0].id
    },
    // チャット画面をスクロールエンドに設定
    scrollEnd () {
      this.el = document.getElementById('container')
      this.el.scrollTo(0, this.el.scrollHeight)
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
