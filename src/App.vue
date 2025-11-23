<script>
import CategoryComponent from './components/CategoryComponent.vue'
import BannerComponent from './components/BannerComponent.vue'
import { useProductStore } from './Stores/product'

export default {
  name: 'App',
  components: {
    CategoryComponent,
    BannerComponent,
  },
  setup() {
    const productStore = useProductStore()
    return {
      productStore,
    }
  },
  async mounted() {
    await this.productStore.fetchProducts()
  },
}
</script>

<template>
  <div class="app">
    <h2 class="section-title">Featured Categories</h2>

    <div class="group-filter">
      <span class="group-item" v-for="group in productStore.groups" :key="group.id">
        {{ group.name }}
      </span>
    </div>

    <div class="category-wrapper">
      <CategoryComponent v-for="category in productStore.categories" :key="category['id']" :title="category['name']"
        :product-count="category['productCount']" :background-color="category['color']"
        :image="'http://localhost:3000/' + category['image']" />
    </div>

    <div class="banner-wrapper">
      <BannerComponent v-for="promotion in productStore.promotions" :key="promotion['id']" :title="promotion['title']"
        :button-text="promotion['bottonText']" :background-color="promotion['color']"
        :image="'http://localhost:3000/' + promotion['image']" />
    </div>
  </div>
</template>


<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.category-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.banner-wrapper {
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #253D4E;
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
}

.group-filter {
  display: flex;
  gap: 25px;
  margin-bottom: 20px;
}

.group-item {
  font-size: 14px;
  color: #7E7E7E;
  cursor: pointer;
  transition: 0.2s;
}

.group-item:hover {
  color: #3BB77E;
  font-weight: 600;
}
</style>
