export default {
  getCustomers: state => state.customers.filter(customer => customer.user === state.users[0].id).reverse(),
}
