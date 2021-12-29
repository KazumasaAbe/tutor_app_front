<template>
  <v-app>
    <h1>先生一覧</h1>
    <v-card
      class="mx-auto"
      max-width="300"
    >
      <v-img
        v-bind:src="image_src"
      />

      <v-card-subtitle class="pb-0">
        〇〇先生
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>国語</div>
      </v-card-text>

      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            color="orange"
            text
            v-bind="attrs"
            v-on="on"
          >
            詳細
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Privacy Policy
          </v-card-title>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              閉じる
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      image_src: require('@/assets/images/default_teacher_icon.png')
    }
  }
}
</script>
