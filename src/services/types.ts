import { type DocumentData, type DocumentReference, type Timestamp } from 'firebase/firestore'
import type service from './firebaseService'

export type FirestoreServiceType = typeof service

export interface FirestorePostDataType {
  author: DocumentReference<DocumentData>
  createdAt: Timestamp
  text: string
  picture: string
  tags: string[]
}

export interface FirestoreCommentDataType {
  author: DocumentReference<DocumentData>
  post_id: DocumentReference<DocumentData>
  createdAt: Timestamp
  text: string
}

export interface FirestoreUserDataType {
  name: string
  background: string
  avatar: string
  description: string
}

export interface FirestoreHistoryDataType {
  action: string
  createdAt: Timestamp
  target: DocumentReference<DocumentData>
  user_id: DocumentReference<DocumentData>
}
