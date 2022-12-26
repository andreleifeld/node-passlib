import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
/* eslint-disable import/no-anonymous-default-export */
import typescript from '@rollup/plugin-typescript';

export default {
  input: ['src/index.ts'],
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'named',
    sourcemap: true,
  },
  plugins: [typescript(), nodeResolve(), commonjs()],
};
