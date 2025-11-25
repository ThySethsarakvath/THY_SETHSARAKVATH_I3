<script>
import ProductComponent from '../components/ProductComponent.vue'
import SectionHeaderComponent from '../components/SectionHeaderComponent.vue'
import { useProductStore } from '../Stores/product'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'CategoryView',
  components: {
    ProductComponent,
    SectionHeaderComponent,
  },
  setup() {
    const route = useRoute()
    const productStore = useProductStore()

    // Get categoryId from route params
    const categoryId = computed(() => route.params.categoryId)

    // Find category details
    const category = computed(() => {
      return productStore.categories.find(cat => cat.id === parseInt(categoryId.value))
    })

    // Filter products by this category
    const categoryProducts = computed(() => {
      return productStore.transformedProducts.filter(
        product => product.categoryId === parseInt(categoryId.value)
      )
    })

    return {
      productStore,
      categoryId,
      category,
      categoryProducts,
    }
  },
  async mounted() {
    // Fetch products if not already loaded
    if (this.productStore.products.length === 0) {
      await this.productStore.fetchProducts()
    }
  },
  methods: {
    handleAddToCart(productId) {
      this.productStore.addToCart(productId)
    },
    goBack() {
      this.$router.push('/')
    },
  },
}
</script>

<template>
  <div class="category-view">
    <!-- Breadcrumb / Header -->
    <div class="category-header">
      <button class="back-btn" @click="goBack">
        ← Back to Home
      </button>
      <h1 class="category-title">
        {{ category ? category.name : 'Category' }}
      </h1>
      <p class="category-count">
        {{ categoryProducts.length }} products available
      </p>
    </div>

    <!-- Products Grid -->
    <div class="products-section">
      <div v-if="categoryProducts.length > 0" class="products-grid">
        <ProductComponent v-for="product in categoryProducts" :key="product.id" :id="product.id" :name="product.name"
          :category="product.category" :price="product.price" :original-price="product.originalPrice"
          :rating="product.rating" :rating-count="product.ratingCount" :weight="product.weight"
          :image="'http://localhost:3000/' + product.image" :badge="product.badge" :badge-type="product.badgeType"
          @add-to-cart="handleAddToCart" />
      </div>
      <div v-else class="empty-state">
        <p>No products found in this category.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-view {
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #f8f9fa;
}

.category-header {
  max-width: 1200px;
  margin: 0 auto 40px;
  text-align: center;
}

.back-btn {
  background-color: #fff;
  border: 1px solid #ececec;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #253d4e;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.back-btn:hover {
  background-color: #3bb77e;
  color: #fff;
  border-color: #3bb77e;
}

.category-title {
  font-size: 36px;
  font-weight: 700;
  color: #253d4e;
  margin-bottom: 10px;
}

.category-count {
  font-size: 16px;
  color: #7e7e7e;
}

.products-section {
  max-width: 1200px;
  margin: 0 auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(298px, 1fr));
  gap: 20px;
  justify-items: center;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #7e7e7e;
  font-size: 18px;
}

@media (max-width: 768px) {
  .category-view {
    padding: 20px 10px;
  }

  .category-title {
    font-size: 28px;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
  }
}
</style>
