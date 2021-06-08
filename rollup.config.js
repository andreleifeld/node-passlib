/* eslint-disable import/no-anonymous-default-export */
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: ['src/index.ts'],
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'named',
  },
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs(),
  ],
};
