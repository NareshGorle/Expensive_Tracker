import { defineStore } from "pinia"
import {auth} from 'src/js/firebase'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from "firebase/auth"
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { useTransactionStore } from "./transactionStore";



export const useAuthStore = defineStore("authStore", () => {
 
const user = ref({
  id:null,
  email:null
});

  const init = () =>{
    const transactionStore = useTransactionStore();
     const router = useRouter()
    
    onAuthStateChanged(auth, (userFb) => {
  if (userFb) {
    user.value.id = userFb.uid
    user.value.email = userFb.email
    router.push('/')
    transactionStore.init()
    
  } else {
    user.value = {}
    router.replace('/auth')
    transactionStore.clearTransactions()
  }
})
  };


  const registerUser=(credentials)=>{
    createUserWithEmailAndPassword(auth,credentials.email, credentials.password).then((userCredential) => {  
    const user = userCredential.user;
     console.log(user,'user registered')
  }) .catch((error) => {
    console.log('error',error.message) 
  })
  };

     const loginUser=(credentials)=>{
       signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
                const user = userCredential.user
                 console.log('loginUser',user)
              })
              .catch((error) => {
                console.log(error.message) 
              })      
     };

     
  const logoutUser=()=>{
     signOut(auth).then(() => {
          console.log('user logged out')
      }).catch((error) => {
        console.log('error',error.message)
      })
        };

  
return {
  auth ,
  user,
  init,
  registerUser,
  loginUser,
  logoutUser

  };
});