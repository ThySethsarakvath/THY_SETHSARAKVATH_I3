<script>
import CategoryComponent from './components/CategoryComponent.vue'
import BannerComponent from './components/BannerComponent.vue'

const burgerImage = new URL('@/assets/burger.png', import.meta.url).href
const peachImage = new URL('@/assets/peach.png', import.meta.url).href
const kiwiImage = new URL('@/assets/kiwi.png', import.meta.url).href
const appleImage = new URL('@/assets/apple.png', import.meta.url).href
const snackImage = new URL('@/assets/snack.png', import.meta.url).href
const berryImage = new URL('@/assets/berry.png', import.meta.url).href
const cabbageImage = new URL('@/assets/cabbage.png', import.meta.url).href
const headphoneImage = new URL('@/assets/headphone.png', import.meta.url).href
const cocoImage = new URL('@/assets/Coco.png', import.meta.url).href
const orangeImage = new URL('@/assets/orange.png', import.meta.url).href

const onionImage = new URL('@/assets/onion.png', import.meta.url).href
const milkImage = new URL('@/assets/milk.png', import.meta.url).href
const veggieImage = new URL('@/assets/Veggies.png', import.meta.url).href
export default {
  name: 'App',
  data() {
    return {
      burgerImage,
      peachImage,
      kiwiImage,
      appleImage,
      snackImage,
      berryImage,
      cabbageImage,
      headphoneImage,
      cocoImage,
      orangeImage,
      onionImage,
      milkImage,
      veggieImage,
    }
  },
  components: {
    CategoryComponent,
    BannerComponent,
  },
}
</script>

<template>
  <div class="app">
    <div class="category-wrapper">
      <CategoryComponent title="Burger & Cake" :product-count="14" :image="burgerImage" background-color="#F2FCE4" />
      <CategoryComponent title="Peach" :product-count="17" :image="peachImage" background-color="#FFFCEB" />
      <CategoryComponent title="Organic Kiwi" :product-count="21" :image="kiwiImage" background-color="#ECFFEC" />
      <CategoryComponent title="Apple" :product-count="68" :image="appleImage" background-color="#FEEFEA" />
      <CategoryComponent title="Snack" :product-count="34" :image="snackImage" background-color="#FFF3EB" />
      <CategoryComponent title="Black plum" :product-count="25" :image="berryImage" background-color="#FFF3FF" />
      <CategoryComponent title="Cabbage" :product-count="65" :image="cabbageImage" background-color="#F2FCE4" />
      <CategoryComponent title="Headphone" :product-count="33" :image="headphoneImage" background-color="#FFFCEB" />
      <CategoryComponent title="Coco" :product-count="54" :image="cocoImage" background-color="#F2FCE4" />
      <CategoryComponent title="Orange" :product-count="63" :image="orangeImage" background-color="#FFF3FF" />
    </div>

    <div class="banner-wrapper">
      <BannerComponent title="Everyday Fresh & Clean with Our Products" button-text="Shop Now →" :image="onionImage"
        background-color="#fef6e4" />
      <BannerComponent title="Make your Breakfast Easy & Healthy" button-text="Shop Now →" :image="milkImage"
        background-color="#F3E8E8" />
      <BannerComponent title="The Best Organic Products Online" button-text="Shop Now →" :image="veggieImage"
        background-color="#E7EAF3" />
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
</style>