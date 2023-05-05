<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Textfield from '@/components/form/Textfield.vue'
import { toast } from '@/lib/toast'
import { PlaceOrderRequest } from '@/openapi'

const state = reactive<{
  form: {
    id: number | null
    title: string
    category: string
    remarks?: string
  }
}>({
  form: {
    id: null,
    title: '',
    category: '01',
    remarks: '',
  },
})

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

const getMockApi = async () => {
  const { data } = await useFetch(`/api/apiid/1`)
  if (data.value) state.form = data.value
}

const postMockApi = async () => {
  const { data } = await useFetch('/api/apiid/post', { method: 'POST', body: state.form })

  if (data.value === 'success') {
    toast('success', 'セーブが完了しました')
    getMockApi()
  } else if (data.value === 'error') {
    toast('danger', '書き込みに失敗しました')
  }
}

getMockApi()
</script>

<template>
  <section class="section">
    <div class="container">
      <h2 class="section-heading">OpenApi test</h2>

      <div class="flex gap-0.5">
        <Button model="bg" color="primary" @click="getTest" title="GET" />
        <Button model="bg" color="primary" @click="postTest" title="POST" />
        <Button model="bg" color="primary" @click="loginTest" title="LOGIN" />
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-heading">MockApi test</h2>

      <div class="grid gap-1.5 lg:w-1/2">
        <Textfield name="title" label="タイトル" :required="true" v-model="state.form.title" />

        <Textfield
          name="category"
          type="select"
          label="カテゴリ"
          :option="[
            { value: '01', label: 'A定食' },
            { value: '02', label: 'B定食' },
          ]"
          v-model="state.form.category"
        />

        <Textfield name="remarks" type="textarea" label="備考" v-model="state.form.remarks" :maxlength="100" />
      </div>
    </div>
  </section>
</template>
