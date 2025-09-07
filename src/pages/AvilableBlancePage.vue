<template>
  <q-card class=" q-ma-md bg-primary">
    <q-card-section class="text-center ">
      <div class="text-h4 text-weight-bold "
       :class="usePosNegColors(store.balance)">
        {{ useFormate(store.balance) }}
      </div>
      <div class="text-subtitle1 q-mt-sm "
       :class="usePosNegColors(store.balance)">
        Available Balance
      </div>
    </q-card-section>
  </q-card>

</template>
<script setup>
import { useTransactionStore } from 'src/stores/transactionStore';
import { useFormate } from 'src/use/useFormate';
import { usePosNegColors } from 'src/use/usePosNegColors';

const store = useTransactionStore();


</script>