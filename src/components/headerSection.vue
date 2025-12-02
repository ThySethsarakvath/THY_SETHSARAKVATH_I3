<template>
  <header class="header-section">
    <h1>Header Section</h1>
    <nav class="nav-bar">
      <router-link to="/pageOne">Page One</router-link>
      <router-link to="/pageTwo">Page Two</router-link>
      <router-link to="/pageThree">Page Three</router-link>
    </nav>
  </header>
</template>

<style scoped>
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid gray;
  padding: 10px;
}

.nav-bar {
  display: flex;
  gap: 20px;
}

.router-link-active {
  color: red;
}
</style>
