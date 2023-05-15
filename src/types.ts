export type CommentType = {
    id: string,
    user: LightUserInfoType,
    date: Date,
    text: string
};

export type DetailedUserInfoType = LightUserInfoType & {
    background: string,
    description: string,
    followedBy?: boolean
}

export type FullUserInfoType = DetailedUserInfoType & {
    follow: LightUserInfoType[],
    followers: LightUserInfoType[],
};

export type LightUserInfoType = {
    id: string,
    name: string,
    avatar: string
};

export type PostType = {
    id: string,
    user: LightUserInfoType,
    date: Date,
    picture: string,
    text: string,
    tags: string[]
};

export type NotificationType = {
    id: string,
    type: string,
    user: LightUserInfoType,
    target: string | null,
    description: string,
    date: Date,
};