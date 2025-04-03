import { createHash } from 'crypto';

export async function calculateFileHash(buffer: Buffer): Promise<string> {
  const hash = createHash('sha256');
  hash.update(buffer);
  return hash.digest('hex');
}
