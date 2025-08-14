export namespace Notification {
  export type Item = {
    type: string;
    message: string;
  };

  export type Type = 'error' | 'attention' | 'success';
}