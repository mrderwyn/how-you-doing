import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore'
import service from './firebaseService';

export type FirestoreServiceType = typeof service;

export type FirestorePostDataType = {
    author: DocumentReference<DocumentData>,
    createdAt: Timestamp,
    text: string,
    picture: string,
    tags: string[]
}

export type FirestoreCommentDataType = {
    author: DocumentReference<DocumentData>,
    post_id: DocumentReference<DocumentData>,
    createdAt: Timestamp,
    text: string
}

export type FirestoreUserDataType = {
    name: string,
    background: string,
    avatar: string,
    description: string,
}

export type FirestoreHistoryDataType = {
    action: string,
    createdAt: Timestamp,
    target: DocumentReference<DocumentData>,
    user_id: DocumentReference<DocumentData>,
}