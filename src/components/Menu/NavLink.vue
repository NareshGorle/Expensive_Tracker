<template>
  <q-item 
  clickable 
  class="text-white"
  tag="a" 
   :to="props.link">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label class="text-white" caption>{{ props.caption }}</q-item-label>

 
    </q-item-section>
         
  </q-item>
       <div class="q-pa-md">
        <q-btn
         flat
        dense
         v-if="authStore.user.id"
         icon="logout" 
        label="log out"
         class="text-red"
         @click="authStore.logoutUser">{{ authStore.user.email }}
        </q-btn>
      </div>
</template>

<script setup>
import { useAuthStore } from 'src/stores/authStore'


const authStore = useAuthStore()
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: '',
  },

  link: {
    type: String,
    default: '#',
  },

  icon: {
    type: String,
    default: '',
  },
})
</script>
