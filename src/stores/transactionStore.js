import { defineStore } from "pinia";
import { date, uid} from "quasar";
 import { db } from "src/js/firebase";
 import { collection, onSnapshot,addDoc,doc, deleteDoc } from "firebase/firestore";
import { computed,ref} from "vue";
import { useAuthStore } from "./authStore";




let transactionCollectionRef

export const useTransactionStore = defineStore("transactionStore", () => {
  //state
  const transactions = ref([
        // {
      //   id: 'id1',
      //   name: 'Salary',
      //   amount: 49999,
      //   createdDate: Date.now()
      // },
      // {
      //   id: 'id2',
      //   name: 'Movie',
      //   amount: -499,
      //   createdDate: Date.now()
      // },
      // {
      //   id: 'id3',
      //   name: 'Room',
      //   amount: -2999,
      //   createdDate: Date.now()
         
      // },
      //       {
      //   id: 'id4',
      //   name: 'Interest',
      //   amount: 0,
      //   createdDate: Date.now()
      // }
      ]);


      // getters

    const balance = computed(()=>{
            return transactions.value.reduce((acc,{amount})=>{
            return acc + amount
            },0)
          });

          
      const transactionCount = computed(() => {
            return transactions.value.length
            });

         const todaysDate = (timestamp, format = 'DD MMM') => {
         return date.formatDate(timestamp, format);
       };

       // actions
const init = () =>{
  const authStore = useAuthStore();
   transactionCollectionRef = collection(db, 'users',authStore.user.id,'transactions')
  loadTransactions()
};
 
const loadTransactions = async ()=>{
   onSnapshot(transactionCollectionRef,(querySnapshot) => {
    let transactionsTemporary = []
    querySnapshot.forEach((doc) => {
      let transaction = doc.data()
      transaction.id = doc.id
      transactionsTemporary.push(transaction)
  })
  transactions.value = transactionsTemporary
  
})

};

loadTransactions();

const clearTransactions=()=>{
transactions.value=[]
};

const addTransaction = async (name, amount) => {
    const newTransaction = {
      id: uid(),
      name,
      amount,
      createdDate: Date.now(),
    }
   await addDoc(transactionCollectionRef, newTransaction);
  };
     
     const deleteTransaction = async (transactionId) =>{
       console.log("Deleting transactionId:", transactionId);
        await deleteDoc(doc(transactionCollectionRef, transactionId)) 
  };

return {
    transactions,
    balance,
    transactionCount,
    todaysDate,
    init,
    clearTransactions,
    addTransaction,
    deleteTransaction,
    loadTransactions,
  

  };
});




// const saveToLocalStorage = () =>{
//     localStorage.setItem('transactions', JSON.stringify(transactions.value))

//   }
//  const loadFromLocalStorage = () => {
//   const saved = localStorage.getItem('transactions')
//   if (saved) {
//     transactions.value = JSON.parse(saved)
//   }
// }

 