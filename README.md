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
import nodePasslib from 'node-passlib';

// python-passlib PBKDF2-SHA512 hash
const pbkdf2Hash = '$pbkdf2-sha512$25000$JKSU8r63VgrBmHMO4RwjRA$bUL/owmBl8slaj.fjONmdRijzOs4Lo6EwbKtoA6EPX1hs1BCdg3JRjfkR3WX5/mZ4cIhtJhFVFxrLlq1lHfpQw';

nodePasslib.verify('yourpassword', pbkdf2Hash);
// true

nodePasslib.verify('wrongpassword', pbkdf2Hash);
// false
```
