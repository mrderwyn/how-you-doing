import { addFollow, removeFollow, setFollows } from "../slices/followSlice/slice";
import { ArgumentType } from "../types";

export const followUser = (userId: any) => async (dispatch: any, getState: any, extraArgument: ArgumentType) => {
    const { serviceApi } = extraArgument;
    if (await serviceApi.addFollowRelation(userId, getState().self.self.id)) {
        dispatch(addFollow({ user: { id: userId }}));
    }
}

export const unfollowUser = (userId: any) => async (dispatch: any, getState: any, extraArgument: ArgumentType) => {
    const { serviceApi } = extraArgument;
    if (await serviceApi.removeFollowRelation(userId, getState().self.self.id)) {
        dispatch(removeFollow({ user: { id: userId }}));
    }
}

export const loadFollows = () => async (dispatch: any, getState: any, extraArgument: ArgumentType) => {
    const id = getState().self.self?.id;

    if (!id) {
        return;
    }

    const { serviceApi } = extraArgument;

    const follows = await serviceApi.getFollowingList(id);
    dispatch(setFollows(follows));
}