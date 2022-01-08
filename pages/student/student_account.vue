<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="headline">
              生徒マイページ
            </v-card-title>
            <v-card-actions>
              <v-btn
                @click="check()"
              >
                確認
              </v-btn>
              <v-spacer />
              <Chart />
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
