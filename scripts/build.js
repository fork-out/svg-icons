const fs = require("fs").promises;
const camelcase = require("camelcase");
const svgr = require("@svgr/core").default;
const babel = require("@babel/core");
const { promisify } = require("util");
const rimraf = promisify(require("rimraf"));

const transform = async (svg, componentName, format) => {
  const component = await svgr(svg, { icon: true }, { componentName });
  const { code } = await babel.transformAsync(component, {
    plugins: [[require("@babel/plugin-transform-react-jsx"), { useBuiltIns: true }]]
  });

  if (format === "esm") {
    return code;
  }

  return code
    .replace('import * as React from "react"', 'const React = require("react")')
    .replace("export default", "module.exports =");
};

async function getIcons() {
  const files = await fs.readdir(`./optimized`);
  return Promise.all(
    files.map(async file => ({
      svg: await fs.readFile(`./optimized/${file}`, "utf8"),
      componentName: `Icon${camelcase(file.replace(/\.svg$/, ""), {
        pascalCase: true
      })}`
    }))
  );
}

function exportAll(icons, format, includeExtension = true) {
  return icons
    .map(({ componentName }) => {
      const extension = includeExtension ? ".js" : "";
      if (format === "esm") {
        return `export { default as ${componentName} } from './${componentName}${extension}'`;
      }
      return `module.exports.${componentName} = require("./${componentName}${extension}")`;
    })
    .join("\n");
}

async function buildIcons(dir, format) {
  const outDir = format === "esm" ? `./${dir}/esm` : `./${dir}`;

  await fs.mkdir(outDir, { recursive: true });

  const icons = await getIcons();

  await Promise.all(
    icons.flatMap(async ({ componentName, svg }) => {
      const content = await transform(svg, componentName, format);
      const types = `import * as React from 'react';\ndeclare function ${componentName}(props: React.ComponentProps<'svg'>): JSX.Element;\nexport default ${componentName};\n`;

      return [
        fs.writeFile(`${outDir}/${componentName}.js`, content, "utf8"),
        ...(types ? [fs.writeFile(`${outDir}/${componentName}.d.ts`, types, "utf8")] : [])
      ];
    })
  );

  await fs.writeFile(`${outDir}/index.js`, exportAll(icons, format), "utf8");

  await fs.writeFile(`${outDir}/index.d.ts`, exportAll(icons, "esm", false), "utf8");
}

function main() {
  console.log(`Building icons package...`);

  Promise.all([rimraf(`./lib/*`)])
    .then(() =>
      Promise.all([
        buildIcons("lib", "esm"),
        buildIcons("lib", "cjs"),
        fs.writeFile(`./lib/package.json`, `{"module": "./esm/index.js"}`, "utf8"),
        fs.writeFile(`./lib/esm/package.json`, `{"type": "module"}`, "utf8")
      ])
    )
    .then(() => console.log(`Finished building icons package.`));
}

main();
