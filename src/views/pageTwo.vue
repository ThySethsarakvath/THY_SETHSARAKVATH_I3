<template>
  <div class="page-container">
    <span class="title">Welcome to page 2!</span>
    <hr style="border:2px solid gray; width: 100%" />
    <router-view />
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.title {
  display: block;
  font-size: 48px;
}
</style>
