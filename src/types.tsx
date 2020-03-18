export type Sort = 'top' | 'new' | 'hot' | 'controversial';

export interface PicturePost {
  id: string;
  title: string;
  created: number;
  thumbnail: string;
  thumbnail_width: number;
  thumbnail_height: number;
  num_comments: number;
  score: number;
  author: string;
  permalink: string;
}
