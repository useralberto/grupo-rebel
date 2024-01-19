const mix = require("laravel-mix");
const purgecss = require("@fullhuman/postcss-purgecss");
const components = require("../partials");
const fs = require("fs");

exports.sfpt_start = () => {
  const path = "templates/partials/";
  const path_out = "web/assets/";

  components.list.forEach((item) => {
    try {
      let { name, deep, purgerException } = item;
      let path_scss = `${path}${name}/src/style.scss`;
      let path_js = `${path}${name}/src/index.js`;
      const purgerArr = purgerException
        ? []
        : [
            purgecss({
              content: [`${path}${name}/index.twig`],
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
          `${path_out}css/partials/${name}.partials.css`,
          {},
          purgerArr
        );
      }
      if (fs.existsSync(path_js)) {
        mix.js(path_js, `${path_out}js/partials/${name}.partials.js`);
      }
    } catch (Exception) {
      console.warn(
        "Exception in compress Single Files partials => " + Exception
      );
    }
  });
};
