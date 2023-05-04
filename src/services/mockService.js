import users from '../mocks/usersMock.json';
import posts from '../mocks/feedMock.json';
import comments from '../mocks/commentsMock.json';

export const getUsers = () => users;

export const getUser = (id) => users.find(u => u.innerId === id || u.id === id);

export const getFullUserInfo = (userId, selfId) => {
    const { id, name, avatar, background, followers, follow } = users.find(u => u.id === userId);
    return selfId !== undefined
    ? {
        id, name, avatar, background, followers, follow, folowedBy: followers.includes(selfId),
    }
    : {
        id, name, avatar, background, followers, follow,
    };
}

export const getLightUserInfo = (userId, selfId) => {
    const { id, name, avatar, followers } = users.find(u => u.id === userId);
    return selfId !== undefined
    ? {
        id, name, avatar, folowedBy: followers.includes(selfId),
    }
    : {
        id, name, avatar,
    };
}

const extendPost = (post) => ({
    id: post.id,
    user: getUser(post.user_id),
    date: post.date,
    picture: post.picture,
    tags: post.tags,
    text: post.text,
});

export const filterPosts = (location, query, promt) => {
    const parseLocation = () => {
        const id = location.split('/')[2];
        return [p => p.user.id === id, getUser(id)];
    }

    const [userFilter, user] = location === '/'
        ? [p => true, getSelf()]
        : parseLocation();

    console.log(userFilter, user);

    const queryFilter = ((u) => {
        switch (query) {
            case 'f':
                return p => u.follow.includes(p.user.id);
            case 't':
                return p => p.tags.includes(promt);
            case 's':
                return p => p.text.includes(promt);
            default:
                return p => true;
        }
    })(user);

    const res = posts.reduce(
        (acc, post) => {
            const extended = extendPost(post);
            if (userFilter(extended) && queryFilter(extended)) {
                acc.push(extended);
            }

            return acc;
        },
        []
    );

    return res;
}

export const getPosts = () => {
    const result = posts.map(p => extendPost(p));

    return result;
};

export const getPost = (id) => {
    const p = posts.find(post => post.id == id);
    return extendPost(p);
};

export const getComments = (id) => {
    const result = comments
        .filter(c => c.feed_id == id)
        .map(c => ({
            id: c.id,
            user: getUser(c.user_id),
            date: c.date,
            text: c.text,
        }));

    return result;
};

export const getSelf = () => getUser(1);

export default {
    getUsers,
    getUser,
    getLightUserInfo,
    getFullUserInfo,
    getPosts,
    filterPosts,
    getPost,
    getComments,
    getSelf,
};