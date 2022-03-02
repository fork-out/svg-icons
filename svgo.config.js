module.exports = {
  js2svg: {
    indent: 2, // string with spaces or number of spaces. 4 by default
    pretty: true // boolean, false by default
  },
  plugins: [
    { name: "cleanupIDs", params: { active: true } },
    { name: "convertStyleToAttrs", params: { active: true } },
    { name: "cleanupEnableBackground", params: { active: true } },
    {
      name: "sortAttrs",
      params: {
        xmlnsOrder: "alphabetical"
      }
    },
    {
      name: "removeAttrs",
      params: {
        attrs: "fill"
      }
    },
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [
          {
            fill: "currentColor"
          }
        ]
      }
    }
  ]
};
