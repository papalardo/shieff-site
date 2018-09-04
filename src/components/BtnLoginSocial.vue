<template>
  <button type="button" @click="login">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'LoginSocial',
  props: ['provider'],
  mounted () {
    window.addEventListener('message', this.onMessage, false)
  },
  beforeDestroy () {
    window.removeEventListener('message', this.onMessage)
  },
  methods: {
    async login () {
      const newWindow = openWindow(`${this.axios.defaults.baseURL}/auth/login/${this.provider}`, 'Login')
    },
    /**
     * @param {MessageEvent} e
     */
    onMessage (e) {
      // if (e.origin !== window.origin || !e.data.token) {
      //   return
      // }
      let token = e.data.token;
      this.$emit('loginCallback', token);
    },
  }
}
/**
 * @param  {Object} options
 * @return {Window}
 */
function openWindow (url, title, options = {}) {
  if (typeof url === 'object') {
    options = url
    url = ''
  }
  options = { url, title, width: 600, height: 720, ...options }
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top
  const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
  const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height
  options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft
  options.top = ((height / 2) - (options.height / 2)) + dualScreenTop
  const optionsStr = Object.keys(options).reduce((acc, key) => {
    acc.push(`${key}=${options[key]}`)
    return acc
  }, []).join(',')
  const newWindow = window.open(url, title, optionsStr)
  if (window.focus) {
    newWindow.focus()
  }
  return newWindow
}
</script>
