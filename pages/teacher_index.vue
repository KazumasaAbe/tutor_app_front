
<template>
  <v-app>
    <h2 class="mt-2">
      先生一覧
    </h2>
    <v-dialog
      v-model="dialog"
      width="470"
    >
      <template #activator="{ on, attrs }">
        <v-row>
          <v-card
            v-for="(teacher, i) in teachers"
            :key="`teacher-${i}`"
            class="mt-7 mr-10"
            max-width="250"
            v-bind="attrs"
            v-on="on"
            @click="showItem(teacher)"
          >
            <v-img
              :src="setImage()"
            />

            <v-card-title class="text-h5 pt-0 pb-4 justify-center">
              {{ teacher.name }}先生
            </v-card-title>
          </v-card>
        </v-row>
      </template>

      <v-card>
        <v-row>
          <v-col>
            <v-avatar
              class="profile"
              size="164"
              tile
            >
              <v-img
                :src="setImage()"
              />
            </v-avatar>
          </v-col>
          <v-col
            class="mt-4"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>名前</v-list-item-subtitle>
                <v-list-item-title
                  class="text-h6 pt-1 pl-4"
                >
                  {{ showTeacher.name }}
                </v-list-item-title>
                <v-divider />
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>担当教科</v-list-item-subtitle>
                <v-list-item-title
                  class="text-h6 pt-1 pl-4"
                >
                  国語
                </v-list-item-title>
                <v-divider />
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col>
            <v-card-actions>
              <v-spacer />
              <v-btn
                outlined
                small
                @click="dialog = false"
              >
                ✖️
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-col>
          <v-list-item-subtitle
            class="pb-2 pl-2"
          >
            自己紹介
          </v-list-item-subtitle>
          <v-card
            outlined
            class="pa-3"
          >
            {{ showTeacher.introduction }}
          </v-card>
        </v-col>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    let teachers = []
    await $axios.$get('/api/v1/teachers')
      .then(res => (teachers = res))
    return { teachers }
  },
  data () {
    return {
      dialog: false,
      showTeacher: {
        name: '',
        teacher_icon: '',
        introduction: ''
      }
    }
  },
  computed: {
    dateFormat () {
      return (date) => {
        const dateTimeFormat = new Intl.DateTimeFormat(
          'ja', { dateStyle: 'medium', timeStyle: 'short' }
        )
        return dateTimeFormat.format(new Date(date))
      }
    }
  },
  methods: {
    showItem (teacher) {
      // eslint-disable-next-line no-undef
      this.showTeacher = Object.assign({}, teacher)
      this.dialog = true
    },
    setImage () {
      if (this.showTeacher.teacher_icon) {
        return this.showTeacher.teacher_icon
      } else {
        return '/img/default_icon.png'
      }
    }
  }
}
</script>
