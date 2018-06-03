import {
  CREATE_ORDER,
  DELETE_ORDER,
} from '@/definition'

let lastId = 3

export default {
  [CREATE_ORDER] (state, order) {
    lastId += 1
    state.orders.push({
      ...order,
      id: lastId,
      date: 'June 3, 2018',
    })
  },
  [DELETE_ORDER] (state, id) {
    const orderIds = state.orders.map(order => order.id)
    const index = orderIds.indexOf(id)

    state.orders.splice(index, 1)
  },
}
