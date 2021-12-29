<template>
  <v-app>
    <h1>先生一覧</h1>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template #activator="{ on, attrs }">
        <v-card
          class="mx-auto"
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
        <v-row
          align="end"
          class="fill-height"
        >
          <v-col
            align-self="start"
            class="pa-0"
            cols="12"
          >
            <v-avatar
              class="profile"
              color="grey"
              size="164"
              tile
            >
              <v-img
                :src="image_src"
              />
            </v-avatar>
          </v-col>
          <v-col class="py-0">
            <v-list-item
              color="rgba(0, 0, 0, .4)"
              dark
            >
              <v-list-item-content>
                <v-list-item-title
                  class="text-h6"
                >
                  ◯◯先生
                </v-list-item-title>
                <v-list-item-subtitle>国語</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>

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
