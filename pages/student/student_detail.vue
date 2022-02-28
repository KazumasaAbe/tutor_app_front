<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-card-title class="headline">
            {{ $route.query.name }}さん
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
        <v-col cols="12">
          <v-card-title
            class="test-list-title"
          >
            学力確認テスト一覧
            <v-card-actions>
              <v-icon
                x-large
                color="black"
                @click="createItem()"
              >
                mdi-plus-box-outline
              </v-icon>
            </v-card-actions>
          </v-card-title>
          <v-dialog
            v-model="dialog2"
            max-width="600px"
          >
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
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="pickerdate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="abilitiy.implementation_month"
                            label="日付"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="abilitiy.implementation_month"
                          no-title
                          scrollable
                        >
                          <v-spacer />
                          <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                          >
                            キャンセル
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(pickerdate)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="2"
                      sm="2"
                      md="2"
                    >
                      <v-text-field
                        v-model="abilitiy.national_language"
                        label="国語"
                      />
                    </v-col>
                    <v-col
                      cols="2"
                      sm="2"
                      md="2"
                    >
                      <v-text-field
                        v-model="abilitiy.arithmetic"
                        label="算数"
                      />
                    </v-col>
                    <v-col
                      cols="2"
                      sm="2"
                      md="2"
                    >
                      <v-text-field
                        v-model="abilitiy.science"
                        label="理科"
                      />
                    </v-col>
                    <v-col
                      cols="2"
                      sm="2"
                      md="2"
                    >
                      <v-text-field
                        v-model="abilitiy.english"
                        label="英語"
                      />
                    </v-col>
                    <v-col
                      cols="2"
                      sm="2"
                      md="2"
                    >
                      <v-text-field
                        v-model="abilitiy.society"
                        label="社会"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-dialog>
                  <template #activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      @click="save"
                      v-on="on"
                    >
                      保存
                    </v-btn>
                  </template>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-data-table
            :headers="headers"
            :items="abilities"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-header
            hide-default-footer
            :sort-by="['implementation_month']"
            :sort-desc="true"
            class="elevation-1"
            @page-count="pageCount = $event"
          >
            <template #[`header`]>
              <tr>
                <th
                  class="header-th"
                >
                  日付
                </th>
                <th
                  class="header-th"
                >
                  国語
                </th>
                <th
                  class="header-th"
                >
                  算数
                </th>
                <th
                  class="header-th"
                >
                  理科
                </th>
                <th
                  class="header-th"
                >
                  英語
                </th>
                <th
                  class="header-th"
                >
                  社会
                </th>
                <th
                  class="header-th"
                >
                  編集/削除
                </th>
              </tr>
            </template>
            <template #[`item`]="{ item }">
              <tr>
                <td class="items-td">
                  <span>
                    {{ dateFormat(item.implementation_month) }}
                  </span>
                </td>
                <td class="items-td">
                  <span>
                    {{ item.national_language }}点
                  </span>
                </td>
                <td class="items-td">
                  <span>
                    {{ item.arithmetic }}点
                  </span>
                </td>
                <td class="items-td">
                  <span>
                    {{ item.science }}点
                  </span>
                </td>
                <td class="items-td">
                  <span>
                    {{ item.english }}点
                  </span>
                </td>
                <td class="items-td">
                  <span>
                    {{ item.society }}点
                  </span>
                </td>
                <td class="items-td">
                  <v-icon
                    small
                    class="mr-2"
                    color="primary"
                    @click="editItem(item)"
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
                </td>
              </tr>
            </template>
          </v-data-table>
          <v-dialog
            v-model="dialog"
            max-width="600px"
          >
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
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-menu
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="pickerdate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="abilitiy.implementation_month"
                            label="日付"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="abilitiy.implementation_month"
                          no-title
                          scrollable
                        >
                          <v-spacer />
                          <v-btn
                            text
                            color="primary"
                            @click="menu2 = false"
                          >
                            キャンセル
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(pickerdate)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="2"
                      sm="2"
                      md="2"
                    >
                      <v-text-field
                        v-model="abilitiy.national_language"
                        label="国語"
                      />
                    </v-col>
                    <v-col
                      cols="2"
                      sm="2"
                      md="2"
                    >
                      <v-text-field
                        v-model="abilitiy.arithmetic"
                        label="算数"
                      />
                    </v-col>
                    <v-col
                      cols="2"
                      sm="2"
                      md="2"
                    >
                      <v-text-field
                        v-model="abilitiy.science"
                        label="理科"
                      />
                    </v-col>
                    <v-col
                      cols="2"
                      sm="2"
                      md="2"
                    >
                      <v-text-field
                        v-model="abilitiy.english"
                        label="英語"
                      />
                    </v-col>
                    <v-col
                      cols="2"
                      sm="2"
                      md="2"
                    >
                      <v-text-field
                        v-model="abilitiy.society"
                        label="社会"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-dialog>
                  <template #activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      @click="update"
                      v-on="on"
                    >
                      保存
                    </v-btn>
                  </template>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                本当に削除しますか？
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="closeDelete">
                  キャンセル
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                  削除
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-pagination
            v-model="page"
            :length="pageCount"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import BarChart from '~/components/BarChart.vue'
