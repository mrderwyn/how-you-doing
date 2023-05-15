import { PostType } from "../../../types";

export type PostsSliceType = {
    posts: PostType[] | null,
    loadNext: null | (() => Promise<readonly [PostType[], false] | readonly [PostType[], true] | undefined>),
    hasNext: boolean,
}