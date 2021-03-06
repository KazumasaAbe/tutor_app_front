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
          v-for="(item, i) in setItems()"
          :key="i"
          :to="item.to"
          router
          exact
          @click="itemActionClick(item.action)"
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
      <span v-if="user">
        <v-icon>mdi-account-circle</v-icon>
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
import { mapGetters } from 'vuex'
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      default_items: [
        {
          icon: 'mdi-account-details',
          title: '先生一覧',
          to: '/teacher_index',
          action: false
        },
        {
          icon: 'mdi-email-edit-outline',
          title: 'お問合せ',
          to: '/inquiry',
          action: false
        },
        {
          icon: 'mdi-login',
          title: 'ログイン',
          to: '/login/student_login',
          action: false
        }
      ],
      student_items: [
        {
          icon: 'mdi-account-details',
          title: '先生一覧',
          to: '/teacher_index',
          action: false
        },
        {
          icon: 'mdi-email-edit-outline',
          title: 'お問合せ',
          to: '/inquiry',
          action: false
        },
        {
          icon: 'mdi-account',
          title: 'マイページ',
          to: '/student/student_account',
          action: false
        },
        {
          icon: 'mdi-cog-outline',
          title: '設定',
          to: '/student/student_config',
          action: false
        },
        {
          icon: 'mdi-login',
          title: 'ログアウト',
          action: 'logout'
        }
      ],
      teacher_items: [
        {
          icon: 'mdi-account-details',
          title: '先生一覧',
          to: '/teacher_index',
          action: false
        },
        {
          icon: 'mdi-account',
          title: 'マイページ',
          to: '/teacher/teacher_account',
          action: false
        },
        {
          icon: 'mdi-cog-outline',
          title: '設定',
          to: '/teacher/teacher_config',
          action: false
        },
        {
          icon: 'mdi-login',
          title: 'ログアウト',
          action: 'logout'
        }
      ],
      admin_items: [
        {
          icon: 'mdi-account-details',
          title: '先生一覧',
          to: '/admin_teacher_index',
          action: false
        },
        {
          icon: 'mdi-account-details',
          title: '生徒一覧',
          to: '/admin/student_index',
          action: false
        },
        {
          icon: 'mdi-email-fast',
          title: 'お問合せ一覧',
          to: '/admin/inquiry_index',
          action: false
        },
        {
          icon: 'mdi-clipboard-text-outline',
          title: 'お知らせ',
          to: '/admin/notice_index',
          action: false
        },
        {
          icon: 'mdi-login',
          title: 'ログアウト',
          action: 'logout'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Tutor_Management_App'
    }
  },

  computed: {
    ...mapGetters({
      user: 'user_information/getUser'
    })
  },

  methods: {
    logout () {
      this.url = this.setUrl()
      this.$axios.delete(this.url, {
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
    },
    setUrl () {
      if (this.user && !this.user.teacher) {
        return '/api/v1/student/sign_out'
      } else if (this.user && this.user.teacher) {
        return '/api/v1/teacher/sign_out'
      }
    },
    setItems () {
      if (!this.user) {
        return this.default_items
      } else if (this.user && !this.user.admin && !this.user.teacher) {
        return this.student_items
      } else if (this.user && !this.user.admin && this.user.teacher) {
        return this.teacher_items
      } else if (this.user && this.user.admin) {
        return this.admin_items
      }
    },
    itemActionClick (action) {
      if (action === 'logout') {
        this.logout()
      }
    }
  }
}
</script>
