//Single Files Pages
const mix = require("laravel-mix");
const purgecss = require("@fullhuman/postcss-purgecss");
const fs = require("fs");
const pages = require("../pages.js");

exports.sfp_start = () => {
  const path_pages = "templates/pages/";
  const path_out_pages = "web/assets/";

  pages.list.forEach((item) => {
    try {
      const { page, customName, deep, purgerException, file } = item;
      const name = customName ? customName : `${page}`;
      const path_scss = `${path_pages}/${page}/src/${name}.scss`;
      const path_js = `${path_pages}/${page}/src/${name}.js`;
      const purgerArr = purgerException
        ? []
        : [
            purgecss({
              content: [`${path_pages}${file}`],
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
          `${path_out_pages}css/pages/${name}.page.css`,
          {},
          purgerArr
        );
      }
      if (fs.existsSync(path_js)) {
        mix.js(path_js, `${path_out_pages}js/pages/${name}.page.js`);
      }
    } catch (Exception) {
      console.warn("Exception in compress Single Files Pages => " + Exception);
    }
  });
};
