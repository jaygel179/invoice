export default {
  getProducts: state => state.products.filter(product => product.user === state.users[0].id).reverse(),
}
