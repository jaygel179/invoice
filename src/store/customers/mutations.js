import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
} from '@/definition'

let lastId = 3

export default {
  [ADD_CUSTOMER] (state, customer) {
    lastId += 1
    state.customers.push({
      ...customer,
      id: lastId,
      user: state.users[0].id,
    })
  },
  [DELETE_CUSTOMER] (state, id) {
    const customerIds = state.customers.map(customer => customer.id)
    const index = customerIds.indexOf(id)

    state.customers.splice(index, 1)
  },
}
