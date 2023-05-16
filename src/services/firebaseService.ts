import { firestore, storage } from '../firebase/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import 
{ 
    doc, 
    getDoc, 
    addDoc, 
    collection, 
    setDoc, 
    deleteDoc, 
    query, 
    onSnapshot, 
    where, 
    getDocs, 
    updateDoc,
    serverTimestamp,
    orderBy,
    Timestamp,
    DocumentData,
    QuerySnapshot,
    QueryDocumentSnapshot,
    DocumentReference,
    limit,
    QueryOrderByConstraint,
    QueryFieldFilterConstraint,
    startAfter,
    Query,
    DocumentChange
} from 'firebase/firestore';
import {v4 as createId } from 'uuid';

import { PostType, CommentType, LightUserInfoType, FullUserInfoType, DetailedUserInfoType, NotificationType } from '../types';

import createCachedAsyncMethod from '../helpers/createCachedAsyncMethod';
import { FirestoreCommentDataType, FirestoreHistoryDataType, FirestorePostDataType, FirestoreUserDataType } from './types';

export const getUserByEmail = async (email: string) => {
    const users = collection(firestore, 'users');
    const emailQuery = query(users, where('email', '==', email));
    const docsRef = await getDocs(emailQuery);

    if (docsRef.size !== 1) {
        return null;
    }

    const userRef = docsRef.docs[0];
    const userData = userRef.data() as FirestoreUserDataType;

    return {
        id: userRef.id,
        ...userData,
    } as DetailedUserInfoType;
}

export const getUserById = async (id: string/*, self: string | undefined*/) => {
    const user = await getDoc(doc(firestore, 'users', id));
    if (!user.exists()) {
        return null;
    }

    const follow = await getFollowingList(id/*, self*/);
    const followers = await getFollowersList(id/*, self*/);

    const result: FullUserInfoType = {
        id: user.id,
        follow,
        followers,
        ...user.data() as FirestoreUserDataType,
    };

    return result;
}

export const getUserByIdWithListeners = async (id: string, self: string, listeners: any) => {
    const user = await getDoc(doc(firestore, 'users', id));
    if (!user.exists()) {
        return null;
    }

    const [follow, unsubscribeFollow] = await getFollowingListWithListener(id, self, listeners.addFollower, listeners.removeFollower);
    const [followers, unsubscribeFollowers] = await getFollowersListWithListener(id, self, listeners.addFollowed, listeners.removeFollowed);

    const result: FullUserInfoType = {
        id: user.id,
        follow,
        followers,
        ...user.data() as FirestoreUserDataType,
    };

    if (self !== undefined) {
        result.followedBy = (await getDoc(relationDoc(id, self))).exists();
    }

    return [result, () => {
        (unsubscribeFollow as any)();
        (unsubscribeFollowers as any)();
    }] as const;
}

const getLightUserByIdUncached = async (id: string) => {
    const user = await getDoc(doc(firestore, 'users', id));
    if (!user.exists()) {
        return null;
    }

    const { name, avatar } = user.data();
    const result: LightUserInfoType = {
        id: user.id,
        name,
        avatar,
    };

    return result;
}

export const getLightUserById = createCachedAsyncMethod(getLightUserByIdUncached);

export const hasUser = async (id: string) => {
    const user = doc(collection(firestore, 'users'), id);

    return (await getDoc(user)).exists();
}

