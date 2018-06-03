import Vue from 'vue'
import Vuex from 'vuex'

import customersState from './customers/state'
import ordersState from './orders/state'
import paymentsState from './payments/state'
import productsState from './products/state'
import usersState from './users/state'

import customersGetters from './customers/getters'
import ordersGetters from './orders/getters'
import paymentsGetters from './payments/getters'
import productsGetters from './products/getters'
import usersGetters from './users/getters'

import customersActions from './customers/actions'
import ordersActions from './orders/actions'
import productsActions from './products/actions'

import customersMutations from './customers/mutations'
import ordersMutations from './orders/mutations'
import productsMutations from './products/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...customersState,
    ...ordersState,
    ...paymentsState,
    ...productsState,
    ...usersState,
  },
  getters: {
    ...customersGetters,
    ...ordersGetters,
    ...paymentsGetters,
    ...productsGetters,
    ...usersGetters,
  },
  actions: {
    ...customersActions,
    ...ordersActions,
    ...productsActions,
  },
  mutations: {
    ...customersMutations,
    ...ordersMutations,
    ...productsMutations,
  },
})
