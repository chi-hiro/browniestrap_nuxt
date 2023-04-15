<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { PlaceOrderRequest } from '@/openapi'

const { $api } = useNuxtApp()

const getTest = () => {
  $api.StoreApi.getInventory()
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
}

const postTest = () => {
  const params: PlaceOrderRequest = {
    order: {
      id: 0,
      petId: 0,
      quantity: 0,
      shipDate: new Date(),
      status: 'placed',
      complete: false,
    },
  }

  $api.StoreApi.placeOrder(params)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
}

const loginTest = () => {
  const params = {
    username: 'user',
    password: 'password',
  }

  $api.UserApi.loginUser(params)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div class="m-6 p-3 bg-muted rounded">
    <section>
      <h2 class="section-heading">OpenApi test</h2>

      <div class="flex gap-0.5">
        <Button model="bg" color="primary" @click="getTest" title="GET" />
        <Button model="bg" color="primary" @click="postTest" title="POST" />
        <Button model="bg" color="primary" @click="loginTest" title="LOGIN" />
      </div>
    </section>
  </div>
</template>
