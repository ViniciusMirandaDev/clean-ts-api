export interface Hasher {
  hash(key: string): Promise<string>
}
