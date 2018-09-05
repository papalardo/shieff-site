<template>
  <div>
      <navbar/>
      <app-main/>
  </div>
</template>

<script>
import { AppMain, Navbar } from './components'

export default {
    name: 'Layout',
    components: {
        Navbar,
        AppMain
    }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  position: relative;
  overflow: hidden;
}
</style>
