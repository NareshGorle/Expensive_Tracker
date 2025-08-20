<template>
  <q-page >
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
          v-model="addTransaction.name"
          ref="nameRef"
          placeholder="Transaction name"
          outlined
          required
          dense
        />
          </div>
          <div class="col">
            <q-input
              v-model.number="addTransaction.amount"
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
    
    <q-card class=" q-ma-md bg-primary">
    <q-card-section class="text-center ">
      <div class="text-h4 text-weight-bold "
       :class="usePosNegColors(balance)">
        {{ useFormate(balance) }}
      </div>
      <div class="text-subtitle1 q-mt-sm "
       :class="usePosNegColors(balance)">
        Available Balance
      </div>
    </q-card-section>
  </q-card>

  <div class="q-ml-md text-h5 text-primary"> Recent Transaction </div>

  <q-card 
   class="q-ma-md"
     >
       <q-slide-item
        @right=" onSlideRight($event, transaction.id)"
        v-for="transaction in transactions"
        :key="transaction.id"
        right-color="negative">
        <template v-slot:right>
          <q-icon name="delete" />
        </template>
  
          <q-card-section>

            <div>
              <div class="row items-center justify-between">
                  <div class="col"
                  :class="usePosNegColors(transaction.amount)">   
                  {{ transaction.name }}</div>
                 <div class="col-auto"
                  :class="usePosNegColors(transaction.amount)">
                   {{  useFormate(transaction.amount) }} 
                 </div>
                 <div class="text-caption on-right text-grey-6">{{ todaysDate }}</div>     

            </div> 
            </div>
          </q-card-section>
      </q-slide-item>
      
  </q-card>


  </q-page>
</template>

<script setup>
import { ref,computed , reactive} from 'vue';
import { useFormate } from 'src/use/useFormate';
import { usePosNegColors } from 'src/use/usePosNegColors';
import { uid,useQuasar,date } from 'quasar';



const $q = useQuasar()

const transactions = ref([
        {
        id: 'id1',
        name: 'Salary',
        amount: 49999,
      },
      {
        id: 'id2',
        name: 'Movie',
        amount: -499,
        
      },
      {
        id: 'id3',
        name: 'Room',
        amount: -2999,
      },
            {
        id: 'id4',
        name: 'Interest',
        amount: 0,
        
      }
      ])


 // balance 
   const balance = computed(()=>{
   return transactions.value.reduce((acc,{amount})=>{
    return acc + amount
   },0)
   })

  const nameRef = ref(null)

  //  add entry 
   const addTransaction = reactive({
    name:'',
    amount: null
    
   })
  
     const TransactionFormReset =() =>{
      addTransaction.name = "",
      addTransaction.amount = null
      nameRef.value.focus()
     }

   const handleSubmit=()=>{
      const newTransaction = {
        id: uid(),
        name:addTransaction.name,
        amount:addTransaction.amount,
     }
     $q.notify({
      message:'Transaction Added',
      position:'top',
      color:'positive' })
      transactions.value.push(newTransaction) 
      saveToLocalStorage()
      TransactionFormReset()

   }

   const onSlideRight=({reset},transactionId)=>{
      $q.dialog({
        title: 'DELETE',
        message: `Would you like to delete this transaction?
         `,
        persistent: true,
        ok: {
          label:'Delete',
          color: 'negative',
          noCaps: true
        },
        cancel: {
          color: 'primary',
          noCaps: true
        }

      }).onOk(() => {
         deleteTransaction(transactionId)
      }).onCancel(() => {
        reset()
      })
    }

   const deleteTransaction = (transactionId) =>{
     const index = transactions.value.findIndex(transaction =>transaction.id === transactionId
    )
    transactions.value.splice(index,1)
    saveToLocalStorage()
     $q.notify({
      message:'Transaction Deleted',
      position:'top',
      color:'negative'
     })
}

 const todaysDate = computed(()=>{
  let timeStamp = Date.now()
  return  date.formatDate(timeStamp,'D MMM')
 })

const saveToLocalStorage = () =>{
  localStorage.setItem('transactions', JSON.stringify(transactions.value))

  }
 const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('transactions')
  if (saved) {
    transactions.value = JSON.parse(saved)
  }
}
loadFromLocalStorage();

</script>
