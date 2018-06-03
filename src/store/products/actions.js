import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
} from '@/definition'

export default {
  addProduct ({ commit }, product) {
    commit(ADD_PRODUCT, product)
  },
  deleteProduct ({ commit }, id) {
    commit(DELETE_PRODUCT, id)
  },
}
