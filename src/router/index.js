import { createRouter, createWebHistory } from 'vue-router'
import pageOne from '../views/pageOne.vue'
import pageTwo from '../views/pageTwo.vue'
import pageThree from '../views/pageThree.vue'
// import sectionOne from '../views/sectionOne.vue'
// import sectionTwo from '../views/sectionTwo.vue'
// import sectionThree from '../views/sectionThree.vue'
// import sectionFour from '../views/sectionFour.vue'
import sectionComponent from '@/components/sectionComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Home',
      path: '/',
      redirect: 'pageOne',
    },
    {
      name: 'PageOne',
      path: '/pageOne',
      component: pageOne,
      children: [
        {
          name: 'PageOne_Section',
          path: 'sections/:sectionId',
          component: sectionComponent,
        },
      ],
    },
    {
      name: 'PageTwo',
      path: '/pageTwo',
      component: pageTwo,
      children: [
        {
          name: 'PageTwo_Section',
          path: 'sections/:sectionId',
          component: sectionComponent,
        },
      ],
    },
    {
      name: 'PageThree',
      path: '/pageThree',
      component: pageThree,
      children: [
        {
          name: 'PageThree_Section',
          path: 'sections/:sectionId',
          component: sectionComponent,
        },
      ],
    },
  ],
})
export default router
