export function encrypt(str: string): string {
  return btoa(str);
}

export function decrypt(str: string): string {
  return atob(str);
}
