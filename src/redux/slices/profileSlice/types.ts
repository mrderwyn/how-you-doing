import { DetailedUserInfoType, LightUserInfoType } from "../../../types";

type ProfileType = {
    info: DetailedUserInfoType | null,
    follow: LightUserInfoType[],
    followers: LightUserInfoType[]
}

export type ProfileSliceType = {
    profile: ProfileType,
    loading: boolean
};