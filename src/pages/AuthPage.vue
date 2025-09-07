<template>
  <div class="row justify-center items-center bg-grey-3" style="height: 100vh;">
    <q-card class="card auth-form q-pa-lg ">

      <q-tabs
        v-model="activeTab"
        class="bg-primary text-white"
        filled
        indicator-color="white"
      >
        <q-tab  name="login" label="Log In" />
        <q-tab  name="register" label="Register" />
      </q-tabs>
      <q-separator />

      
      <!-- Form -->
      <q-form @submit.prevent="onSubmit" class="q-mt-md">
        <div class="text-h6 text-center q-mb-md text-primary">
          {{ formTitle }}
        </div>
                    <div class="field">
                      <label> Email </label>
                      <div>
                         <q-input
                            v-model="credentials.email"
                            Placeholder="e.g. EmmaWatson @ gmail.com"
                            type="email"
                            outlined
                            filled
                            class="q-mb-md"
                            color="primary"
                            
                          />
                      </div>


                    </div>
                    <div class="felid">
                      <label> Password </label>
                      <div>
                        <q-input
                          v-model="credentials.password"
                          placeholder="Password"
                          type="password"
                          outlined
                          filled
                          class="q-mb-md"
                          color="primary"
                    
                        />
                      </div>
                    </div>
      
                    <div>
                       <q-btn
                          type="submit"
                          color="primary"
                          class="float-right"
                          unelevated
                          push
                        > {{ formTitle }}</q-btn>
                    </div>
       
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from 'src/stores/authStore'

const authStore = useAuthStore()

  const $q = useQuasar()


 const activeTab = ref('login') 

 const formTitle = computed(()=>{
  return activeTab.value === 'login' ? 'Login' : 'Register';
 })


const credentials = reactive({
  email: '',
  password: ''
})

const onSubmit = () => {

  
   if (!credentials.email || !credentials.password) {
    $q.notify({
      message: 'Please enter an email and password.',
      color: 'negative',
      position: 'top'
    })
  }else{
    if(activeTab.value === 'register'){
      authStore.registerUser(credentials)
    }
    else{
      authStore.loginUser(credentials)
      
    }
  }
}

</script>
<style>

.auth-form{
  width: 90vw;
  max-width: 400px;
  margin:0 auto;
  height: auto;
  border-radius: 12px;
}
</style>
