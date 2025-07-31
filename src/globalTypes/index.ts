export namespace Notification {
  export type Item = {
    type: string;
    message: string;
  };

  export type Type = 'error' | 'attention' | 'success';
}

export type User = {
  id: string,
  name: string,
  mail: string,
  phone: string,
  linkedUserIds: string[],
  avatar: string
}
