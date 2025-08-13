export type Post = {
  content: string,
  author: {
    _id: string,
    name: string,
    avatar?: string
  },
}