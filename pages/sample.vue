<template>
  <div class="ma-5">
    <v-btn
      color="info"
      @click="descendingNumber()"
    >
      降順
    </v-btn>
    <v-btn
      color="green"
      @click="ascendingNumber()"
    >
      昇順
    </v-btn>
    <div class="ma-5">
      [ 1, 3, 2, 7, 9, 33, 23, 4] ←最初にdataで設定した値
    </div>
    <div class="ma-5">
      {{ numbers }} ← numbersの配列の中身(sort元の配列)
    </div>
    <div class="ma-5">
      {{ descending_number }} ← descending_numberの配列の中身(降順)
    </div>
    <div class="ma-5">
      {{ ascending_number }} ← ascending_numberの配列の中身(昇順)
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      numbers: [1, 3, 2, 7, 9, 33, 23, 4],
      descending_number: [],
      ascending_number: [],
      result: []
    }
  },
  mounted () {
    this.result = this.numbers
  },
  methods: {
    descendingNumber () {
      this.descending_number = this.numbers
        .sort((a, b) => new Date(b) - new Date(a))
      console.log(1)
    },
    ascendingNumber () {
      this.ascending_number = this.numbers
        .sort((a, b) => new Date(a) - new Date(b))
      console.log(2)
    }
  }
}
</script>
