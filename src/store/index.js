import { defineStore } from 'pinia'
import { supabase } from '../supabase/client';

export const storePinia = defineStore('store', {
    state: () => ({
        languages: [],
        userType: false,
        updateData: false,
        darkMode: false,
        english: true,
        menu: true,
        textS: "all",
        userId: "9bf9bff1-b617-4966-a755-951f467458b9",
    }),
    getters: {
        getLanguages: (state) => {
            return state.languages
        },
    },
    actions: {
        async getLan() {
            const result = await supabase.from('language').select()
            this.languages = await result.data.map((v) => ({
                label: v.name,
                value: v.id,
            }));
        },
        getUpdate() {
            this.updateData = !this.updateData
        },
        setUserId(v) {
            this.userId = v
        },
        setSearch(v) {
            this.textS = v
        },
        setDarkMode(v) {
            this.darkMode = v ? v : !this.darkMode
        },
        setEnglish(v) {
            this.english = v ? v : !this.english
        },
        setMenu(v) {
            this.menu = v ? v : !this.menu
        },
        setChangeUser() {
            this.userType = !this.userType
        }
    }
})