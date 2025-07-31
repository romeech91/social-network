export type Author = {
  _id: string,
  name: string,
  avatar?: string
}

export type Post = Author & {
  content: string,
  author: Author,
}