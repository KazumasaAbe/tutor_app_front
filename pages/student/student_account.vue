<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-card-title class="headline">
            生徒
          </v-card-title>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card-actions>
            <v-select
              v-model="select_ability"
              item-text="implementation_month"
              :items="abilities"
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
            />
          </v-card-actions>
        </v-col>
        <v-col cols="6">
          <v-card-actions>
            <LineChart
              :chart-data="line_data_collection"
            />
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from '~/components/BarChart.vue'

export default {
  components: {
    BarChart
  },
  data () {
    return {
      bar_data_collection: { labels: [], datasets: [] },
      line_data_collection: { labels: [], datasets: [] },
      abilities: [],
      abilitiy: {},
      select_ability: {},
      toggle_exclusive: [],
      items: [
        'abe', 'kazu', 'yuho', 'abe', 'aho'
      ]
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
    }
  },
  mounted () {
    this.$axios
      .get('/api/v1/academic_abilities')
      .then((response) => {
        this.abilities = response.data
        this.sortAbilities()
        this.selectAbility()
        this.BarFillData()
        this.LineFillData()
      })
  },
  methods: {
    BarFillData () {
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
        ],
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      }
    },
    LineFillData () {
      this.line_data_collection = {
        labels: this.items,
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
        ],
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
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
    setAbility (month) {
      this.abilitiy = this.abilities.filter(
        abilitiy => abilitiy.implementation_month === month)
      this.BarFillData()
      this.LineFillData()
    },
    sortAbilities () {
      this.abilities = this.abilities
        .sort((a, b) => new Date(b.implementation_month) - new Date(a.implementation_month))
    },
    selectAbility () {
      this.select_ability = this.abilities[0].implementation_month
    }
  }
}
</script>
