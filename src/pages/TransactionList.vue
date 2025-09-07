<template>
        <div class="q-ml-md text-h5 text-primary"> Recent Transaction <q-chip>
        <q-avatar color="red" text-color="white">{{ store.transactionCount }}</q-avatar>
      </q-chip>
    </div>
    <q-card 
   class="q-ma-md"
     >
       <q-slide-item
        @right=" onSlideRight($event, transaction.id)"
        v-for="transaction in store.transactions"
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
                 <div class="text-caption on-right text-grey-6">{{store.todaysDate(transaction.createdDate, 'DD MMM ')  }}</div>     

            </div> 
            </div>
          </q-card-section>
      </q-slide-item>
      
  </q-card>


</template>
<script setup>

import { useQuasar } from 'quasar';
import { useTransactionStore } from 'src/stores/transactionStore';
import { useFormate } from 'src/use/useFormate';
import { usePosNegColors } from 'src/use/usePosNegColors';


 const store = useTransactionStore();

const $q = useQuasar();

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
        store.deleteTransaction(transactionId)
          $q.notify({
      message: 'Transaction Deleted',
      position: 'bottom',
      color: 'negative'
        })
        reset()
    }).onCancel(() => {
        reset()
      })
    }
  
       
</script>