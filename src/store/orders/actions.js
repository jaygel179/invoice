import {
  CREATE_ORDER,
  DELETE_ORDER,
} from '@/definition'

export default {
  createOrder ({ commit }, order) {
    commit(CREATE_ORDER, order)
  },
  deleteOrder ({ commit }, id) {
    commit(DELETE_ORDER, id)
  },
}
