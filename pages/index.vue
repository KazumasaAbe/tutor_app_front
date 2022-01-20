<template>
  <v-row justify="center" align="center">
    <v-app>
      <v-container>
        <v-row>
          <v-col
            cols="12"
          >
            <v-img
              v-model="showNotice.notice_image"
              class="box1"
              max-height="350"
              max-width="800"
              :src="topImage()"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-dialog
            v-model="dialog"
            width="800"
          >
            <template #activator="{ on, attrs }">
              <v-row>
                <v-col
                  cols="6"
                  sm="6"
                  md="6"
                >
                  <div>
                    <h4>
                      お知らせ
                    </h4>
                    <div class="box2">
                      <v-list
                        style="max-height: 150px"
                        class="overflow-y-auto"
                      >
                        <table v-if="notices.length">
                          <tr>
                            <th>
                              &emsp; 日付 &emsp; &emsp; &emsp; タイトル
                            </th>
                          </tr>
                          <tbody>
                            <tr
                              v-for="(notice, i) in notices"
                              :key="`notice-${i}`"
                            >
                              <v-btn
                                text
                                small
                                v-bind="attrs"
                                v-on="on"
                                @click="showItem(notice)"
                              >
                                <td>
                                  <span style="font-weight:bold;">
                                    {{ dateFormat(notice.created_at) }}
                                    &emsp;
                                    {{ notice.title }}
                                  </span>
                                </td>
                              </v-btn>
                            </tr>
                          </tbody>
                        </table>
                        <div v-else>
                          お知らせが取得できませんでした
                        </div>
                      </v-list>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </template>
            <v-card>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-card-title>
                      <h3 style="color:#4398F5">
                        {{ showNotice.title }}
                      </h3>
                      <v-spacer />
                      <v-icon
                        @click="close"
                      >
                        mdi-close-box-outline
                      </v-icon>
                    </v-card-title>
                    <v-col cols="12">
                      <div class="text-center">
                        <v-img
                          v-model="showNotice.notice_image"
                          max-height="300"
                          max-width="300"
                          :src="setImage()"
                        />
                      </div>
                    </v-col>
                    <v-card-text>
                      <span style="font-size:25px;">
                        {{ showNotice.text }}
                      </span>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-dialog>
          <div class="box3">
            <!-- <p></p> -->
          </div>
        </v-row>
      </v-container>
    </v-app>
  </v-row>
</template>
<script>
export default {
  async asyncData ({ $axios }) {
    let notices = []
    await $axios.$get('/api/v1/notices')
      .then(res => (notices = res))
    return { notices }
  },
  data: () => ({
    dialog: false,
    showNotice: {
      created_at: '',
      title: '',
      notice_image: '',
      text: ''
    }
  }),
  computed: {
    dateFormat () {
      return (date) => {
        const dateTimeFormat = new Intl.DateTimeFormat(
          'ja', { dateStyle: 'medium' }
        )
        return dateTimeFormat.format(new Date(date))
      }
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    showItem (notice) {
      this.showNotice = Object.assign({}, notice)
      this.dialog = true
    },
    topImage () {
      if (this.showNotice.notice_image) {
        return this.showNotice.notice_image
      } else {
        return '/img/top.png'
      }
    },
    setImage () {
      if (this.showNotice.notice_image) {
        return this.showNotice.notice_image
      } else {
        return '/img/notice_img2.png'
      }
    },
    close () {
      this.dialog = false
    }
  }
}
</script>
<style scoped>
.box1 {
  width: 800px;
  height: 350px;
  margin: 2em 0;
  border: solid 3px #FBB851; /*線*/
  border-radius: 50px; /*角の丸み */
}
.box2 {
  width: 350px;
  height: 200px;
  padding: 0.5em 1em;
  margin: 2em 0;
  font-weight: bold;
  background: #FFF;
  border: solid 3px #9A9A9A; /*線*/
  border-radius: 10px; /*角の丸み*/
}
.box3 {
  width: 350px;
  height: 200px;
  padding: 0.5em 1em;
  margin: 55px 0;
  font-weight: bold;
  background: #CDCDCD;
  border: solid 3px #9A9A9A;/*線*/
  border-radius: 10px;/*角の丸み*/
}
th{
  text-align: left;
  color: #9A9A9A;
}
.text-center{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>


  <!-- <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Top_page
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="getMsg"
          >
            RailsからAPI取得
          </v-btn>
          <div
            v-for="(msg, i) in msgs"
            :key="i"
          >
            {{ msg }}
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      msgs: []
    }
  },
  methods: {
    getMsg () {
      this.$axios.$get('/api/v1/hello')
        .then(res => this.msgs.push(res))
    }
  } -->
<!-- } -->
<!-- </script> -->
