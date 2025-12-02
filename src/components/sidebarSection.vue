<template>
  <aside class="menu-sidebar">
    <h2>Menu</h2>
    <nav class="side-nav">
      <router-link to="/section1">Section 1</router-link>
      <router-link to="/section2">Section 2</router-link>
      <router-link to="/section3">Section 3</router-link>
      <router-link to="/section4">Section 4</router-link>
    </nav>
  </aside>
</template>

<script>
// export default {
//   name: "SidebarSection",
//   methods: {
//    goSection(sectionId) {
//       this.$router.push(`pageOne/section/${sectionId}`);
//     },
//   },
// };
</script>
<style scoped>
.menu-sidebar {
  border-right: 2px solid gray;
  padding: 20px;
  width: 200px;
  height: 620px;
}

.side-nav {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
</style>
