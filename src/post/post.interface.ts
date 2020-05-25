export interface Post {
  id: string;
  title?: string | null;
  text: string;
  image_uri?: string | null;
  isAnonym?: boolean;
  created_at: Date;
  updated_at: Date;
};

export interface PostAuthor {
  id: string;
  username: string;
};

export interface PostResponse extends Post {
  author: PostAuthor;
};