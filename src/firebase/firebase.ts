import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const config = {
  apiKey: 'AIzaSyAdS8Bbq9g3sZQudaRph4iLYqSuOYXHkvE',
  authDomain: 'how-you-doing-acdd5.firebaseapp.com',
  projectId: 'how-you-doing-acdd5',
  storageBucket: 'how-you-doing-acdd5.appspot.com',
  messagingSenderId: '240816799155',
  appId: '1:240816799155:web:e038f0726df68a02cf1fc6',
  measurementId: 'G-47Y2CX04CB'
}

const app = initializeApp(config)

export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)
export default app
