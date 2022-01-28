<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-title class="f-24">
        お問合わせ一覧
      </v-title>
      <v-card>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
        <v-spacer />
        <v-card-title class="headline">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="inquiries"
          :search="search"
          @click:row="dialog = true"
        />
      </v-card>
    </v-col>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <!-- <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template> -->
      <v-card>
        <v-card-title>
          <span class="text-h5">詳細</span>
        </v-card-title>
        <v-btn
          color="darken-1"
          text
          @click="dialog = false"
        >
          <span class="f-24">×</span>
        </v-btn>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  label="お問い合わせ内容をご記入ください"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      search: '',
      inquiries: [],
      headers: [
        {
          text: 'お名前',
          value: 'name'
        },
        {
          text: 'メールアドレス',
          value: 'email'
        }
      ]
    }
  },
  mounted () {
    this.$axios
      .get('/api/v1/inquiries')
      .then((res) => { this.inquiries = res.data })
    // console.log(this.inquiries)
  },
  methods: {
    clickRow (row) {
      console.log('clickRow', row)
    }
  }
}
</script>
<style>
.f-36{
  font-size:36px;
}
.f-24{
  font-size:24px;
}
</style>
