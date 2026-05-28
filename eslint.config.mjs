import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // HeroScene uses React Three Fiber which requires imperative mutation of
  // Three.js objects (uniforms, camera, scene, clipPlane) inside useFrame.
  // Buffer attribute refs are also initialised inside useMemo (synchronous,
  // avoiding the useEffect timing race where useFrame fires before the effect).
  // These are all correct R3F patterns — not React state bugs.
  {
    files: ["components/HeroScene.tsx"],
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
    },
  },
]);

export default eslintConfig;
