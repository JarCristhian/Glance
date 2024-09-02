<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import js from "../img/js.png";
import ts from "../img/ts.png";
import py from "../img/py.png";
import vue from "../img/vue.png";
import react from "../img/react.png";
import cSharp from "../img/cSharp.png";
import { storePinia } from '../store';
import { storeToRefs } from 'pinia';

const store = storePinia()
const { darkMode, menu } = storeToRefs(store)
const changeFilter = (v) => {
  store.setSearch(v)
}
</script>

<template>
  <div v-motion-slide-bottom v-if="menu == true">
    <div class="flex justify-center mx-2 md:mx-auto mt-4">
      <div :class="darkMode ? 'bg-[#0F1113]' : 'bg-white'"
        class="h-14 p-2 rounded-md shadow-lg overflow-x-auto overflow-hidden">
        <div class="flex justify-evenly space-x-3">
          <img width="35" class="rounded-sm cursor-pointer select-none" :src="js" @click="changeFilter('1')" />
          <img width="35" class="rounded-sm cursor-pointer select-none" :src="ts" @click="changeFilter('2')" />
          <img width="35" class="rounded-sm cursor-pointer select-none" :src="py" @click="changeFilter('3')" />
          <img width="35" class="rounded-sm cursor-pointer select-none" :src="cSharp" @click="changeFilter('4')" />
          <img width="40" class="rounded-sm cursor-pointer select-none" :src="vue" @click="changeFilter('5')" />
          <img width="37" class="rounded-sm cursor-pointer select-none" :src="react" @click="changeFilter('6')" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
