<template>
  <div>
    <h1 class="text-center">Customers</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Address</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input class="form-control" type="text" name="firstName" v-model="customer.firstName" /></td>
          <td><input class="form-control" type="text" name="lastName" v-model="customer.lastName" /></td>
          <td><input class="form-control" type="text" name="contactNumber" v-model="customer.contactNumber" /></td>
          <td><input class="form-control" type="text" name="address" v-model="customer.address" /></td>
          <td><i class="fas fa-plus-circle" @click="addCustomer($event, customer)"></i></td>
        </tr>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.firstName }}</td>
          <td>{{ customer.lastName }}</td>
          <td>{{ customer.contactNumber }}</td>
          <td>{{ customer.address }}</td>
          <td>
            <div class="actions text-center">
              <!-- <i class="fas fa-pencil-alt" alt="Edit"></i> -->
              <i class="fas fa-trash-alt" alt="Delete" @click="deleteCustomer($event, customer.id)"></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const createEmptyCustomer = () => ({
  firstName: '',
  lastName: '',
  contactNumber: '',
  address: '',
})

export default {
  data () {
    return {
      customer: createEmptyCustomer(),
    }
  },
  computed: {
    ...mapGetters({
      customers: 'getCustomers',
    }),
  },
  methods: {
    addCustomer (event, customer) {
      event.preventDefault()
      this.$store.dispatch('addCustomer', { ...customer, id: this.customers.length + 1 })
      this.clearCustomer()
    },
    deleteCustomer (event, id) {
      event.preventDefault()
      this.$store.dispatch('deleteCustomer', id)
    },
    clearCustomer () {
      this.customer = createEmptyCustomer()
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
