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
        <v-form
          ref="form"
          v-model="inquiry"
        >
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
            name="inquirys"
            label="お問い合わせ内容をご記入ください"
          />
          <v-btn
            elevation="2"
            block
            color="primary"
            @click="getMsg"
          >
            送信
          </v-btn>
        </v-form>
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
        name: 'aaa',
        email: 'aaa'

      }
    }
  },
  // mounted () {
  //   console.log("aaa")
  // },
  methods: {
    getMsg () {
      this.$axios.$post('/api/v1/hello', this.inquiry)
        .then(res => this.msgs.push(res))
      console.log(this.msgs)
    }
  }
}
</script>
<style>
form{
  padding:20px;
}
</style>
