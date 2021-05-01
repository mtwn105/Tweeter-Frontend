export interface Tweet {
  tweetId: string;
  userId: string;
  text: string;
  userLikes: string[];
  replies: Tweet[];
  createdDate: Date;
}