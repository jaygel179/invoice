import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
} from '@/definition'

export default {
  addCustomer ({ commit }, customer) {
    commit(ADD_CUSTOMER, customer)
  },
  deleteCustomer ({ commit }, id) {
    commit(DELETE_CUSTOMER, id)
  },
}
