import { pbkdf2Sync } from 'crypto';

export interface EncodeOptions {
  digest: string;
  rounds: number;
  salt: string;
  hash: string;
}

export const reshapeBase64 = (b64str: string) => {
    const noPad = b64str.replace(/={1,2}$/, '');
    const noWs = noPad.replace(/=\n$/, '');
    const noPlus = noWs.replace('+', '.');
    return Buffer.from(noPlus).toString('ascii');
}

export const unshapeBase64 = (b64str: string) => {
  return b64str.replace('.', '+');
}

export const extractDigest = (algorithm: string) => {
  const dashIndex = algorithm.indexOf('-');
  if (dashIndex === -1) throw new Error('algorithm is not a pbkdf2 compatible value');
  return algorithm.substr(dashIndex+1);
};

export const decodeHash = (encodedHash: string) => {
  const [, algorithm, rounds, salt, hash] = encodedHash.split('$');
  return { 
    algorithm,
    digest: extractDigest(algorithm),
    rounds: parseInt(rounds),
    salt: Buffer.from(salt).toString('ascii'),
    hash: Buffer.from(hash).toString('ascii')
  };
}

export const encode = (password: string, { digest, rounds, salt, hash }: EncodeOptions, keylen: number) => {
  const encodedSalt = Buffer.from(unshapeBase64(salt), 'base64');
  const pbkdf2Buffer = pbkdf2Sync(password, encodedSalt, rounds, keylen, digest);
  const base64str = pbkdf2Buffer.toString('base64');
  return reshapeBase64(base64str);
};

export const verify = (password: string, encodedHash: string, keylen = 64) => {
  const { digest, rounds, salt, hash } = decodeHash(encodedHash);
  const encodedPassword = encode(password, { digest, rounds, salt, hash }, keylen);
  return hash === encodedPassword;
};