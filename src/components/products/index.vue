<template>
  <div>
    <h1 class="text-center">Products</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Sold</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input class="form-control" type="text" name="name" v-model="product.name" /></td>
          <td><input class="form-control" type="text" name="description" v-model="product.description" /></td>
          <td><input class="form-control" type="number" name="quantity" v-model="product.quantity" /></td>
          <td><input class="form-control" type="number" name="price" v-model="product.price" /></td>
          <td><input class="form-control" type="number" name="sold" v-model="product.sold" /></td>
          <td><i class="fas fa-plus-circle" @click="addProduct($event, product)"></i></td>
        </tr>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>P{{ product.price | money}}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.sold }}</td>
          <td>
            <div class="actions text-center">
              <!-- <i class="fas fa-pencil-alt" alt="Edit"></i> -->
              <i class="fas fa-trash-alt" alt="Delete" @click="deleteCustomer($event, product.id)"></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const emptyProduct = () => ({
  name: '',
  description: '',
  quantity: 0,
  price: 0,
  sold: 0,
})

export default {
  data () {
    return {
      product: emptyProduct(),
    }
  },
  filters: {
    money (value) {
      return parseInt(value, 10).toFixed(2)
    },
  },
  computed: {
    ...mapGetters({
      products: 'getProducts',
    }),
  },
  methods: {
    addProduct (event, product) {
      event.preventDefault()
      this.$store.dispatch('addProduct', product)
      this.clearPoduct()
    },
    deleteCustomer (event, id) {
      event.preventDefault()
      this.$store.dispatch('deleteProduct', id)
    },
    clearPoduct () {
      this.product = emptyProduct()
    },
  },
}
</script>

<style scoped>
  .fas {
    cursor: pointer;
    padding: 0 2px;
  }
  .fa-plus-circle {
    margin-top: 10px;
    font-size: 18px;
  }
</style>
