import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
} from '@/definition'

let lastId = 3

export default {
  [ADD_PRODUCT] (state, product) {
    lastId += 1
    state.products.push({
      ...product,
      id: lastId,
      user: state.users[0].id,
    })
  },
  [DELETE_PRODUCT] (state, id) {
    const productIds = state.products.map(product => product.id)
    const index = productIds.indexOf(id)

    state.products.splice(index, 1)
  },
}
