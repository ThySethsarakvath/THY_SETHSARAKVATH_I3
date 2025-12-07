<script>
import MessageInput from '../components/messageInput.vue'

export default {
  components: {
    MessageInput
  }
}
</script>
<template>
  <div class="page-container">
    <span class="title">Welcome to page 1!</span>
    <hr style="border:2px solid gray; width: 100%" />
    <router-view />
    <MessageInput page-name="Page One" />
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.input {
  margin-top: 50px;
}

.title {
  display: block;
  font-size: 48px;
}

.textfeild {
  width: 300px;
  height: 25px;
  font-size: 20px;
}
</style>
