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
        <v-text-field
          v-model="inquiry.name"
          :error-messages="errors"
          label="お名前"
          prepend-icon="mdi-account-circle"
          required
        />
        <v-text-field
          v-model="inquiry.email"
          :error-messages="errors"
          label="メールアドレス"
          prepend-icon="mdi-account-circle"
          required
        />
        <v-textarea
          v-model="inquiry.content"
          solo
          name="inquirys"
          label="お問い合わせ内容をご記入ください"
        />
        <v-btn
          elevation="2"
          block
          color="primary"
          @click="postMsg"
        >
          送信
        </v-btn>
        <div
          v-for="(msg, i) in msgs"
          :key="i"
        >
          {{ msg }}
        </div>
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
        email: '',
        content: ''
      }
    }
  },
  // mounted () {
  //   console.log("aaa")
  // },
  methods: {
    postMsg () {
      this.$axios.$post('/api/v1/inquiries', this.inquiry)
        .then(res => this.msgs.push(res))
        .catch((e) => {
          console.log(e.response.data.errors.full_messages)
        })
    }
  }
}
</script>
<style>
form{
  padding:20px;
}
</style>
