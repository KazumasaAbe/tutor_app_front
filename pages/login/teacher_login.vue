<template>
  <LoginForm
    :title="title"
    :link-title="link_title"
    :link="link"
  />
</template>

<script>
import LoginForm from '~/components/LoginForm.vue'

export default {
  components: {
    LoginForm
  },
  data () {
    return {
      title: '先生ログイン',
      link_title: '生徒はこちら',
      link: '/login/student_login'
    }
  }
}
</script>
