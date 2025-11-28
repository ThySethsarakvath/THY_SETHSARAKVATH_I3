<script>
import { useProductStore } from '../Stores/product'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import PageHeaderComponent from '../components/PageHeaderComponent.vue'

export default {
  name: 'ProductView',
  components: {
    PageHeaderComponent,
  },
  setup() {
    const route = useRoute()
    // const router = useRouter()
    const productStore = useProductStore()

    const quantity = ref(1)
    const selectedImage = ref(0)
    const activeTab = ref('description')

    // Get productId from route params
    const productId = computed(() => route.params.productId)

    // Find product details
    const product = computed(() => {
      return productStore.transformedProducts.find(
        p => p.id === parseInt(productId.value)
      )
    })

    // Mock product images (main + thumbnails)
    const productImages = computed(() => {
      if (!product.value) return []
      return [
        product.value.image,
        product.value.image,
        product.value.image,
        product.value.image,
      ]
    })

    const increaseQuantity = () => {
      quantity.value++
    }

    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--
      }
    }

    const addToCart = () => {
      console.log(`Adding ${quantity.value} of product ${productId.value} to cart`)
      productStore.addToCart(productId.value)
    }

    const selectImage = (index) => {
      selectedImage.value = index
    }

    const addToWishlist = () => {
      console.log('Added to wishlist')
    }

    const addToCompare = () => {
      console.log('Added to compare')
    }

    const setActiveTab = (tab) => {
      activeTab.value = tab
    }

    return {
      productStore,
      product,
      quantity,
      selectedImage,
      productImages,
      activeTab,
      increaseQuantity,
      decreaseQuantity,
      addToCart,
      selectImage,
      addToWishlist,
      addToCompare,
      setActiveTab,
    }
  },
  async mounted() {
    // Fetch products if not already loaded
    if (this.productStore.products.length === 0) {
      await this.productStore.fetchProducts()
    }
  },
}
</script>

