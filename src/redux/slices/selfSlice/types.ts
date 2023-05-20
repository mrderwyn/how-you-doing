import { type DetailedUserInfoType } from '../../../types'

export interface SelfStateType {
  self: DetailedUserInfoType | null
  token: string
}
