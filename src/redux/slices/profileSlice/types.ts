import { type DetailedUserInfoType, type LightUserInfoType } from '../../../types'

interface ProfileType {
  info: DetailedUserInfoType | null
  follow: LightUserInfoType[]
  followers: LightUserInfoType[]
}

export interface ProfileSliceType {
  profile: ProfileType
  loading: boolean
}
