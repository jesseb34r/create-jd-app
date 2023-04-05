import { withPackages } from "~helpers/packages";
import type { IInstaller } from "~types";

const config: IInstaller = (ctx) => {
  return {
    pkgs: withPackages({
      normal: ["@prpc/solid", "@prpc/vite", "@tanstack/solid-query"],
    }),
    files: [
      {
        path: `${__dirname}/utils/getQueries`,
        type: "exec",
        to: `${ctx.userDir}/src/server/queries.ts`,
      },
      !ctx.installers.includes("AuthJS")
        ? {
            path: `${__dirname}/files/root.txt`,
            to: `${ctx.userDir}/src/root.tsx`,
          }
        : undefined,
    ],
  };
};

export default config;
