<template>
  <LoginForm
    :title="title"
    :link-title="link_title"
    :link="link"
    :login-url="login_url"
  />
</template>

<script>
import LoginForm from '~/components/LoginForm.vue'

export default {
  auth: false,
  components: {
    LoginForm
  },
  data () {
    return {
      title: '生徒ログイン',
      link_title: '先生はこちら',
      link: '/login/teacher_login',
      login_url: '/api/v1/student/sign_in'
    }
  }
}
</script>
