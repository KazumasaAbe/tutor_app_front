<template>
  <v-app>
    <h2 class="mt-2">
      お問合わせ一覧
    </h2>
    <v-data-table
      :headers="headers"
      :items="inquiries"
      :search="search"
      :sort-by="['created_at']"
      :sort-desc="[true]"
      class="elevation-1 mt-3"
      @click:row="showinquiry"
    >
      <template #[`item.read_at`]="{ item }">
        <v-chip
          :color="getColor(item.read_at)"
        >
          <span class="text-white">{{ item.read_at ? '既読' : '未読' }}</span>
        </v-chip>
      </template>
      <template #top>
        <v-toolbar
          flat
        >
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
          <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">詳細</span>
                <v-spacer />
                <v-icon
                  @click="dialog = false"
                >
                  mdi-close-box-outline
                </v-icon>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        :value="inquirydata.name"
                        readonly
                        prepend-icon="mdi-account-circle"
                      />
                      <v-text-field
                        :value="inquirydata.email"
                        readonly
                        prepend-icon="mdi-email-outline"
                      />
                      <v-textarea
                        :value="inquirydata.content"
                        solo
                        readonly
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
export default {
  middleware: 'adminRedirect',
  data () {
    return {
      dialog: false,
      search: '',
      inquiries: [],
      headers: [
        {
          text: 'お名前',
          value: 'name',
          width: '30%'
        },
        {
          text: 'メールアドレス',
          value: 'email',
          width: '55%'
        },
        // {
        //   text: '受信日時',
        //   value: 'created_at'
        // },
        {
          text: '既読',
          value: 'read_at',
          width: '15%'
        }
      ],
      inquirydata: {}
    }
  },
  computed: {
  },
  mounted () {
    this.$axios
      .get('/api/v1/inquiries')
      .then((res) => {
        this.inquiries = res.data
      })
    console.log(this.inquiries) // eslint-disable-line no-console
  },
  methods: {
    showinquiry (inquirydata) {
      this.dialog = true
      this.inquirydata = inquirydata
      this.inquirydata.read_at = new Date()
      console.log(inquirydata) // eslint-disable-line no-console
      const patchURL = `/api/v1/inquiries/${inquirydata.id}`

      this.$axios.$patch(patchURL, this.inquirydata)
        .then((res) => { console.log(res.data) }) // eslint-disable-line no-console
        .catch((e) => {
        })
    },
    getColor (readtime) {
      if (readtime) {
        return 'green'
      } else if (!readtime) {
        return 'red'
      }
    }
  }
}
</script>
<style>
.text-white{
  color: white;
}
.f-36{
  font-size:36px;
}
.f-24{
  font-size:24px;
}
</style>
