<script setup>
import { ref, toRefs } from "@vue/reactivity";
import jicon from '../img/icons/jicon.vue';
import { NSelect, useMessage, NSpace, NButton } from 'naive-ui';
import { storePinia } from "../store";
import { supabase } from '../supabase/client';
import { storeToRefs } from "pinia";

const props = defineProps({
  items: Object,
});
const emit = defineEmits(["closeModal", "refresh"]);

const store = storePinia()
const { english } = storeToRefs(store)

const formitem = ref({});
const languageOptions = ref([]);
const formRef = ref(null);
const loading = ref(false);
const modalActivate = ref(false);
const message = useMessage();
const userID = ref("");

const newNote = () => {
  formitem.value = {
    id: null,
    language_id: 1,
    title: "",
    description: "",
    code: "",
    created_at: null,
    user_id: userID.value,
  }
};

const openModal = () => {
  languageOptions.value = store.languages
  userID.value = store.userId
  modalActivate.value = true
  newNote()
}

const closeModal = () => {
  modalActivate.value = false
  newNote()
};

const save = (values) => {
  formRef.value.validate(async (errors) => {
    if (!errors) {
      try {
        loading.value = true;
        const result = await supabase
          .from('notes')
          .insert({
            title: values.title, language_id: values.language_id,
            description: values.description, code: values.code,
            user_id: userID.value
          })
        // console.log(result);
        if (result.status == 201 || result.status == 202) {
          closeModal();
          store.getUpdate()
          message.success("Create Success");
        } else {
          message.error("Error XD");
        }
      } catch (error) {
        message.error("Error");
      } finally {
        setTimeout(() => (loading.value = false), 150);
      }
    } else {
      message.warning("Required parameter");
    }
  });
};

const rules = {
  title: {
    required: true,
    message: "Required",
    trigger: "blur",
  },
  description: {
    required: true,
    message: "Required",
    trigger: "blur",
  },
  code: {
    required: true,
    message: "Required",
    trigger: "blur",
  },
};
</script>

<template>
  <n-modal :title="english ? 'New Note' : 'Nueva Nota'" preset="card" :show="modalActivate" :on-close="closeModal"
    style="width: 600px" :auto-focus="false" @esc="closeModal()">
    <n-form v-model:model="formitem" :rules="rules" ref="formRef" class="-mt-2">
      <n-grid x-gap="12" cols="12 100:1 450:12">
        <n-form-item-gi span="8" :label="english ? 'Title' : 'Titulo'" path="title">
          <n-input size="small" v-model:value="formitem.title" placeholder="..." />
        </n-form-item-gi>

        <n-form-item-gi span="4" :label="english ? 'Language' : 'Lenguaje'">
          <n-select size="small" placeholder="-------" filterable :options="languageOptions"
            v-model:value="formitem.language_id" />
        </n-form-item-gi>
      </n-grid>
      <n-grid x-gap="12" cols="12 100:1 450:12">
        <n-form-item-gi span="12" :label="english ? 'Description' : 'Descripción'" path="description">
          <n-input size="small" v-model:value="formitem.description" placeholder="...." type="textarea" :autosize="{
            minRows: 2,
          }" />
        </n-form-item-gi>
      </n-grid>


      <n-grid x-gap="12" cols="12 100:1 450:12">
        <n-form-item-gi span="12" :label="english ? 'Code' : 'Codigo'" path="code">
          <n-input v-model:value="formitem.code" placeholder="...." type="textarea" :autosize="{
            minRows: 8,
          }" />
        </n-form-item-gi>
      </n-grid>
    </n-form>

    <template #action>
      <n-space justify="end">
        <n-button @click="closeModal()" ghost>{{ english ? 'Cancel' : 'Cancelar' }}</n-button>
        <n-button :disabled="loading" :loading="loading" type="primary" @click="save(formitem)">{{ english ? 'Save' :
          'Guardar' }}
        </n-button>
      </n-space>
    </template>
  </n-modal>
  <button @click="openModal()"
    class="absolute z-30 drop-shadow-xl bottom-8 right-4 rounded-full w-12 h-12 flex justify-center items-center bg-gradient-to-r from-red-300 to-orange-200 hover:bg-[#DEAA9D] active:bg-[#EBBCBA]">
    <jicon class="w-8 text-white" :icon="'add'" />
  </button>
</template>

<style scoped></style>
