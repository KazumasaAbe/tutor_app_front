module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // // index.vueが複数あっても問題ないようにする設定
  // overrides: [
  //   {
  //     files: ['pages/index.vue'],
  //     rules: {
  //       'vue/multi-word-component-names': 0
  //     }
  //   }
  // ],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off'
  }
}
