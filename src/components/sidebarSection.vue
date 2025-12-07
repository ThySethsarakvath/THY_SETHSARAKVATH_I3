<template>
  <aside class="menu-sidebar">
    <h2>Menu</h2>
    <nav class="side-nav">
      <router-link :to="`/${currentPage}/sections/1`">Section 1</router-link>
      <router-link :to="`/${currentPage}/sections/2`">Section 2</router-link>
      <router-link :to="`/${currentPage}/sections/3`">Section 3</router-link>
      <router-link :to="`/${currentPage}/sections/4`">Section 4</router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "SidebarSection",
  // methods: {
  //  goSection(sectionId) {
  //     this.$router.push(`pageOne/section/${sectionId}`);
  //   },
  // },
  computed: {
    currentPage() {
      return this.$route.matched[0]?.path.replace('/', '') || 'pageOne';
    }
  },
};
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
  font-size: 24px;
}

.side-nav a {
  text-decoration: none;
}

.router-link-active {
  color: red;
}
</style>
