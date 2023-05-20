export interface CommentType {
  id: string
  user: LightUserInfoType
  date: Date
  text: string
}

export type DetailedUserInfoType = LightUserInfoType & {
  background: string
  description: string
}

export type FullUserInfoType = DetailedUserInfoType & {
  follow: LightUserInfoType[]
  followers: LightUserInfoType[]
}

export interface LightUserInfoType {
  id: string
  name: string
  avatar: string
}

export interface PostType {
  id: string
  user: LightUserInfoType
  date: Date
  picture: string
  text: string
  tags: string[]
}

export interface NotificationType {
  id: string
  type: string
  user: LightUserInfoType
  target: string | null
  description: string
  date: Date
}
