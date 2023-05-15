import { setProfile, updateProfilePeoples } from "../slices/profileSlice/slice";
import { ArgumentType } from "../types";

let clearUserListener = () => {};
export const fetchProfile = (id: any) => async (dispatch: any, getState: any, extraArgument: ArgumentType) => {
    clearUserListener();

    const { serviceApi } = extraArgument;
    const answer = await serviceApi.getUserByIdWithListeners(id, getState().self.self.id, {
        addFollower: (user: any) => {
            dispatch(updateProfilePeoples({ type: 'addFollower', user }));
        },
        removeFollower: (user: any) => {
            dispatch(updateProfilePeoples({ type: 'removeFollower', user }));
        },
        addFollowed: (user: any) => {
            dispatch(updateProfilePeoples({ type: 'addFollowed', user }));
        },
        removeFollowed: (user: any) => {
            dispatch(updateProfilePeoples({ type: 'removeFollowed', user }));
        },
    });

    if (answer === null) {
        return;
    }

    const [profile, unsubscribe] = answer;

    clearUserListener = () => unsubscribe();
    dispatch(setProfile({ user: profile }));
};

export const stopListenProfile = () => {
    clearUserListener();
}