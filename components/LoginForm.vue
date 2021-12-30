<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="10">
          <v-card>
            <v-card-title>
              {{ title }}
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  prepend-icon="mdi-account-circle"
                  label="メールアドレス"
                />
                <v-text-field
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  prepend-icon="mdi-lock"
                  label="パスワード"
                  @click:append="showPassword = !showPassword"
                />
              </v-form>
              <v-card-actions>
                <v-btn
                  block
                  color="info"
                >
                  ログイン
                </v-btn>
              </v-card-actions>
              <v-layout justify-right>
                <v-card-actions>
                  <router-link to="{{ link }}">
                    {{ linkTitle }}
                  </router-link>
                </v-card-actions>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    linkTitle: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      email: '',
      password: '',
      showPassword: false
    }
  }
}
</script>
