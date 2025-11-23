import axios from 'axios'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    categories: [],
    groups: [],
    promotions: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const [categoriesResponse, promotionsResponse, groupsResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/categories'),
          axios.get('http://localhost:3000/api/promotions'),
          axios.get('http://localhost:3000/api/groups'),
        ])

        this.categories = categoriesResponse.data
        this.promotions = promotionsResponse.data
        this.groups = groupsResponse.data
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
  },
})
