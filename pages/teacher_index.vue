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
        <v-card
          class="mt-5"
          max-width="250"
          v-bind="attrs"
          v-on="on"
        >
          <v-img
            :src="image_src"
          />

          <v-card-title class="text-h5 pt-0 pb-4 justify-center">
            〇〇先生
          </v-card-title>
        </v-card>
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
                :src="image_src"
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
                  槇 貴弘
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
            初めまして！槇貴弘といいます。<br>
            生徒に合わせ教え方を変えて勉強が楽しい！と<br>
            思ってもらえるように笑顔を絶やさず丁寧に教えます！
          </v-card>
        </v-col>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      image_src: require('@/assets/images/default_icon.png')
    }
  }
}
</script>
