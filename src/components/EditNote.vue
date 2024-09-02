<script setup>
import { ref, toRefs } from "@vue/reactivity";
import { onUpdated } from "vue";
import jicon from '../img/icons/jicon.vue';
import { NSelect, useMessage, NSpace, NButton } from 'naive-ui';
import { storePinia } from "../store";
import { supabase } from '../supabase/client';
import { storeToRefs } from 'pinia';

const props = defineProps({
    modalActivate: Boolean,
    items: Object,
});
const emit = defineEmits(["closeModal", "refresh"]);

const { modalActivate } = toRefs(props);
const store = storePinia()
const { darkMode, english } = storeToRefs(store)
const formitem = ref({});
const languageOptions = ref([]);
const formRef = ref(null);
const loading = ref(false);
const editCode = ref(true);
const message = useMessage();

onUpdated(() => {
    if (modalActivate.value == true) {
        languageOptions.value = store.languages
        formitem.value = props.items;
    }
});

const closeModal = () => {
    emit("closeModal");
};

const save = (values) => {
    formRef.value.validate(async (errors) => {
        if (!errors) {
            try {
                loading.value = true;
                const result = await supabase
                    .from('notes')
                    .update({
                        title: values.title, language_id: values.language_id,
                        description: values.description, code: values.code,
                        user_id: values.user_id
                    })
                    .eq('id', values.id)
                // console.log(result);
                if (result.status == 204 || result.status == 202) {
                    emit("refresh", {});
                    closeModal();
                    message.success("Edit Success");
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
        message: english ? "Required" : "Requerido",
        trigger: "blur",
    },
    description: {
        required: true,
        message: english ? "Required" : "Requerido",
        trigger: "blur",
    },
    code: {
        required: true,
        message: english ? "Required" : "Requerido",
        trigger: "blur",
    },
};

const copyCode = (a) => {
    navigator.clipboard.writeText(a);
}
</script>

<template>
    <n-modal :title="editCode ? formitem.title : english ? 'Edit Code' : 'Editar Nota'" preset="card"
        :show="modalActivate" :on-close="closeModal" style="width: 600px" :auto-focus="false" @esc="closeModal()">
        <div v-if="editCode" class="group">
            <div class="absolute z-30 right-5 mt-6">
                <button @click="copyCode(formitem.code)"
                    class="flex justify-center items-center drop-shadow-xl opacity-0 group-hover:opacity-100 shadow-sm text-white hover:shadow-rose-300 rounded-md w-8 h-8 bg-gradient-to-r from-red-300 to-orange-200">
                    <jicon class="w-6 " icon='copy' />
                </button>
                <button @click="() => editCode = false"
                    class="flex justify-center items-center mt-3 drop-shadow-xl opacity-0 group-hover:opacity-100 shadow-sm text-white hover:shadow-rose-300 rounded-md w-8 h-8 bg-gradient-to-r from-red-300 to-orange-200">
                    <jicon class="w-5 " icon='edit' />
                </button>
            </div>

            <p :class="darkMode ? 'text-slate-400' : 'text-slate-400/90'"
                class="text-sm -mt-5 mb-2 font-sans text-slate-600">
                {{ formitem.description }}
            </p>
            <n-code :code="formitem.code" language="javascript" word-wrap />

            <p :class="darkMode ? 'text-slate-400' : 'text-slate-400/90'" class="text-sm font-sans text-slate-600">
                Date: {{ formitem.created_at }}
            </p>
        </div>
        <n-form v-else v-model:model="formitem" :rules="rules" ref="formRef" class="-mt-2">
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
                    <n-input size="small" v-model:value="formitem.description" placeholder="...." type="textarea"
                        :autosize="{
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

        <template v-if="!editCode" #action>
            <n-space justify="end">
                <n-button @click="() => editCode = true" ghost>{{ english ? 'Cancel' : 'Guardar' }}</n-button>
                <n-button :disabled="loading" :loading="loading" type="primary" @click="save(formitem)">{{ english ?
                    'Save' : 'Guardar' }}
                </n-button>
            </n-space>
        </template>
    </n-modal>
</template>
