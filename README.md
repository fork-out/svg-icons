# SVG icons

## Getting started with icons

[SVGR](https://react-svgr.com/) is used to generate the icons from svg files, provides a simple way to optimise svg files and use them in your application.

Follow the following step to add a new icon to your application:

1. Create a new svg file in the `svgs` directory.
2. Naming the file should be the same as the icon name excluding icon prefix. e.g. if you want to add a new icon named `<IconFacebook />` then the file name should be `facebook.svg`.
3. Run `build` command in icons directory to generate the icon component.
4. Add the icon component to your application.

## Icons Showcase

[ViteJS](https://vitejs.dev/) is used to generate the icons showcase page.

1. Run `npm run build:icons` to generate the icons that will be used by the showcase page.
2. Run `npm run dev` to start the server and open the page in your browser.

### Search Icons n the Showcase

1. Go to `data/tags.ts` and add the new icon name along with the `tags` array.
2. If you want to display icon as "new", just add `new` in the `tags` array.
3. e.g. `'facebook' : ["faang", "social", "new"]` icon will be displayed as "new" in the showcase page.