export default {
  components: {
    BarChart
  },
  middleware: 'loginRedirect',
  data () {
    return {
      dialog: false,
      dialog2: false,
      dialogDelete: false,
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
      headers: [
        {
          text: '日付',
          align: 'start',
          value: 'implementation_month'
        },
        { text: '国語', sortable: false, value: 'national_language', borderLeft: '1px solid grey' },
        { text: '算数', sortable: false, value: 'arithmetic', class: 'header-th' },
        { text: '理科', sortable: false, value: 'science' },
        { text: '英語', sortable: false, value: 'english' },
        { text: '社会', sortable: false, value: 'society' },
        { text: '編集/削除', value: 'actions', sortable: false, align: 'center' }
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 3,
      defaultItem: {},
      pickerdate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      menu2: false
    }
  },
  computed: {
    dateFormat () {
      return (date) => {
        return this.$dayjs(date).format('YYYY年MM月DD日')
      }
    }
  },
  watch: {
    select_ability (val, old) {
      this.setAbility(val)
    },
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
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
    editItem (item) {
      this.abilitiy = Object.assign({}, item)
      this.dialog = true
    },
    createItem () {
      this.abilitiy.student_id = this.$route.query.id
      this.dialog2 = true
    },
    deleteItem (item) {
      this.abilitiy = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      const url = `/api/v1/academic_abilities/${this.abilitiy.id}`
      this.$axios.$delete(url)
      this.$store.dispatch(
        'flashMessage/showMessage',
        {
          message: '削除しました',
          type: 'danger',
          status: true
        }
      )
      this.closeDelete()
      this.$router.go('/student/student_detail')
    },
    close () {
      this.dialog = false
      this.dialog2 = false
      this.$nextTick(() => {
        this.abilitiy = Object.assign({}, this.defaultItem)
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.abilitiy = Object.assign({}, this.defaultItem)
      })
    },
    update () {
      const url = `/api/v1/academic_abilities/${this.abilitiy.id}`
      this.$axios.$patch(url, this.abilitiy)
      Object.assign(this.abilities, this.abilitiy)
      this.$store.dispatch(
        'flashMessage/showMessage',
        {
          message: '編集しました',
          type: 'info',
          status: true
        }
      )
      this.$router.go('/student/student_detail')
    },
    save () {
      this.$axios.$post('/api/v1/academic_abilities', this.abilitiy)
        .then(res => this.abilities.push(res))
      this.$store.dispatch(
        'flashMessage/showMessage',
        {
          message: '新規登録しました',
          type: 'success',
          status: true
        }
      )
      this.close()
      this.$router.go('/student/student_detail')
    }
  }
}
</script>
<style scoped>
.test-list-title {
  font-size: 18px;
  font-weight: bolder;
  color: #6f6f6f;
}
.header-th {
  height: 50px;
  border: 1px solid #6f6f6f;
}
.items-td {
  border: 1px solid #6f6f6f;
}
</style>
