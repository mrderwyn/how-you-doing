import { CommentType, PostType } from "../../../types";

type PostDetailsType = {
    post: PostType | null,
    comments: CommentType[],
};

export type PostDetailsSliceType = {
    postDetails: PostDetailsType,
    loading: boolean,
};