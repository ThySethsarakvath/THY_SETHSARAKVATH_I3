<template>
  <div class="section">
    This is section {{ sectionId }}
  </div>
</template>

<script>
export default {
  name: 'SectionComponent',
  computed: {
    sectionId() {
      return this.$route.params.sectionId
    }
  }
}
</script>

<style scoped>
.section {
  text-align: center;
  font-size: 32px;
}
</style>
