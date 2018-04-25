<template>
  <div>
    <h2>You Shopping Cart</h2>
      <button class="btn btn-success"
        @click="checkout()">
        Checkout
      </button>
  </div>
</template>

<script>

export default {
  name: 'Cart',
  components: {
  },
  methods: {
    checkout () {
      window.alert('Order created!')
    }
  }
}
</script>
