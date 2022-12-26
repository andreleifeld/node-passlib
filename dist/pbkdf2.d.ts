export interface EncodeOptions {
    digest: string;
    rounds: number;
    salt: string;
}
export declare const reshapeBase64: (b64str: string) => string;
export declare const unshapeBase64: (b64str: string) => string;
export declare const extractDigest: (algorithm: string) => string;
export declare const decodeHash: (encodedHash: string) => {
    algorithm: string;
    digest: string;
    rounds: number;
    salt: string;
    hash: string;
};
export declare const encode: (password: string, { digest, rounds, salt }: EncodeOptions, keylen: number) => string;
export declare const build: (password: string, { digest, rounds, salt }: EncodeOptions, keylen: number) => string;
export declare const verify: (password: string, encodedHash: string, keylen?: number) => boolean;
