const { updateList } = require("./updateList");
updateList(
  "../components.js",
  __dirname,
  "../../templates/components",
  "Components"
);
updateList("../partials.js", __dirname, "../../templates/partials", "Partials");
updateList("../pages.js", __dirname, "../../templates/pages", "Pages");
