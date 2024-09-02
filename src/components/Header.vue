<script setup>
import { ref } from 'vue'
import jicon from '../img/icons/jicon.vue';
import { supabase } from '../supabase/client';
import { useMessage } from 'naive-ui';
import { storePinia } from '../store';
import { storeToRefs } from 'pinia';

const store = storePinia()
const { darkMode, english, menu, userType } = storeToRefs(store)
const drawerActivate = ref(false);
const passT = ref("");
const message = useMessage();

const openDrawer = () => {
  drawerActivate.value = !drawerActivate.value;
}

const login = async () => {
  try {
    await supabase.auth.signOut()
    if (userType.value) {
      const newUser = await supabase.auth.signInWithPassword({
        email: 'guest@gmail.com',
        password: '54321',
      })
      let userId = await newUser.data.user.id
      await store.setUserId(userId)
      passT.value = ""
      message.success("Logout successful");
    } else {
      const newUser = await supabase.auth.signInWithPassword({
        email: 'criz@gmail.com',
        password: passT.value,
      })
      let userId = await newUser.data.user.id
      await store.setUserId(userId)
      message.success("Login successful");
    }
    await store.setChangeUser()
  } catch (error) {
    message.error("Incorrect password");
  }
}

const changeMode = () => {
  store.setDarkMode()
  localStorage.setItem("mode", darkMode.value)
}
</script>

<template>
  <div>
    <div :class="darkMode ? 'bg-[#0F1113]' : 'bg-white'" class="w-screen h-12 py-2 px-3 shadow-sm items-center">
      <div class="flex justify-between ">
        <a :class="darkMode ? 'bg-gradient-to-r from-red-300 to-orange-200 bg-clip-text text-transparent' : 'text-slate-600'"
          class="font-serif text-3xl select-none font-bold">Glance</a>
        <div class="flex justify-between space-x-1 ">
          <jicon :class="darkMode ? 'text-slate-300' : 'text-slate-600'" class="w-8  cursor-pointer"
            :icon="darkMode ? 'night' : 'day'" @click="changeMode()" />
          <jicon :class="darkMode ? 'text-slate-300' : 'text-slate-600'" class="w-8 cursor-pointer" :icon="'sett'"
            @click="openDrawer()" />
        </div>
      </div>
    </div>
    <n-drawer v-model:show="drawerActivate" :width="350" placement="right">
      <n-drawer-content :title="english ? 'Settings' : 'Ajustes'">
        <div class="flex justify-between mb-4">
          <p> {{ english ? 'Show Menu' : 'Mostrar Menu' }}</p>
          <n-switch v-model:value="menu" checked:value="store.setMenu()" />
        </div>
        <div class="flex justify-between">
          <p> {{ english ? 'English' : 'Ingles' }} </p>
          <n-switch v-model:value="english" checked:value="store.setEnglish()" />
        </div>

        <n-collapse arrow-placement="right" class="mt-4" default-expanded-names="1">
          <n-collapse-item :title="english ? 'My Codes' : 'Mis Codigos'">
            <div>
              <n-input-group>
                <n-input type="password" placeholder="Password" v-model:value="passT" :disabled="userType" />
                <n-button type="primary" @click="login()" :disabled="passT == ''">
                  {{ userType ? 'Logout' : 'Login' }}
                </n-button>
              </n-input-group>
            </div>
          </n-collapse-item>

        </n-collapse>
      </n-drawer-content>
    </n-drawer>
  </div>

</template>

<style scoped></style>
