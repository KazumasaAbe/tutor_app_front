<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          お問合わせ
        </v-card-title>
        <div class="container">
          <div
            v-for="(msg, i) in msgs"
            :key="i"
          >
            <div
              v-for="(ms , j) in msg"
              :key="j"
            >
              <p
                v-for="(text , k) in ms"
                :key="k"
                class="text-red"
              >
                <span v-if="j == 'name'">
                  ・{{ labels.name }}{{ text }}
                </span>
                <span v-else-if="j == 'email'">
                  ・{{ labels.email }}{{ text }}
                </span>
                <span v-else-if="j == 'content'">
                  ・{{ labels.content }}{{ text }}
                </span>
                <span v-else>
                  ・{{ j }}{{ text }}
                </span>
              </p>
            </div>
          </div>
          <v-text-field
            v-model="inquiry.name"
            label="お名前"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            v-model="inquiry.email"
            label="メールアドレス"
            prepend-icon="mdi-email-outline"
          />
          <v-textarea
            v-model="inquiry.content"
            solo
            label="お問い合わせ内容をご記入ください"
          />
          <v-card-actions>
            <v-btn
              elevation="2"
              block
              color="primary"
              @click="postMsg"
            >
              送信
            </v-btn>
          </v-card-actions>
          <div
            v-for="(msg, i) in result"
            :key="i"
            class="result"
          >
            {{ msg }}
          </div>
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
      result: [],
      inquiry: {
        name: '',
        email: '',
        content: ''
      },
      labels: {
        name: 'お名前',
        email: 'メールアドレス',
        content: 'お問い合わせ内容'
      }
    }
  },
  // mounted () {
  //   console.log("aaa")
  // },
  methods: {
    postMsg () {
      this.msgs.length = 0
      this.result.length = 0
      this.$axios.$post('/api/v1/inquiries', this.inquiry)
        .then(res => this.result.push(res),
          this.inquiry.name = '',
          this.inquiry.email = '',
          this.inquiry.content = '')
        .catch((e) => {
          this.msgs.push(e.response.data)
        })
    }
  }
}
</script>
<style>
p {
  margin-bottom: 0px !important;
}
.container {
  padding:20px;
}
.headline {
  padding-bottom: 0px !important;
}
.text-red {
  color: red;
}
.result {
  padding-top:10px;
}
</style>
