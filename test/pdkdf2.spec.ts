import * as expect from 'expect';
import {
  reshapeBase64,
  unshapeBase64,
  extractDigest,
  decodeHash,
  encode,
  verify
} from '../src/pbkdf2';

const encodedUnshapedHash =
  'rsXY0hlDBgPcAzgpdjXqvWbC/O+thC/BdLjjpeCR+b7cX8zw9RMMYcLmtA6ZS+FCg8zO3LoYdFPf6BF/09la5g';
const encodedReshapedHash =
  'rsXY0hlDBgPcAzgpdjXqvWbC/O.thC/BdLjjpeCR.b7cX8zw9RMMYcLmtA6ZS.FCg8zO3LoYdFPf6BF/09la5g';

const hashedPasslibPassword =
  '$pbkdf2-sha512$25000$eo.xdm4tBeAcA2AM4dwbQw$4eZGnh/1KaO1T6sYZ7xia3ennFqiBUXwJwymi1.Xz1TUpNG7I2hw4RUqo34ZTwu6JxdqvGkc1ZL6rRHjwJ0mrw';

describe('Running PDKDF2 tests', () => {
  const { algorithm, digest, rounds, salt, hash } = decodeHash(
    hashedPasslibPassword,
  );
  describe('reshapeBase64', () => {
    it('removes single `=` from base64 encoded string', () => {
      const b64str = 'ZHNmYWQgZmFkd3FlcjN0IHZ0NFclJSBCWSVFw5sgRVJTRyBzIGc=';
      const reshapedb64str = reshapeBase64(b64str);
      expect(reshapedb64str).toBe(
        'ZHNmYWQgZmFkd3FlcjN0IHZ0NFclJSBCWSVFw5sgRVJTRyBzIGc',
      );
    });
    it('removes double `=` from base64 encoded string', () => {
      const b64str = 'YSBzZGZzYVFFVCAky4ZZRUogRVJHIA==';
      const reshapedb64str = reshapeBase64(b64str);
      expect(reshapedb64str).toBe('YSBzZGZzYVFFVCAky4ZZRUogRVJHIA');
    });
    it('trims whitespace from base64 encoded string', () => {
      const b64str = 'YSBzZGZzYVFFVCAky4ZZRUogRVJHIA=\n';
      const reshapedb64str = reshapeBase64(b64str);
      expect(reshapedb64str).toBe('YSBzZGZzYVFFVCAky4ZZRUogRVJHIA');
    });
    it('replaces `+` by `.` in a base64 encoded string', () => {
      const reshapedb64str = reshapeBase64(encodedUnshapedHash);
      expect(reshapedb64str).toBe(encodedReshapedHash);
    });
  });
  describe('unshapeBase64', () => {
    it('replaces `.` by `+` in a base64 encoded string', () => {
      const unshapedb64str = unshapeBase64(encodedReshapedHash);
      expect(unshapedb64str).toBe(encodedUnshapedHash);
    });
  });
  describe('extractDigest', () => {
    it('extracts digest from PBKDF2 algorithm', () => {
      const algorithm = 'pbkgf2-sha512';
      const digest = extractDigest(algorithm);
      expect(digest).toBe('sha512');
    });
  });
  describe('decodeHash', () => {
    it('decodes algorithm from a PBKDF2-hash', () => {
      expect(algorithm).toBe('pbkdf2-sha512');
    });
    it('decodes digest from a PBKDF2-hash', () => {
      expect(digest).toBe('sha512');
    });
    it('decodes rounds from a PBKDF2-hash', () => {
      expect(rounds).toBe(25000);
    });
    it('decodes salt from a PBKDF2-hash', () => {
      expect(salt).toBe('eo.xdm4tBeAcA2AM4dwbQw');
    });
    it('decodes key from a PBKDF2-hash', () => {
      expect(hash).toBe(
        '4eZGnh/1KaO1T6sYZ7xia3ennFqiBUXwJwymi1.Xz1TUpNG7I2hw4RUqo34ZTwu6JxdqvGkc1ZL6rRHjwJ0mrw',
      );
    });
  });
  describe('encode', () => {
    it('encodes password to known hash', () => {
      const encodedPassword = encode('krassespasswort', { digest, rounds, salt }, 64);
      expect(encodedPassword).toBe(hash);
    });
  });
  describe('verify', () => {
    it('verifies password successfully', () => {
      const verified = verify('krassespasswort', hashedPasslibPassword);
      expect(verified).toBe(true);
    });
    it('fails on password verifification', () => {
      const verified = verify('wrongpassword', hashedPasslibPassword);
      expect(verified).toBe(false);
    });
  });
});
