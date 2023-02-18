import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import clear from "rollup-plugin-clear";
import { terser } from "rollup-plugin-terser";
import svgr from '@svgr/rollup'


const extensions = ["js", "jsx", "ts", "tsx", "mjs", "svg"];
import pkg from "./package.json" assert { type: "json" };

const config = [
  {
    input: "./src/index.ts",
    output: [
      {
        file: "dist/" + pkg.main,
        format: "cjs",
        exports: "auto",
      },
      {
        file: "dist/" + pkg.module,
        format: "esm",
        exports: "auto",
      },
    ],
    plugins: [
      clear({ targets: ["dist"] }),
      nodeResolve({ extensions }),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      commonjs(),
      terser(),
      svgr({
        svgoConfig: {
          plugins: []
        }
      })
    ],
    external: ['react', 'react-dom']
  },
];
export default config;
