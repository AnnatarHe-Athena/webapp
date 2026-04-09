// Note: Image decryption is done client-side for display
// The server encrypts image URLs with AES-CFB using user email-derived key
// For the webapp rewrite, we'll handle this via a proxy endpoint or
// pass the decryption to a server action

export function decodeBase64(str: string): Uint8Array {
  const binary = atob(str)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}
