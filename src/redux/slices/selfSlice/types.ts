import { DetailedUserInfoType } from "../../../types";

export type SelfStateType = {
    self: DetailedUserInfoType | null;
    token: string;
}