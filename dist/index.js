'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var crypto = require('crypto');

const reshapeBase64 = (b64str) => {
    const noWs = b64str.trim();
    const noPad = noWs.replace(/={1,2}$/, '');
    const noPlus = noPad.replace(/\+/g, '.');
    return Buffer.from(noPlus).toString('ascii');
};
const unshapeBase64 = (b64str) => {
    return b64str.replace(/\./g, '+').trim();
};
const extractDigest = (algorithm) => {
    const dashIndex = algorithm.indexOf('-');
    if (dashIndex === -1)
        throw new Error('algorithm is not a pbkdf2 compatible value');
    return algorithm.substr(dashIndex + 1);
};
const decodeHash = (encodedHash) => {
    const [, algorithm, rounds, salt, hash] = encodedHash.split('$');
    return {
        algorithm,
        digest: extractDigest(algorithm),
        rounds: parseInt(rounds),
        salt: Buffer.from(salt).toString('ascii'),
        hash: Buffer.from(hash).toString('ascii'),
    };
};
const encode = (password, { digest, rounds, salt }, keylen) => {
    const encodedSalt = Buffer.from(unshapeBase64(salt), 'base64');
    const pbkdf2Buffer = crypto.pbkdf2Sync(password, encodedSalt, rounds, keylen, digest);
    const base64str = pbkdf2Buffer.toString('base64');
    return reshapeBase64(base64str);
};
const build = (password, { digest, rounds, salt }, keylen) => {
    const hash = encode(password, { digest, rounds, salt }, keylen);
    return [`$pbkdf2-${digest}`, rounds, salt, hash].join('$');
};
const verify = (password, encodedHash, keylen = 64) => {
    const { digest, rounds, salt, hash } = decodeHash(encodedHash);
    const encodedPassword = encode(password, { digest, rounds, salt }, keylen);
    return hash === encodedPassword;
};

var index = { verify, build, encode };

exports.build = build;
exports.default = index;
exports.encode = encode;
exports.verify = verify;
//# sourceMappingURL=index.js.map
