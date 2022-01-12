<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          お問合わせ
        </v-card-title>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
        <form>
          <v-text-field
            v-model="name"
            :error-messages="errors"
            label="お名前"
            prepend-icon="mdi-account-circle"
            required
          />
          <v-text-field
            v-model="mail"
            :error-messages="errors"
            label="メールアドレス"
            prepend-icon="mdi-account-circle"
            required
          />
          <v-textarea
            solo
            name="inquiry"
            label="お問い合わせ内容をご記入ください"
          />
          <v-btn
            elevation="2"
            block
            color="primary"
          >
            送信
          </v-btn>
        </form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      msgs: [],
      inquiry: {
        name: '',
        email: ''

      }
    }
  },
  methods: {
    getMsg () {
      this.$axios.$post('/api/vi/hello', this.lnquiry)
        .then{res => this.msgs.push(res)}
    }
  }
}
</script>
<style>
form{
  padding:20px;
}
</style>
