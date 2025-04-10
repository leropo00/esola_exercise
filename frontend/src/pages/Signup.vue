<script setup>
import { ref } from 'vue'
import axiosClient from '../axios.js'
import router from '../router.js'
import { URL_REGISTER, URL_CSRF_COOKIE } from '../constants.js'
import GuestLayout from '@/components/layout/GuestLayout.vue'
import {useI18n} from 'vue-i18n' 
const {t} = useI18n();

const data = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const errors = ref({
  name: [],
  email: [],
  password: [],
})

function register() {
  axiosClient.get(URL_CSRF_COOKIE).then((response) => {
    axiosClient
      .post(URL_REGISTER, data.value)
      .then((response) => {
        router.push({ name: 'Home' })
      })
      .catch((error) => {
        errors.value = error.response.data.errors
      })
  })
}
</script>

<template>
  <GuestLayout>
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
      {{ t('signup.title' )}}
    </h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label for="name" class="block text-sm/6 font-medium text-gray-900">{{ t('signup.field_fullname') }}
          </label>
          <div class="mt-2">
            <input
              name="name"
              id="name"
              v-model="data.name"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <p class="text-sm mt-1 text-red-600">
            {{ errors.name ? errors.name[0] : '' }}
          </p>
        </div>
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">{{ t('signup.field_email') }}
          </label>
          <div class="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="data.email"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <p class="text-sm mt-1 text-red-600">
            {{ errors.email ? errors.email[0] : '' }}
          </p>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">{{ t('signup.field_password') }}
            </label>
          </div>
          <div class="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              v-model="data.password"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <p class="text-sm mt-1 text-red-600">
            {{ errors.password ? errors.password[0] : '' }}
          </p>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="passwordConfirmation" class="block text-sm/6 font-medium text-gray-900"
              >{{ t('signup.field_repeat_password') }}
              </label
            >
          </div>
          <div class="mt-2">
            <input
              type="password"
              name="password"
              id="passwordConfirmation"
              v-model="data.password_confirmation"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center cursor-pointer rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          {{ t('signup.create_account') }}
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        {{ t('signup.existing_account') }}
        {{ ' ' }}
        <RouterLink
          :to="{ name: 'Login' }"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          {{ t('signup.login_from_here') }}
        </RouterLink>
      </p>
    </div>
  </GuestLayout>
</template>

<style scoped></style>
