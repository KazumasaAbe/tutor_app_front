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
  auth: false,
  components: {
    LoginForm
  },
  data () {
    return {
      title: '生徒ログイン',
      link_title: '先生はこちら',
      link: '/login/teacher_login'
    }
  }
}
</script>
