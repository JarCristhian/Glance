<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import jicon from '../img/icons/jicon.vue';
import EditNote from './EditNote.vue';
import { supabase } from '../supabase/client';
import { storePinia } from '../store';
import { storeToRefs } from 'pinia';

const modalActivate = ref(false);
const store = storePinia()
const { updateData, textS, darkMode, english, userType } = storeToRefs(store)
const items = reactive({});
const data = ref([])
const userId = store.userId;

const getDataU = async () => {
  if (store.userType) {
    const result = await supabase.from('notes').select().neq('user_id', userId)
    console.log(result);
    data.value = result.data;
  } else {
    const result = await supabase.from('notes').select().eq('user_id', userId)
    data.value = result.data;
  }
  store.setSearch("all")
}

const getDataFilter = async (value) => {
  data.value = []
  if (store.userType) {
    const result = await supabase.from('notes').select().neq('user_id', userId).eq('language_id', value)
    console.log(result);
    data.value = result.data;
  } else {
    const result = await supabase.from('notes').select().eq('user_id', userId).eq('language_id', value)
    data.value = result.data;
  }
}

onMounted(() => {
  setTimeout(async () => {
    await getDataU()
  }, 100)
})

watch(userType, async () => {
  await getDataU()
});

watch(updateData, async () => {
  await getDataU()
  store.setSearch("all")
});

watch(textS, async () => {
  await getDataFilter(textS.value)
});


const editNote = (v) => {
  (items.id = v.id),
    (items.language_id = v.language_id),
    (items.title = v.title),
    (items.description = v.description),
    (items.code = v.code),
    (items.created_at = v.created_at ? (v.created_at).toString().slice(0, 10) : v.created_at),
    (items.user_id = v.user_id)
};

const openModal = (v) => {
  modalActivate.value = !modalActivate.value;
};

const copyCode = (a) => {
  navigator.clipboard.writeText(a)
}

</script>

<template>
  <div v-if="data.length > 0">
    <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-4 md:grid-cols-3">
      <EditNote @closeModal="openModal()" @refresh="getDataU()" :modalActivate="modalActivate" :items="items" />
      <div v-for="(item, index) in data" :key="index">
        <div v-motion-slide-bottom :class="darkMode ? 'bg-[#0F1113]' : 'bg-white'"
          class="max-w-sm min-h-60 rounded-lg shadow-lg transition ease-out hover:-translate-y-2 group p-3 ">
          <div class="flex items-center justify-between mb-4">
            <p :class="darkMode ? 'text-slate-300' : 'text-slate-600'" class="text-lg  font-semibold">{{ item.title }}
            </p>
            <div class="flex space-x-1">
              <button @click="copyCode(item.code)"
                class="flex justify-center items-center opacity-0 group-hover:opacity-100  item-center shadow-sm text-white hover:shadow-rose-300 rounded-md w-7 h-7 bg-gradient-to-r from-red-300 to-orange-200">
                <jicon class="w-5 " icon='copy' />
              </button>
              <button @click="editNote(item), openModal()"
                class="flex justify-center items-center opacity-0 group-hover:opacity-100  item-center shadow-sm text-white hover:shadow-rose-300 rounded-md w-7 h-7 bg-gradient-to-r from-red-300 to-orange-200">
                <jicon class="w-5 " icon='code' />
              </button>
            </div>
          </div>

          <p :class="darkMode ? 'text-slate-400/90' : 'text-slate-600'"
            class="text-sm py-1 -mt-5 font-sans text-justify max-w-xs ">
            {{ item.description }}
          </p>
          <div :class="darkMode ? 'scrollbar-dark' : 'scrollbar'" style="overflow: auto">
            <n-ellipsis line-clamp="6" :tooltip="false">
              <n-code :class="darkMode ? 'text-white' : 'text-slate-900'" :code="item.code" language="javascript" />
            </n-ellipsis>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-motion-slide-bottom v-else>
    <div class="flex justify-center">
      <div :class="darkMode ? 'bg-[#0F1113]' : 'bg-white'" class=" p-4 rounded-md shadow-sm ">
        <div class=" text-gray-400 flex items-center">
          <jicon class="w-10  " icon='empty' />
          <p class="font-sans text-lg"> {{ english ? 'There are no records.' : 'Aun no existen registros' }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.limited-text {
  overflow: hidden;
  white-space: nowrap;
  max-height: 130px;
}
</style>
