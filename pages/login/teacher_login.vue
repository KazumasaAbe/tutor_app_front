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
      title: '先生ログイン',
      link_title: '生徒はこちら',
      link: '/login/student_login',
      login_url: '/api/v1/teacher/sign_in'
    }
  }
}
</script>
