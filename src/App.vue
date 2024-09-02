<script setup>
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Note from './components/Note.vue'
import AddNote from './components/AddNote.vue'
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import { supabase } from './supabase/client';
import { storePinia } from './store';
import { onMounted, watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { darkTheme } from "naive-ui";
import { myTheme } from './store/setting';

hljs.registerLanguage("javascript", javascript);
const store = storePinia()

const { darkMode } = storeToRefs(store)
const theme = ref(null);

const getUser = async () => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (!session) {
      // console.log("gettttt Userrr")
      await supabase.auth.signInWithPassword({
        email: 'guest@gmail.com',
        password: '54321',
      })
    }
  })
}

const getValues = async () => {
  await store.getLan()
  await getUser()
}

const startMode = () => {
  if (localStorage.getItem("mode") == "true") {
    store.setDarkMode(true)
  }
}

onMounted(() => {
  startMode()
  getValues()
});


watch(darkMode, async () => {
  theme.value = darkMode.value ? darkTheme : null
});
</script>

<template>
  <n-config-provider :hljs="hljs" :theme-overrides="myTheme" :theme="theme">
    <n-message-provider>
      <AddNote />
      <div :class="darkMode ? 'bg-[#17191B]' : 'bg-slate-100'"
        class="static h-screen w-screen overflow-x-hidden scrollbar">
        <Header />
        <Menu />
        <div class="w-screen flex items-center justify-center mt-6 p-2">
          <Note />
        </div>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
.n-form-item .n-form-item-feedback-wrapper {
  min-height: 8px;
}
</style>
