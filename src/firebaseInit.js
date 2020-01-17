import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

import config from './firebaseConfig.js'

// NODE_ENV undefined for some reason when set before runnin cypress
const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'testing'
console.log('Initializing firebase with environment: ' + environment)

const firebase = Firebase.initializeApp(config[environment])

export const firestore = firebase.firestore()
export const database = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()
