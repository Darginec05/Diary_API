import { Post } from "src/post/post.interface";

export interface UserDataResponse {
  posts: Post[],
  profile: Profile,
};

export interface Profile {
  username: string;
  bio?: string;
  avatar?: string;
}
