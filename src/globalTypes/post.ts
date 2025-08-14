export type Post = {
  content: string,
  _id: string,
  author: {
    _id: string,
    name: string,
    avatar?: string
  },
}