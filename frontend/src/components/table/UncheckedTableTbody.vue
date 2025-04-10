<template>
  <tbody class="bg-white">
    <tr v-for="item in itemsList" :key="item.id">
      <template v-if="item.id == itemUpdatedData.item_id">
        <td colspan="2" class="py-4 px-6 border-b border-gray-200 table-cell sm:hidden">
          <input
            type="text"
            class="border-black outline w-full"
            :placeholder="t('placeholder.item_name')"
            v-model="itemUpdatedData.item_name"
            @keyup.enter="updateItemData(item.id)"
          />

          <input
            type="number"
            min="1"
            class="border-black outline w-12 md:w-32 mt-2"
            v-model="itemUpdatedData.quantity"
            @keyup.enter="updateItemData(item.id)"
          />
        </td>
        <td class="py-4 px-6 border-b border-gray-200 hidden sm:table-cell">
          <input
            type="text"
            class="border-black outline w-full"
            :placeholder="t('placeholder.item_name')"
            v-model="itemUpdatedData.item_name"
            @keyup.enter="updateItemData(item.id)"
          />
        </td>
        <td class="py-4 px-6 border-b border-gray-200 hidden sm:table-cell">
          <input
            type="number"
            min="1"
            class="border-black outline w-12 md:w-32"
            id="updated_item_quantity"
            v-model="itemUpdatedData.quantity"
            @keyup.enter="updateItemData(item.id)"
          />
        </td>
        <td class="py-4 px-6 border-b border-gray-200">
          <button
            type="button"
            class="cursor-pointer md:mr-3 lg:mr-6"
            :title="t('tooltip.update_data' )"
            @click="updateItemData(item.id)"
          >
            <CheckCircleIcon class="block size-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="cursor-pointer"
            @click="cancelUpdate()"
            :title="t('tooltip.cancel_update')"
            >
            <XCircleIcon class="block size-6" aria-hidden="true" />
          </button>
        </td>
      </template>

      <template v-else>
        <td colspan="2" class="py-4 px-6 border-b border-gray-200 table-cell sm:hidden">
          {{ formatItem(item) }}
        </td>
        <td class="py-4 px-6 border-b border-gray-200 hidden sm:table-cell">
          {{ item.item_name }}
        </td>
        <td class="py-4 px-6 border-b border-gray-200 hidden sm:table-cell">{{ item.quantity }}</td>
        <td class="py-4 px-6 border-b border-gray-200">
          <button
            type="button"
            class="cursor-pointer md:mr-3 lg:mr-6"
            :title="t('tooltip.edit_data' )"
            @click="prepareItemForEdit(item)"
          >
            <PencilSquareIcon class="block size-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="cursor-pointer"
            :title="t('tooltip.delete_item' )"
            @click="deleteItem(item.id)"
          >
            <TrashIcon class="block size-6" aria-hidden="true" />
          </button>
        </td>
      </template>
    </tr>
  </tbody>
</template>

<script setup>
import { computed, ref } from 'vue'
import usePurchaseListStore from '@/store/purchaseList'
import axiosClient from '@/axios.js'
import {
  URL_UPDATE_PURCHASE_ITEM,
  URL_DELETE_PURCHASE_ITEM,
  HTTP_CODE_SUCCESS,
  HTTP_CODE_NO_CONTENT,
  ITEM_STATUS_UNCHECKED,
} from '@/constants.js'
import { PencilSquareIcon, TrashIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid'
import { useNotification } from "@kyvg/vue3-notification";
import { formatErrorResponse } from '@/helpers.js'
import {useI18n} from 'vue-i18n' 
const {t} = useI18n();
const { notify }  = useNotification()

const listStore = usePurchaseListStore()
const itemsList = computed(() =>
  listStore.data.filter((item) => item.status == ITEM_STATUS_UNCHECKED),
)

const itemUpdatedData = ref({
  item_id: null,
  item_name: '',
  quantity: 1,
})

function prepareItemForEdit(item) {
  itemUpdatedData.value.item_id = item.id
  itemUpdatedData.value.item_name = item.item_name
  itemUpdatedData.value.quantity = item.quantity
}

function updateItemData() {
  if (itemUpdatedData.value.item_name.trim().length == 0) {
    notify({
      title: t("errors.title"),
      text: t("errors.missing_item_name"),
      type: 'error',
    });
    return;
  }

  axiosClient
    .put(URL_UPDATE_PURCHASE_ITEM + itemUpdatedData.value.item_id, itemUpdatedData.value)
    .then(async (response) => {
      if (response.status === HTTP_CODE_SUCCESS) {
        cancelUpdate()
        await listStore.fetchList()
      }
    })
    .catch((error) => {
      notify({
        title: t("errors.title"),
        text: t(formatErrorResponse(error)),
        type: 'error',
      });
    })
}

function cancelUpdate() {
  itemUpdatedData.value.item_id = null
  itemUpdatedData.value.item_name = ''
  itemUpdatedData.value.quantity = 1
}

function deleteItem(itemId) {
  axiosClient.delete(URL_DELETE_PURCHASE_ITEM + itemId).then((response) => {
    if (response.status === HTTP_CODE_NO_CONTENT) {
      listStore.removeItem(itemId)
    }
  }).catch((error) => {
    notify({
        title: t("errors.title"),
        text: t(formatErrorResponse(error)),
        type: 'error',
      });
  })
}

function formatItem(item) {
  if (item.quantity == 1) {
    return item.item_name
  }
  return `${item.quantity} x ${item.item_name}`
}
</script>

<style scoped></style>
