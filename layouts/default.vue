<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="#FFCC66"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="#FFCC99"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        @click="$router.push('/')"
        v-text="title"
      />
      <v-spacer />
      <span v-if="$auth.loggedIn">
        <v-btn
          color="error"
          dark
          @click="logout"
        >
          ログアウト
        </v-btn>
      </span>
    </v-app-bar>
    <v-main>
      <v-container>
        <FlashMessage />
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-account-details',
          title: '先生一覧',
          to: '/teacher_index'
        },
        {
          icon: 'mdi-email-edit-outline',
          title: 'お問合せ',
          to: '/inquiry'
        },
        {
          icon: 'mdi-login',
          title: 'ログイン',
          to: '/login/student_login'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Tutor_Management_App'
    }
  },
  methods: {
    logout () {
      this.$axios.delete('/api/v1/student/sign_out', {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      })
        .then((res) => {
          this.$auth.logout()
          localStorage.removeItem('uid')
          localStorage.removeItem('access-token')
          localStorage.removeItem('client')
          this.$router.push('/')
          this.$store.dispatch(
            'flashMessage/showMessage',
            {
              message: 'ログアウトしました',
              type: 'success',
              status: true
            },
            { root: true }
          )
          this.$store.commit('user_information/logout')
        })
    }
  }
}
</script>
