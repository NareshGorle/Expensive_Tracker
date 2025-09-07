<template>
         <q-card class="q-ma-md">
      <q-card-section>
        <div 
        class="text-h6 q-mb-md text-center 
        ">Add New Transaction
        </div>
        <q-form @submit.prevent="handleSubmit">
        <div class="row q-col-gutter-md">
          <div class="col">
          <q-input
          v-model="transactionForm.name"
          ref="nameRef"
          placeholder="Transaction name"
          outlined
          required
          dense
        />
          </div>
          <div class="col">
            <q-input
              v-model.number="transactionForm.amount"
              placeholder="Transaction Amount"
              type="number"
              outlined
              input-class="text-right"
              required
              dense
            />
          </div>
          </div>
          <div class="q-pa-md">
            <q-btn
             label='submit'
             type='submit'
             color='blue'
             class="full-width"
            ></q-btn>
          </div>
        
        </q-form>
      </q-card-section>
    </q-card> 

   
    </template>
    <script setup>
 import {useTransactionStore} from 'src/stores/transactionStore'
import { ref,reactive} from 'vue';
import { useQuasar } from 'quasar';


 const store = useTransactionStore();
 const $q = useQuasar();
 const nameRef = ref(null);

   const transactionForm = reactive({
       name:'',
       amount: null,
   });

  const TransactionFormReset =() =>{
      transactionForm.name = "",
      transactionForm.amount = null,
      nameRef.value.focus()
     };

  const handleSubmit=()=>{
      store.addTransaction (transactionForm.name,transactionForm.amount)

      $q.notify({
        message: 'Transaction Added',
        position: 'top',
        color: 'positive' 
     });
     
      TransactionFormReset()

   }

  </script>