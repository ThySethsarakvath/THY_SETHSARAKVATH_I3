<!-- <template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
}
</script> -->

<script>
import AppHeader from './components/headerSection.vue'
import AppFooter from './components/footerSection.vue'
import AppSidebar from './components/sidebarSection.vue'
// import AppPageOne from './views/pageOne.vue'
// import AppPageTwo from './views/pageTwo.vue'
// import AppPageThree from './views/pageThree.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppSidebar,
    // AppPageOne,
    // AppPageTwo,
    // AppPageThree

  }
}
</script>

<template>
  <div class="content">
    <AppHeader />
    <div class="main">
      <AppSidebar />
      <div class="view">
        <router-view />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<style>
.content {
  border: 2px solid gray;
}

.main {
  display: flex;
  flex-direction: row;
}

.view {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
