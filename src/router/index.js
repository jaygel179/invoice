import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import orders from '@/components/orders/index'
import payments from '@/components/payments/index'
import products from '@/components/products/index'
import customers from '@/components/customers/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: main,
    },
    {
      path: '/orders',
      component: orders,
    },
    {
      path: '/payments',
      component: payments,
    },
    {
      path: '/products',
      component: products,
    },
    {
      path: '/customers',
      component: customers,
    },
    {
      path: '*',
      component: main,
    },
  ],
})
