const mix = require("laravel-mix");
const purgecss = require("@fullhuman/postcss-purgecss");
const components = require("../components");
const fs = require("fs");

exports.sfc_start = () => {
  const path_components = "templates/components/";
  const path_out_componets = "web/assets/";

  components.list.forEach((item) => {
    try {
      let { name, deep, purgerException } = item;
      let path_scss = `${path_components}${name}/src/style.scss`;
      let path_js = `${path_components}${name}/src/index.js`;
      const purgerArr = purgerException
        ? []
        : [
            purgecss({
              content: [`${path_components}${name}/index.twig`],
              defaultExtractor: (content) =>
                content.match(/[\w-/.:]+(?<!:)/g) || [],
              safelist: {
                deep: deep,
              },
            }),
          ];

      if (fs.existsSync(path_scss)) {
        mix.sass(
          path_scss,
          `${path_out_componets}css/components/${name}.component.css`,
          {},
          purgerArr
        );
      }
      if (fs.existsSync(path_js)) {
        mix.js(
          path_js,
          `${path_out_componets}js/components/${name}.component.js`
        );
      }
    } catch (Exception) {
      console.warn("Exception in compress Single Files Pages => " + Exception);
    }
  });
};
