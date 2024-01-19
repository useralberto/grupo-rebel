const mix = require("laravel-mix");
const purgecss = require("@fullhuman/postcss-purgecss");
const optionsApp = [];

if (mix.inProduction()) {
  optionsApp.push(
    purgecss({
      content: ["templates/**/*.twig"],
      defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
      safelist: {
        deep: [
          /swiper-pagination*/,
          /headroom*/,
          /collapse*/,
          /show*/,
          /is-invalid*/,
          /col*/,
          /p-*/,
          /m-*/,
          /v-show/,
          /v-hidden/,
          /custom__accordions/,
        ],
      },
    })
  );
}

exports.bfb_start = () => {
  mix
    .sass(
      "src/vendors/bootstrap/bootstrap.scss",
      "web/assets/css",
      {},
      optionsApp
    )
    .js("src/vendors/bootstrap/bootstrap.js", "web/assets/js");

  mix
    .sass("src/scss/app.scss", "web/assets/css", {}, optionsApp)
    .js("src/js/app.js", "web/assets/js");

  ["base/base"].forEach((item) => {
    mix.sass(`src/scss/${item}.scss`, "web/assets/css");
  });
};
