import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const extensions = ["js", "jsx", "ts", "tsx", "mjs"];
import pkg from "./package.json" assert { type: "json" };

const config = [
  {
    input: "./src/index.ts",
    output: [
      {
        dir: "./dist",
        format: "cjs",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      {
        file: pkg.module,
        format: "es",
      },
      {
        name: pkg.name,
        file: pkg.browser,
        format: "umd",
      },
    ],
    plugins: [
      nodeResolve({ extensions }),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      babel({
        exclude: ["node_modules/**"],
        extensions,
        include: ["src/**/*"],
      }),
      commonjs(),
      peerDepsExternal(),
      postcss({
        extract: false,
        inject: (cssVariableName) =>
          `import styleInject from 'style-inject';styleInject(${cssVariableName});`,
        modules: true,
        sourceMap: false,
        use: ["sass"],
      }),
    ],
  },
];
export default config;