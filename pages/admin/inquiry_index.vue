<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          お問合わせ一覧
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="inquiries"
          :search="search"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      inquiries: [],
      headers: [
        {
          text: 'お名前',
          value: 'name'
        },
        {
          text: 'メールアドレス',
          value: 'email'
        }
      ]
    }
  },
  mounted () {
    this.$axios
      .get('/api/v1/inquiries')
      .then((res) => { this.inquiries = res.data })
    // console.log(this.inquiries)
  }
}
</script>
