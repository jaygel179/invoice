<template>
  <div>
    <h1 class="text-center">Orders</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Customer</th>
          <th scope="col">Item</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Total</th>
          <th scope="col">Amount Paid</th>
          <th scope="col">Status</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>
            <select class="form-control" v-model="order.customer">
              <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.firstName }} {{ customer.lastName }}</option>
            </select>
          </td>
          <td>
            <select class="form-control" v-model="order.item">
              <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
            </select>
          </td>
          <td><input class="quantity form-control" type="number" name="quantity" v-model="order.quantity" /></td>
          <td>{{ getProductPrice() | money }}</td>
          <td>{{ getProductPrice() * order.quantity | money }}</td>
          <td>{{ 0 | money }}</td>
          <td>
            <select class="form-control" v-model="order.status">
              <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
            </select>
          </td>
          <td class="text-center"><i class="fas fa-plus-circle" @click="createOrder($event, order)"></i></td>
        </tr>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.date }}</td>
          <td>{{ getCustomerName(order) }}</td>
          <td>{{ getItemByAttribute(order, 'name') }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ getItemByAttribute(order, 'price') | money}}</td>
          <td>{{ getItemByAttribute(order, 'price') * order.quantity | money}}</td>
          <td>{{ amountPaid(order) | money }}</td>
          <td><span :class="getStatus(order.status)">{{ order.status }}</span></td>
          <td>
            <div class="actions text-center">
              <!-- <i class="fas fa-pencil-alt" alt="Edit"></i> -->
              <i class="fas fa-trash-alt" alt="Delete" @click="deleteOrder($event, order.id)"></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const PROCESSING = 'PROCESSING'
const DELIVERED = 'DELIVERED'
const PENDING_PAYMENT = 'PENDING_PAYMENT'
const PARTIAL_PAYMENT = 'PARTIAL_PAYMENT'
const PAID = 'PAID'
const CANCELED = 'CANCELED'

const statusMapper = {
  PROCESSING: 'badge badge-pill badge-light',
  DELIVERED: 'badge badge-pill badge-primary',
  PENDING_PAYMENT: 'badge badge-pill badge-warning',
  PARTIAL_PAYMENT: 'badge badge-pill badge-secondary',
  PAID: 'badge badge-pill badge-success',
  CANCELED: 'badge badge-pill badge-dark',
}

const statuses = [PROCESSING, DELIVERED, PENDING_PAYMENT, PARTIAL_PAYMENT, PAID, CANCELED]

const createEmptyOrder = () => ({
  customer: '',
  item: '',
  quantity: 0,
  status: '',
})

export default {
  data () {
    return {
      statuses,
      order: createEmptyOrder(),
      amountPaid: (order) => {
        const payments = this.payments.filter(payment => payment.order === order.id)

        const totalAmountPaid = payments.reduce((prev, cur) => (prev + cur.amount), 0)
        return totalAmountPaid
      },
      isPaid: (order) => {
        const totalAmountPaid = this.amountPaid(order)
        const itemPrice = this.getItemByAttribute(order, 'price')

        return totalAmountPaid >= itemPrice
      },
      getItemByAttribute: (order, attr) => {
        const products = this.products

        const product = products.find(item => item.id === order.item)
        return product ? product[attr] : ''
      },
      getCustomerName: (order) => {
        const customers = this.customers

        const customer = customers.find(item => item.id === order.customer)
        return customer ? `${customer.firstName} ${customer.lastName}` : ''
      },
      getStatus: status => statusMapper[status],
      getProductPrice: () => {
        const itemId = this.order.item
        const itemObject = this.products.find(item => item.id === itemId)

        return itemObject ? itemObject.price : ''
      },
    }
  },
  filters: {
    money (value) {
      const decimal = parseInt(value, 10).toFixed(2)
      return isNaN(decimal) ? '' : `P${decimal}`
    },
  },
  computed: {
    ...mapGetters({
      payments: 'getPayments',
      orders: 'getOrders',
      products: 'getProducts',
      customers: 'getCustomers',
    }),
  },
  methods: {
    createOrder (event, order) {
      event.preventDefault()
      this.$store.dispatch('createOrder', order)
      this.clearOrder()
    },
    deleteOrder (event, id) {
      event.preventDefault()
      this.$store.dispatch('deleteOrder', id)
    },
    clearOrder () {
      this.order = createEmptyOrder()
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
  .quantity {
    width: 65px;
  }
</style>
