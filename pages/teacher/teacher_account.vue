<template>
  <v-app>
    <h2 style="color:#9A9A9A;">
      担当生徒
    </h2>
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <template #activator="{ on, attrs }">
        <v-row>
          <v-card
            v-for="(student, i) in displayLists"
            :key="`student-${i}`"
            class="mt-7 mr-10"
            max-width="250"
            height="270"
            v-bind="attrs"
            v-on="on"
            @click="showItem(student)"
          >
            <v-img
              :src="setImage()"
            />

            <v-card-title
              class="text-h5 pt-0 pb-4 justify-center"
              style="color:#9A9A9A;"
            >
              {{ student.name }}くん
            </v-card-title>
          </v-card>
        </v-row>
      </template>
      <v-card>
        <v-card-title>
          <v-spacer />
          <v-icon
            x-large
            color="black"
            @click="close"
          >
            mdi-close-box-outline
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="6"
                sm="6"
                md="6"
              >
                <v-avatar
                  class="profile pt-3"
                  size="200"
                  tile
                >
                  <v-img
                    :src="setImage()"
                  />
                </v-avatar>
              </v-col>
              <v-col
                cols="6"
                sm="6"
                md="6"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>名前</v-list-item-subtitle>
                    <v-list-item-title
                      class="text-center text-h5 pt-1 pl-4"
                    >
                      {{ showStudent.name }}くん
                    </v-list-item-title>
                    <v-divider />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>学年</v-list-item-subtitle>
                    <v-list-item-title
                      class="text-center text-h5 pt-1 pl-4"
                    >
                      {{ calcAge(showStudent.birthday) }}年生
                      <!-- {{ showStudent.birthday }} -->
                    </v-list-item-title>
                    <v-divider />
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col
                cols="12"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>住所</v-list-item-subtitle>
                    <v-list-item-title
                      class="text-h5 pt-1 pl-4"
                    >
                      {{ showStudent.address }}
                    </v-list-item-title>
                    <v-divider />
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-dialog>
            <template #activator="{ on, attrs }">
              <v-btn
                large
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="linkmove(showStudent)"
              >
                学力詳細
              </v-btn>
            </template>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div
      class="text-center pt-8"
    >
      <v-pagination
        v-model="page"
        :length="length"
        @input="pageChange"
      />
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import goTo from 'vuetify/es5/services/goto'
export default {
  async asyncData ({ $axios }) {
    let students = []
    await $axios.$get('/api/v1/students')
      .then(res => (students = res))
    return { students }
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    students: [],
    showStudent: {
      name: '',
      address: '',
      birthday: '',
      student_icon: '',
      teacher_id: ''
    },
    page: 1,
    length: 0,
    displayLists: [],
    pageSize: 4
  }),
  computed: {
    ...mapGetters({
      user: 'user_information/getUser'
    })
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  mounted () {
    this.activeUsers()
    this.length = Math.ceil(this.students.length / this.pageSize)
    this.displayLists = this.students.slice(0, this.pageSize)
  },
  methods: {
    activeUsers () {
      this.students = this.students.filter(student => student.teacher_id === this.user.id)
    },
    // 学年計算
    calcAge (birthday) {
      const today = this.$dayjs()
      const birthDate = this.$dayjs(birthday)
      const baseAge = today.year() - birthDate.year() - 5
      // 今年度の４月１日を取得
      const thisSchoolyear = this.$dayjs().month(4 - 1).date(1)
      // 今日が4月1日より前か後か
      const Schoolyear = today.isBefore(thisSchoolyear) ? baseAge - 1 : baseAge
      return Schoolyear
    },
    showItem (student) {
      this.showStudent = Object.assign({}, student)
      this.dialog = true
    },
    setImage () {
      if (this.showStudent.student_icon) {
        return this.showStudent.student_icon
      } else {
        return '/img/default_icon.png'
      }
    },
    close () {
      this.dialog = false
    },
    pageChange (pageNumber) {
      goTo(0)
      this.displayLists = this.students.slice(this.pageSize * (pageNumber - 1), this.pageSize * (pageNumber))
    },
    linkmove (showStudent) {
      this.showStudent = Object.assign({}, showStudent)
      this.$router.push({ path: '/student/student_detail/', query: { id: this.showStudent.id, name: this.showStudent.name } })
    }
  }
}
</script>
