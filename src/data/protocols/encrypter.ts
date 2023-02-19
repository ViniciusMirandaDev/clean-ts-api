export interface Encrypter {
  encrypt(key: string): Promise<string>
}
