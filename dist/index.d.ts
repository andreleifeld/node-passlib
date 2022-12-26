import { verify, build, encode } from './pbkdf2';
export { verify, build, encode };
declare const _default: {
    verify: (password: string, encodedHash: string, keylen?: number) => boolean;
    build: (password: string, { digest, rounds, salt }: import("./pbkdf2").EncodeOptions, keylen: number) => string;
    encode: (password: string, { digest, rounds, salt }: import("./pbkdf2").EncodeOptions, keylen: number) => string;
};
export default _default;
