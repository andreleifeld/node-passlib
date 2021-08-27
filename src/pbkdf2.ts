import { pbkdf2Sync } from 'crypto';

export interface EncodeOptions {
  digest: string;
  rounds: number;
  salt: string;
}

export const reshapeBase64 = (b64str: string) => {
  const noWs = b64str.trim();
  const noPad = noWs.replace(/={1,2}$/, '');
  const noPlus = noPad.replace(/\+/g, '.');
  return Buffer.from(noPlus).toString('ascii');
};

export const unshapeBase64 = (b64str: string) => {
  return b64str.replace(/\./g, '+').trim();
};

export const extractDigest = (algorithm: string) => {
  const dashIndex = algorithm.indexOf('-');
  if (dashIndex === -1)
    throw new Error('algorithm is not a pbkdf2 compatible value');
  return algorithm.substr(dashIndex + 1);
};

export const decodeHash = (encodedHash: string) => {
  const [, algorithm, rounds, salt, hash] = encodedHash.split('$');
  return {
    algorithm,
    digest: extractDigest(algorithm),
    rounds: parseInt(rounds),
    salt: Buffer.from(salt).toString('ascii'),
    hash: Buffer.from(hash).toString('ascii'),
  };
};

export const encode = (
  password: string,
  { digest, rounds, salt }: EncodeOptions,
  keylen: number,
) => {
  const encodedSalt = Buffer.from(unshapeBase64(salt), 'base64');
  const pbkdf2Buffer = pbkdf2Sync(
    password,
    encodedSalt,
    rounds,
    keylen,
    digest,
  );
  const base64str = pbkdf2Buffer.toString('base64');
  return reshapeBase64(base64str);
};

export const build = (
  password: string,
  { digest, rounds, salt }: EncodeOptions,
  keylen: number,
) => {
  const hash = encode(password, { digest, rounds, salt }, keylen);
  return [`$pbkdf2-${digest}`, rounds, salt, hash].join('$');
};

export const verify = (password: string, encodedHash: string, keylen = 64) => {
  const { digest, rounds, salt, hash } = decodeHash(encodedHash);
  const encodedPassword = encode(password, { digest, rounds, salt }, keylen);
  return hash === encodedPassword;
};
