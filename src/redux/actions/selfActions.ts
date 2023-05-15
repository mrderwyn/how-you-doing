import { addFollow, removeFollow, setFollows } from "../slices/followSlice/slice";
import { setSelf, setToken, updateSelf } from "../slices/selfSlice/slice";
import { ArgumentType } from "../types";

export const updateUserInfo = (update: any) => async (dispatch: any, getState: any, extraArgument: ArgumentType) => {
    const { serviceApi } = extraArgument;
    await serviceApi.updateUser(getState().self.self.id, update);
    dispatch(updateSelf(update));
}

export const logIn = (email: string | null, token: any) => async (dispatch: any, getState: any, extraArgument: ArgumentType) => {
    if (email === null) {
        return;
    }

    const { serviceApi } = extraArgument;
    const user = await serviceApi.getUserByEmail(email);
    if (!user) {
        return;
    }

    const follows = await serviceApi.getFollowingList(user.id);
    dispatch(setToken({ token }));
    dispatch(setSelf({ user }));
    dispatch(setFollows(follows));
}