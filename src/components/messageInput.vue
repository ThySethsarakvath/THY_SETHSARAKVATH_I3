<script>
import { store } from '../store.js'

export default {
  name: 'MessageInput',
  props: {
    pageName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      store
    }
  },
  computed: {
    currentSection() {
      return this.$route.params.sectionId || ''
    }
  },
  methods: {
    updateSource() {
      store.source.page = this.pageName
      store.source.section = this.currentSection ? `Section ${this.currentSection}` : ''
    }
  }
}
</script>

<template>
  <div class="input">
    <label style="font-size:24px" for="message">Message: </label>
    <input class="textfeild" id="message" type="text" v-model="store.message" @input="updateSource">
    <div v-if="store.message" class="message-display">
      Message From {{ store.source.page }}{{ store.source.section ? ` - ${store.source.section}` : '' }} : <strong>{{
        store.message }}</strong>
    </div>
  </div>
</template>

<style scoped>
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

.message-display {
  margin-top: 20px;
  font-size: 20px;
}

.source-info {
  font-size: 16px;
  color: #666;
  margin-top: 5px;
}
</style>