<template>
  <div class="product-view">
    <div v-if="product">
      <!-- Page Header -->
      <PageHeaderComponent :title="product.name" :parent-category="product.category" />

      <!-- Product Detail Container -->
      <div class="product-detail-container">
        <!-- Main Product Section -->
        <div class="product-main">
          <!-- Left: Product Images -->
          <div class="product-images">
            <div class="main-image">
              <div v-if="product.badge" :class="['badge', product.badgeType]">
                {{ product.badge }}
              </div>
              <img :src="'http://localhost:3000/' + productImages[selectedImage]" :alt="product.name" />
              <button class="zoom-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
            </div>
            <div class="thumbnail-images">
              <div v-for="(img, index) in productImages" :key="index"
                :class="['thumbnail', { active: selectedImage === index }]" @click="selectImage(index)">
                <img :src="'http://localhost:3000/' + img" :alt="`${product.name} ${index + 1}`" />
              </div>
            </div>
          </div>

          <!-- Right: Product Info -->
          <div class="product-info">
            <span class="stock-badge in-stock">In Stock</span>
            <h1 class="product-title">{{ product.name }}</h1>

            <!-- Rating -->
            <div class="rating-section">
              <div class="stars">
                <span v-for="star in 5" :key="star" :class="['star', { filled: star <= Math.round(product.rating) }]">
                  ★
                </span>
              </div>
              <span class="rating-text">({{ product.ratingCount }} reviews)</span>
            </div>

            <!-- Price -->
            <div class="price-section">
              <span class="current-price">${{ product.price.toFixed(2) }}</span>
              <span v-if="product.originalPrice > product.price" class="original-price">
                ${{ product.originalPrice.toFixed(2) }}
              </span>
            </div>

            <!-- Description -->
            <p class="product-description">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia,
              corrupti reiciendis minima nisi modi, quasi, odio minus dolore impedit fuga eum
              eligendi? Officia doloremque facere quia. Voluptatum, accusantium!
            </p>

            <!-- Size/Weight -->
            <div class="product-meta">
              <span class="meta-label">Size / Weight:</span>
              <div class="size-options">
                <button class="size-btn">{{ product.weight }}</button>
              </div>
            </div>

            <!-- Quantity and Add to Cart -->
            <div class="cart-section">
              <div class="quantity-controls">
                <button class="qty-btn" @click="decreaseQuantity">-</button>
                <input type="number" v-model.number="quantity" min="1" class="qty-input" />
                <button class="qty-btn" @click="increaseQuantity">+</button>
              </div>
              <button class="add-to-cart-btn" @click="addToCart">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Add To Cart
              </button>
              <button class="icon-btn" @click="addToWishlist">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                  </path>
                </svg>
              </button>
              <button class="icon-btn" @click="addToCompare">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 20V10"></path>
                  <path d="M12 20V4"></path>
                  <path d="M6 20v-6"></path>
                </svg>
              </button>
            </div>

            <!-- Product Details -->
            <div class="product-details">
              <div class="detail-row">
                <span class="detail-label">Vendor:</span>
                <span class="detail-value">NestFood</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">SKU:</span>
                <span class="detail-value">FWM{{ product.id }}957</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs Section -->
        <div class="product-tabs">
          <div class="tabs-header">
            <button :class="['tab', { active: activeTab === 'description' }]" @click="setActiveTab('description')">
              Description
            </button>
            <button :class="['tab', { active: activeTab === 'additional' }]" @click="setActiveTab('additional')">
              Additional info
            </button>
            <button :class="['tab', { active: activeTab === 'reviews' }]" @click="setActiveTab('reviews')">
              Reviews ({{ product.ratingCount }})
            </button>
          </div>

          <div class="tabs-content">
            <!-- Description Tab -->
            <div v-if="activeTab === 'description'" class="tab-panel">
              <p>
                Uninhibited carnally hired played in whimpered dear gorilla koala depending and much yikes off far
                quetzal goodness and from for grimaced goodness unaccountably and meadowlark near unblushingly crucial
                scallop tightly neurotic hungrily some and dear furiously this apart.
              </p>
              <p>
                Spluttered narrowly yikes left moth in yikes bowed this that grizzly much hello on spoon-fed that alas
                rethought much decently richly and wow against the frequent fluidly at formidable acceptably flapped
                besides and much circa far over the bucolically hey precarious goldfinch mastodon goodness gnashed a
                jellyfish and one however because.
              </p>
            </div>

            <!-- Additional Info Tab -->
            <div v-if="activeTab === 'additional'" class="tab-panel">
              <table class="info-table">
                <tr>
                  <td class="info-label">Weight</td>
                  <td class="info-value">{{ product.weight }}</td>
                </tr>
                <tr>
                  <td class="info-label">Color</td>
                  <td class="info-value">Green, Yellow, Orange</td>
                </tr>
                <tr>
                  <td class="info-label">Category</td>
                  <td class="info-value">{{ product.category }}</td>
                </tr>
                <tr>
                  <td class="info-label">Stock Status</td>
                  <td class="info-value">{{ product.inStock ? 'In Stock' : 'Out of Stock' }}</td>
                </tr>
              </table>
            </div>

            <!-- Reviews Tab -->
            <div v-if="activeTab === 'reviews'" class="tab-panel">
              <p>Customer reviews will be displayed here.</p>
              <p>Average rating: {{ product.rating }} / 5 based on {{ product.ratingCount }} reviews.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else class="not-found">
      <h2>Product Not Found</h2>
      <p>The product you're looking for doesn't exist.</p>
      <RouterLink to="/" class="home-link">Go to Home</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.product-view {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.product-detail-container {
  max-width: 1750px;
  margin: 0 auto;
  padding: 0 20px 60px;
}

/* Main Product Section */
.product-main {
  background: #fff;
  border-radius: 15px;
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 30px;
}

/* Product Images */
.product-images {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-image {
  position: relative;
  width: 100%;
  height: 500px;
  background: #f8f9fa;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid #ececec;
}

.main-image img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.badge {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 6px 16px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  z-index: 1;
}

.badge.discount {
  background-color: #3bb77e;
}

.badge.hot {
  background-color: #f74b81;
}

.badge.sale {
  background-color: #fdc040;
  color: #253d4e;
}

.zoom-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.zoom-btn:hover {
  background: #3bb77e;
  color: #fff;
  border-color: #3bb77e;
}

.thumbnail-images {
  display: flex;
  gap: 15px;
}

.thumbnail {
  width: 100px;
  height: 100px;
  border: 2px solid #ececec;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnail:hover,
.thumbnail.active {
  border-color: #3bb77e;
}

.thumbnail img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stock-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 600;
  width: fit-content;
}

.stock-badge.in-stock {
  background: #d4edda;
  color: #155724;
}

.product-title {
  font-size: 32px;
  font-weight: 700;
  color: #253d4e;
  line-height: 1.3;
  margin: 0;
}

/* Rating */
.rating-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stars {
  display: flex;
  gap: 4px;
}

.star {
  color: #e0e0e0;
  font-size: 18px;
}

.star.filled {
  color: #ffc107;
}

.rating-text {
  font-size: 14px;
  color: #7e7e7e;
}

/* Price */
.price-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.current-price {
  font-size: 42px;
  font-weight: 700;
  color: #3bb77e;
}

.original-price {
  font-size: 28px;
  color: #adadad;
  text-decoration: line-through;
}

/* Description */
.product-description {
  font-size: 15px;
  line-height: 1.8;
  color: #7e7e7e;
}

/* Meta */
.product-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.meta-label {
  font-size: 15px;
  font-weight: 600;
  color: #253d4e;
}

.size-options {
  display: flex;
  gap: 10px;
}

.size-btn {
  padding: 8px 16px;
  border: 2px solid #ececec;
  background: #fff;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  color: #253d4e;
  cursor: pointer;
  transition: all 0.3s ease;
}

.size-btn:hover,
.size-btn.active {
  border-color: #3bb77e;
  color: #3bb77e;
}

/* Cart Section */
.cart-section {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid #ececec;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 2px solid #ececec;
  border-radius: 5px;
  overflow: hidden;
}

.qty-btn {
  width: 45px;
  height: 45px;
  border: none;
  background: #fff;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #253d4e;
}

.qty-btn:hover {
  background: #3bb77e;
  color: #fff;
}

.qty-input {
  width: 60px;
  height: 45px;
  border: none;
  border-left: 2px solid #ececec;
  border-right: 2px solid #ececec;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  outline: none;
}

.add-to-cart-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #3bb77e;
  color: #fff;
  border: none;
  padding: 14px 30px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  background: #2d9a68;
  transform: translateY(-2px);
}

.icon-btn {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ececec;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #253d4e;
}

.icon-btn:hover {
  border-color: #3bb77e;
  color: #3bb77e;
}

/* Product Details */
.product-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #ececec;
}