export const createUser = async (id: string, email: string) => {
    const user = doc(collection(firestore, 'users'), id);
    const data = {
        email,
        avatar: '/images/avatars/default.png',
        background: '/images/backgrounds/default.jpg',
        description: '',
        name: id
    };

    try {
        let result: boolean = false;
        await setDoc(user, data)
            .then(res => {
                result = true;
            })
            .catch(err => {
                console.log(err);
                result = false;
            });

        return result;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export const updateUser = async (id: string, partialData: any) => {
    const user = userDoc(id);
    await updateDoc(user, partialData);
    return true;
}

export const addFollowRelation = async (followed: string, follower: string) => {
    const document = relationDoc(followed, follower);
    if ((await getDoc(document)).exists()){
        return false;
    }

    const data = {
        followed: userDoc(followed),
        follower: userDoc(follower),
    };

    return await setDoc(document, data)
        .then(res => {
            sendNotification('follow', follower, followed);
            return true;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
}

export const removeFollowRelation = async (followed: string, follower: string) => {
    const document = relationDoc(followed, follower);
    return await deleteDoc(document).then(_ => {
        sendNotification('unfollow', follower, followed);
        return true;
    }).catch(_ => false);
}

export const getFollowersList = async (id: string) => {
    const relations = collection(firestore, 'relations');
    const followersQuery = query(relations, where('followed', '==', userDoc(id)));
    const snapshot = await getDocs(followersQuery);

    const promises = snapshot.docs.map(async d => {
        const data = d.data();
        const follower = await getDoc(data.follower);
        const { name, avatar } = follower.data() as FirestoreUserDataType;
        const result: LightUserInfoType = { id: follower.id, name, avatar };

        return result;
    });

    return await Promise.all(promises);
}

export const getFollowersListWithListener = async (id: string, self: string, onAdd: any, onRemove: any) => {
    const relations = collection(firestore, 'relations');
    const followersQuery = query(relations, where('followed', '==', userDoc(id)));

    const initialSnapshot = await getDocs(followersQuery);
    const promises = initialSnapshot.docs.map(async d => {
        return await getLightUserById(d.data().follower.id);
    });
    const result = await Promise.all(promises).then(res => res.filter(f => f != null) as LightUserInfoType[]);

    const unsubscribe = addListener(followersQuery, change => getLightUserById(change.doc.data().follower.id), onAdd, onRemove);

    return [result, () => unsubscribe()] as const;
}

export const getFollowingList = async (id: string) => {
    const relations = collection(firestore, 'relations');
    const followersQuery = query(relations, where('follower', '==', userDoc(id)));
    const snapshot = await getDocs(followersQuery);

    const promises = snapshot.docs.map(async d => {
        const data = d.data();
        const following = await getDoc(data.followed);
        const { name, avatar } = following.data() as FirestoreUserDataType;
        const result: LightUserInfoType = { id: following.id, name, avatar };

        return result;
    });

    return await Promise.all(promises);
}

export const getFollowingListWithListener = async (id: string, self: string, onAdd: any, onRemove: any) => {
    const relations = collection(firestore, 'relations');
    const followersQuery = query(relations, where('follower', '==', userDoc(id)));

    const initialSnapshot = await getDocs(followersQuery);
    const promises = initialSnapshot.docs.map(async d => await getLightUserById(d.data().followed.id));
    const result = await Promise.all(promises).then(res => res.filter(f => f != null) as LightUserInfoType[]);
    const unsubscribe = addListener(followersQuery, change => getLightUserById(change.doc.data().followed.id), onAdd, onRemove);

    return [result, () => unsubscribe()] as const;
}

export const getAllUsers = async () => {
    const users = collection(firestore, 'users');
    const snapshot = await getDocs(users);

    const result: LightUserInfoType[] = [];
    snapshot.forEach(u => result.push({ id: u.id, ...u.data() as FirestoreUserDataType}));
    return result;
}

export const createPost = async (userId: string, picture: string, text: string, tags: string[]) => {
    try {
        const postRef = await addDoc(collection(firestore, 'posts'), {
            author: userDoc(userId),
            createdAt: serverTimestamp(),
            picture,
            text,
            tags,
        });

        sendNotification('post', userId, postRef.id);
        return postRef.id;
    }
    catch (err) {
        console.log('error in adding post', err);
        return null;
    }
}

const addListener = (
    query: Query<DocumentData>,
    converter: (change: DocumentChange<DocumentData>) => Promise<any>,
    onAdd: (value: any) => void,
    onRemove: (value: any) => void,    
) => {
    if (!onAdd && !onRemove) {
        return () => {};
    }

    const createSnapHandler = () => {
        let first = true;

        return (snap: QuerySnapshot<DocumentData>) => {
            if (first) {
                first = false;
                return;
            }

            const changes = snap.docChanges();
            changes.forEach((change) => {
                if (change.type === 'added') {
                    converter(change)
                        .then(value => onAdd && onAdd(value));
                }
                else if (change.type === 'removed') {
                    converter(change)
                        .then(value => onRemove && onRemove(value));
                }
            })
        }
    };

    return onSnapshot(query, createSnapHandler());
}

export const queryPostsWithListenerAndEndlessScroll = async (authors: string[], type: string, promt: string, listeners: any) => {
    const posts = collection(firestore, 'posts');
    const queryConstraints: (QueryOrderByConstraint | QueryFieldFilterConstraint)[] = [];

    console.log('query posts', authors,type, promt );

    queryConstraints.push(orderBy('createdAt', 'desc'));
    if (type === 'f') {
        const followersQuery = query(collection(firestore, 'relations'), where('follower', '==', userDoc(authors[0])));
        const follows = (await getDocs(followersQuery)).docs.map(d => d.data().followed);
        queryConstraints.push(where('author', 'in', follows));
    }
    else if (authors.length === 1) {
        queryConstraints.push(where('author', '==', userDoc(authors[0])));
    }

    if (type === 't') {
        queryConstraints.push(where('tags', 'array-contains', promt));
    }
    else if (type === 's') {
        queryConstraints.push(where('text', 'array-contains', promt)); // НЕ РАБОТАЕТ В FIRESTORE
    }

    let mainQuery = query(posts, ...queryConstraints, limit(10));
    const mainSnap = await getDocs(mainQuery);

    const promises: Promise<PostType | null>[] = [];
    mainSnap.forEach(d => promises.push(getPostById(d.id)));
    const result = (await Promise.all(promises)).filter(p => p !== null) as PostType[];
    console.log('RESULT', result);

    const createNextCallback = () => {
        let lastReaded = mainSnap.docs[mainSnap.docs.length - 1];
        let q = query(posts, ...queryConstraints, startAfter(lastReaded) , limit(10));

        return async () => {
            const insideSnap = await getDocs(q);
            const insidePromises: Promise<PostType | null>[] = [];
            insideSnap.forEach(d => insidePromises.push(getPostById(d.id)));
            const insideResult = (await Promise.all(insidePromises)).filter(p => p !== null) as PostType[];

            if (insideResult.length < 10) {
                return [insideResult, false] as const;
            }
            else {
                lastReaded = insideSnap.docs[insideSnap.docs.length - 1];
                q = query(posts, ...queryConstraints, startAfter(lastReaded) , limit(10));
                return [insideResult, true] as const;
            }
        };
    };

    const next = result.length > 0 ? createNextCallback() : () => Promise.resolve([[] as PostType[], false] as const);

    if (!listeners) {
        return [result, () => {}, next] as const;
    }

    const unsubscribe = addListener(mainQuery, change => getPostById(change.doc.id), listeners.addPost, listeners.removePost);
    return [result, () => unsubscribe(), next] as const;
}

export const filterPosts = async (self: string, location: string, query: string, promt: string, listeners: any) => {

    const parseLocation = () => {
        return location.split('/')[2];
    }

    const user = location === '/'
        ? []
        : [parseLocation()];

    if (query === 'f' && location === '/') {
        return await queryPostsWithListenerAndEndlessScroll([self], query, promt, listeners);
    }
    else {
        return await queryPostsWithListenerAndEndlessScroll(user, query, promt, listeners);
    }
}

export const createComment = async (postId: string, userId: string, text: string) => {
    try {
        const data = {
            post_id: doc(firestore, 'posts', postId),
            author: userDoc(userId),
            createdAt: serverTimestamp(),
            text,
        };

        const commentRef = await addDoc(collection(firestore, 'comments'), data);
        sendNotification('comment', userId, commentRef.id);

        const date = ((await getDoc(commentRef)).data() as FirestoreCommentDataType).createdAt.toDate();
        const user = await getLightUserById(data.author.id);
        if (!user) {
            throw new Error('Error while getting post data from Firestore');
        }

        return {
            id: commentRef.id,
            user,
            date,
            text: data.text,
        } as CommentType;
    }
    catch (err) {
        console.log('error in adding comment', err);
        return null;
    }
}

export const getComments = async (postId: string) => {
    const postRef = doc(firestore, 'posts', postId);
    const mainQuery = query(collection(firestore, 'comments'), where('post_id', '==', postRef));
    const snap = await getDocs(mainQuery);

    const promises = snap.docs.map(async comment => {
        const data = comment.data() as FirestoreCommentDataType;
        const user = await getLightUserById(data.author.id);
        if (!user) {
            throw new Error('Error while getting post data from Firestore');
        }

        return {
            id: comment.id,
            text: data.text,
            date: data.createdAt.toDate(),
            user,
        } as CommentType;
    });

    return await Promise.all(promises);
}

const getCommentByDoc = async (documnet: QueryDocumentSnapshot<DocumentData>) => {
    const data = documnet.data() as FirestoreCommentDataType;
    const user = await getLightUserById(data.author.id);
    if (!user) {
        throw new Error('Error while getting post data from Firestore');
    }

    return {
        id: documnet.id,
        text: data.text,
        date: data.createdAt?.toDate() ?? new Date(),
        user,
    } as CommentType;
}

export const getCommentsWithListener = async (postId: string, listeners: any) => {

    const postRef = doc(firestore, 'posts', postId);
    const mainQuery = query(collection(firestore, 'comments'), where('post_id', '==', postRef));
    const snapshot = await getDocs(mainQuery);
    const promises = snapshot.docs.map(async doc => await getCommentByDoc(doc));
    
    const result = await Promise.all(promises);

    if (!listeners) {
        return [result, () => {}] as const;
    }

    const unsubscribe = addListener(mainQuery, change => getCommentByDoc(change.doc), listeners.addComment, listeners.removeComment);

    return [result, () => unsubscribe()] as const;
}

const getPostByIdUncached = async (id: string) => {
    const docRef = doc(firestore, 'posts', id);
    const data = (await getDoc(docRef)).data() as FirestorePostDataType | undefined;
    if (!data) {
        return null;
    }

    const user = await getLightUserById(data.author.id);
    if (!user) {
        throw new Error('Error while getting post data from Firestore');
    }

    return {
        id,
        user,
        picture: data.picture,
        text: data.text,
        date: data.createdAt?.toDate() ?? new Date(),
        tags: data.tags,
    } as PostType;
}

export const getPostById = createCachedAsyncMethod(getPostByIdUncached);

const sendNotification = async (type: string, userId: string, targetId: string) => {
    let targetRef;
    let action;
    let interesting;
    switch (type) {
        case 'post':
            targetRef = doc(firestore, 'posts', targetId);
            interesting = `follower(${userId})`;
            action = 'createpost';
            break;
        case 'follow':
            targetRef = doc(firestore, 'users', targetId);
            interesting = targetId;
            action = 'follow';
            break;
        case 'unfollow':
            targetRef = doc(firestore, 'users', targetId);
            interesting = targetId;
            action = 'unfollow';
            break;
        case 'comment':
            targetRef = doc(firestore, 'comments', targetId);
            const postId = ((await getDoc(targetRef)).data() as FirestoreCommentDataType).post_id.id;
            interesting = ((await getDoc(doc(firestore, 'posts', postId))).data() as FirestorePostDataType).author.id;
            action = 'createcomment';
            break;
        default:
            throw new Error('Unknown type');
    }

    const data = {
        user_id: userDoc(userId),
        createdAt: serverTimestamp(),
        target: targetRef,
        action,
        interesting,
    };

    addDoc(collection(firestore, 'history'), data);
}

const getNotificationByDocument: (document: QueryDocumentSnapshot<DocumentData>) => Promise<NotificationType | null> = async (document: QueryDocumentSnapshot<DocumentData>) => {
    const data = document.data() as FirestoreHistoryDataType;
    const user = await getLightUserById(data.user_id.id);
    if (!user) {
        return null;
    }

    // 'createpost' 'follow' 'unfollow' 'createcomment'
    switch (data.action) {
        case 'createpost':
            return {
                id: document.id,
                user,
                date: data.createdAt?.toDate() ?? new Date(),
                description: '',
                type: 'newpost',
                target: `/post/${data.target.id}`
            };
        case 'follow':
            return {
                id: document.id,
                user,
                date: data.createdAt?.toDate() ?? new Date(),
                description: '',
                type: 'newfollow',
                target: null,
            };
        case 'unfollow':
            return {
                id: document.id,
                user,
                date: data.createdAt?.toDate() ?? new Date(),
                description: '',
                type: 'unfollow',
                target: null,
            };
        case 'createcomment':
            const targetRef = doc(firestore, 'comments', data.target.id);
            const commentData = (await getDoc(targetRef)).data() as FirestoreCommentDataType;

            return {
                id: document.id,
                user,
                date: data.createdAt?.toDate() ?? new Date(),
                description: commentData.text,
                type: 'newcomment',
                target: `/post/${commentData.post_id.id}`,
            }
        default:
            return null;
    }
}

export const getNotificationsWithListener = async (userId: string, listeners: any) => {
    const followersQuery = query(
        collection(firestore, 'relations'),
        where('follower', '==', userDoc(userId)));
    const follows = (await getDocs(followersQuery)).docs.map(d => `follower(${d.data().followed.id})`);
    follows.push(userId);

    const mainQuery = query(collection(firestore, 'history'), where('interesting', 'in', follows), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(mainQuery);
    const promises = snapshot.docs.map(async doc => await getNotificationByDocument(doc));
    
    const result = (await Promise.all(promises)).filter(n => n != null) as NotificationType[];

    if (!listeners) {
        return [result, () => {}] as const;
    }

    const unsubscribe = addListener(mainQuery, change => getNotificationByDocument(change.doc), listeners.addNotification, listeners.remvoeNotification);

    return [result, () => unsubscribe()] as const;
}

export const uploadImage = (image: any, folder: string, generateId?: boolean | undefined) => {
    return new Promise<string>((resolve, reject) => {
        const storageRef = generateId ? ref(storage, `${folder}${createId()}`) : ref(storage, `${folder}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed',
            (snapshot) => {

            },
            (error) => {
                console.log('error', error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    resolve(downloadURL);
                })
            });
    });
}

const userDoc = (id: string) => doc(firestore, 'users', id);
const relationDoc = (followed: string, follower: string) => doc(firestore, 'relations', relationIdGenerator(followed, follower));
const relationIdGenerator = (followed: string, follower: string) => `${followed}<${follower}`;

export default {
    uploadImage,
    getPostById,
    getComments,
    createComment,
    filterPosts,
    createPost,
    getAllUsers,
    getFollowingListWithListener,
    getFollowingList,
    getFollowersListWithListener,
    getFollowersList,
    removeFollowRelation,
    addFollowRelation,
    updateUser,
    createUser,
    hasUser,
    getLightUserById,
    getUserByIdWithListeners,
    getUserById,
    getUserByEmail,
    getCommentsWithListener,
    getNotificationsWithListener,

    //filterPostsTest
};