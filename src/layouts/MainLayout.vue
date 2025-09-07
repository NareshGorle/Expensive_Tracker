<template>
  <q-layout view="hHh lpR lFr">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div class="absolute-center">
          <q-icon name="payments" />
          Expensive Tracker
          </div>
        </q-toolbar-title>

        <div 
        class="q-pa-md" 
        v-if="authStore.user.id" >
          {{ authStore.user.email }}
          </div>
          
          
      </q-toolbar>
    </q-header>

    <q-drawer
      class="bg-primary text-white"
      v-model="leftDrawerOpen"
      :width="250"
      :breakpoint="750"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label 
        class="text-white"
         header> Menu </q-item-label>

        <NavLink v-for="link in NavLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import NavLink from 'src/components/Menu/NavLink.vue'
import { useAuthStore } from 'src/stores/authStore'


const authStore = useAuthStore()

const NavLinks = [
  {
    title: 'Home',
    icon: 'home',
    link: '/'
  },
  // {
  //   title: 'Settings',
  //   icon: 'settings',
  //   link: '/settings'
    
  // }
  
  
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
