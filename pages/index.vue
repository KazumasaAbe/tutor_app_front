<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Top_page
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="getMsg"
          >
            RailsからAPI取得
          </v-btn>
          <div
            v-for="(msg, i) in msgs"
            :key="i"
          >
            {{ msg }}
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      msgs: []
    }
  },
  methods: {
    getMsg () {
      this.$axios.$get('/api/v1/hello')
        .then(res => this.msgs.push(res))
    }
  }
}
</script>
