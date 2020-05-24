export interface Post {
  id: string;
  title?: string | null;
  text: string;
  image_uri?: string | null;
  isAnonym?: boolean;
};

export interface PostAuthor {
  id: string;
  username: string;
};

export interface PostResponse extends Post {
  author: PostAuthor;
};