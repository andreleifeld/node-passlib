# node-passlib
Generate and verify python-passlib compatible PBKDF2 hashes.

This module provides a verification function to verify python-passlibs (https://passlib.readthedocs.io/) encoded PBKDF2-hashes.
Tested with passlib 1.7.4 and PBKDF2-SHA512 algorithm.

## Installation

```
$ npm install node-passlib
```

## Usage

```typescript
import { verify } from 'node-passlib';

// python-passlib PBKDF2-SHA512 hash
const pbkdf2Hash = '$pbkdf2-sha512$25000$JKSU8r63VgrBmHMO4RwjRA$bUL/owmBl8slaj.fjONmdRijzOs4Lo6EwbKtoA6EPX1hs1BCdg3JRjfkR3WX5/mZ4cIhtJhFVFxrLlq1lHfpQw';

verify('yourpassword', pbkdf2Hash);
// true

verify('wrongpassword', pbkdf2Hash);
// false
```

Passlib 1.7.4 default algorithm is `pbkdf2_sha512` with a `keylen` of 64 for the `SHA512` digest. If you want to verify a different algorithm you may have to specify the `keylen`.

```typescript
const sha256Hash = '$pbkdf2-sha256$29000$49wbQyil1JqTcs7Z23tvTQ$EqGpkZH6Gb2ZE92/VY7B1uuO.CUR8xc4bU.TNsDIekI';
verify('yourpassword', sha256Hash, 32);
```

## Disclaimer

Using this lib is not as save as passlib itself. Passlib does way more security stuff like preventing timing attacks in the `verify` method. It's not recommended to use this lib in production if you are not aware of the risk.