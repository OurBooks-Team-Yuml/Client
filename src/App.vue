<template>
  <div id="app">
    <img src="./assets/images/a.jpg">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Hello'
    }
  }
}
</script>
