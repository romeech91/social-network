export namespace Notification {
  export type Type = 'error' | 'info' | 'success' | 'warn';

  export type Item = {
    type: Type;
    message: string;
    title: string;
    id?: string
  };
}