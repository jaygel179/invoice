<template>
  <div>
    <h1 class="text-center">Payments</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Customer</th>
          <th scope="col">Item</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in payments" :key="payment.id">
          <td>{{ payment.date }}</td>
          <td>{{ getCustomerName(payment) }}</td>
          <td>{{ getItemByAttribute(payment, 'name') }}</td>
          <td>P{{ getItemByAttribute(payment, 'price') }}</td>
          <td>{{ getOrder(payment).quantity }}</td>
          <td>P{{ getOrder(payment).quantity * getItemByAttribute(payment, 'price') }}</td>
          <td>P{{ payment.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      getOrder: (payment) => {
        const orders = this.orders

        const paymentOrder = orders.find(order => order.id === payment.order)
        return paymentOrder
      },
      getItemByAttribute: (payment, attr) => {
        const products = this.products
        const order = this.getOrder(payment)

        const productObject = products.find(product => product.id === order.item)
        return productObject ? productObject[attr] : ''
      },
      getCustomerName: (payment) => {
        const customers = this.customers
        const order = this.getOrder(payment)

        const customerObject = customers.find(customer => customer.id === order.customer)
        return customerObject ? `${customerObject.firstName} ${customerObject.lastName}` : ''
      },
    }
  },
  computed: {
    ...mapGetters({
      payments: 'getPayments',
      orders: 'getOrders',
      products: 'getProducts',
      customers: 'getCustomers',
    }),
  },
}
</script>

<style scoped>

</style>