.detail-row {
  display: flex;
  gap: 10px;
  font-size: 14px;
}

.detail-label {
  color: #7e7e7e;
  min-width: 80px;
}

.detail-value {
  color: #253d4e;
  font-weight: 600;
}

/* Tabs Section */
.product-tabs {
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  border-bottom: 2px solid #ececec;
}

.tab {
  flex: 1;
  padding: 20px;
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: #7e7e7e;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.tab:hover {
  color: #3bb77e;
}

.tab.active {
  color: #3bb77e;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #3bb77e;
}

.tabs-content {
  padding: 40px;
}

.tab-panel {
  animation: fadeIn 0.3s ease;
}

.tab-panel p {
  font-size: 15px;
  line-height: 1.8;
  color: #7e7e7e;
  margin-bottom: 15px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* Info Table */
.info-table {
  width: 100%;
  border-collapse: collapse;
}

.info-table tr {
  border-bottom: 1px solid #ececec;
}

.info-table td {
  padding: 15px 0;
  font-size: 15px;
}

.info-label {
  color: #7e7e7e;
  width: 200px;
}

.info-value {
  color: #253d4e;
  font-weight: 600;
}

/* Not Found */
.not-found {
  max-width: 600px;
  margin: 100px auto;
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 15px;
}

.not-found h2 {
  font-size: 32px;
  color: #253d4e;
  margin-bottom: 15px;
}

.not-found p {
  font-size: 18px;
  color: #7e7e7e;
  margin-bottom: 30px;
}

.home-link {
  display: inline-block;
  background-color: #3bb77e;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.home-link:hover {
  background-color: #2d9a68;
}

/* Responsive */
@media (max-width: 968px) {
  .product-main {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 30px;
  }

  .main-image {
    height: 400px;
  }

  .product-title {
    font-size: 24px;
  }

  .current-price {
    font-size: 32px;
  }
}

@media (max-width: 768px) {
  .product-detail-container {
    padding: 0 10px 40px;
  }

  .product-main {
    padding: 20px;
  }

  .main-image {
    height: 300px;
  }

  .thumbnail-images {
    flex-wrap: wrap;
  }

  .thumbnail {
    width: 80px;
    height: 80px;
  }

  .cart-section {
    flex-wrap: wrap;
  }

  .add-to-cart-btn {
    width: 100%;
    order: -1;
  }

  .tabs-header {
    flex-direction: column;
  }

  .tab {
    text-align: left;
    border-bottom: 1px solid #ececec;
  }

  .tabs-content {
    padding: 20px;
  }
}
</style>
