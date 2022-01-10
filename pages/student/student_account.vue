<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="headline">
              生徒
            </v-card-title>
            <v-card-actions>
              <Chart
                :national-language="60"
                :english="60"
                :arithmetic="80"
                :science="76"
                :society="88"
                :type="line"
              />
            </v-card-actions>
            <v-card-actions>
              <v-btn
                @click="check()"
              >
                確認
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card>
            <v-card-title class="headline">
              生徒
            </v-card-title>
            <v-card-actions>
              <Chart
                :national-language="70"
                :english="40"
                :arithmetic="50"
                :science="45"
                :society="55"
                :type="line"
              />
            </v-card-actions>
            <v-card-actions>
              <v-btn
                @click="check()"
              >
                確認
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Chart from '~/components/Chart.vue'

export default {
  components: {
    Chart
  },
  data () {
    return {
      abilities: []
    }
  },
  mounted () {
    this.$axios
      .get('/api/v1/academic_abilities.json')
      .then(response => (this.abilities = response.data))
  },
  methods: {
    check () {
      console.log(this.abilities)
    }
  }
}
</script>
