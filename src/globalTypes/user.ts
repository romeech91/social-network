export type UserPublic = {
  _id: string,
  name: string,
  avatar: string
}

export type User = UserPublic & {
  mail: string,
  phone: string,
  linkedUserIds: string[],
}
