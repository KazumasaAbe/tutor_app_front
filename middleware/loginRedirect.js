export default function ({ store, redirect }) {
  const user = store.getters['user_information/getUser']
  if (!user) {
    redirect('/')
    store.dispatch(
      'flashMessage/showMessage',
      {
        message: 'ログインしてください',
        type: 'error',
        status: true
      }
    )
  }
}
