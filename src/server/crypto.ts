import crypto from 'node:crypto'

const LETTER_BYTES = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const AES_BLOCK_SIZE = 16

/**
 * Derives a 32-byte AES key from a string by repeating it with "|||" separator.
 * Matches Go: GetKeyFromUserEmail
 */
export function getKeyFromUserEmail(email: string): Buffer {
  let result = ''
  for (let i = 0; i < 32; i++) {
    if (result.length > 32) break
    result = result + '|||' + email
  }
  return Buffer.from(result.substring(0, 32), 'utf-8')
}

/**
 * Pads data to blockSize using SPACE (0x20), NOT standard PKCS5/PKCS7.
 * Matches Go: PKCS5Padding
 */
export function pkcs5Padding(data: Buffer, blockSize: number): Buffer {
  const padding = blockSize - (data.length % blockSize)
  const padBuffer = Buffer.alloc(padding, 0x20)
  return Buffer.concat([data, padBuffer])
}

/**
 * AES-256-CFB encryption with random 16-byte IV prepended to ciphertext.
 * Matches Go: Encrypt
 */
export function encrypt(key: Buffer, plaintext: Buffer): Buffer {
  const padded = pkcs5Padding(plaintext, AES_BLOCK_SIZE)
  const iv = crypto.randomBytes(AES_BLOCK_SIZE)
  const cipher = crypto.createCipheriv('aes-256-cfb', key, iv)
  const encrypted = Buffer.concat([cipher.update(padded), cipher.final()])
  return Buffer.concat([iv, encrypted])
}

/**
 * AES-256-CFB decryption where IV is the first 16 bytes of the ciphertext.
 * Matches Go: Decrypt
 */
export function decrypt(key: Buffer, ciphertext: Buffer): string {
  if (ciphertext.length < AES_BLOCK_SIZE) {
    throw new Error('ciphertext block size is too short')
  }
  const iv = ciphertext.subarray(0, AES_BLOCK_SIZE)
  const data = ciphertext.subarray(AES_BLOCK_SIZE)
  const decipher = crypto.createDecipheriv('aes-256-cfb', key, iv)
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()])
  return decrypted.toString('utf-8')
}

/**
 * SHA-256 hash of a string, returned as hex.
 * Matches Go: Sha256Encode
 */
export function sha256Encode(pwd: string): string {
  return crypto.createHash('sha256').update(pwd, 'utf-8').digest('hex')
}

/**
 * Generate a random alphanumeric string of length n.
 * Matches Go: RandStringBytesMask
 */
export function randString(n: number): string {
  const bytes = crypto.randomBytes(n * 2)
  let result = ''
  let i = 0
  let byteIdx = 0
  while (i < n && byteIdx < bytes.length) {
    const idx = bytes[byteIdx] & 0x3f // 6-bit mask (letterIdxMask)
    if (idx < LETTER_BYTES.length) {
      result += LETTER_BYTES[idx]
      i++
    }
    byteIdx++
  }
  // If we ran out of random bytes (very unlikely), fill remaining
  while (result.length < n) {
    const extra = crypto.randomBytes(1)
    const idx = extra[0] & 0x3f
    if (idx < LETTER_BYTES.length) {
      result += LETTER_BYTES[idx]
    }
  }
  return result
}

/**
 * Constructs a full image URL from an S3 domain and object key.
 * Matches Go: EncodeImageURL
 */
export function encodeImageURL(domain: string, key: string): string {
  return `${domain}/${key}`
}
