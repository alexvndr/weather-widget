<template>
  <div id="app">
    <!-- access root props via $root -->
    <div class="widget_wrapper" v-show="!settings">
      <i class="ri-settings-3-line"></i>
      <div class="widget_content">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    settings: false,
  }),
  created () {
    this.activeTab = this.$route.name
  },
  methods: {
    switchTab (tab) {
      this.$router.push({ name: tab })
    },
    showSettings () {
      this.settings = !this.settings
    },
  },

  watch: {
    '$route.name' () {
      this.activeTab = this.$route.name
    }
  }
}
</script>
