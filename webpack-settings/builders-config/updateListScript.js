const { updateList } = require("./updateList");
updateList(
  "../components.js",
  __dirname,
  "../../templates/components",
  "Components"
);
updateList("../partials.js", __dirname, "../../templates/partials", "Partials");

//The process needs to be reviewed and the bug for pages such as categories and entry within the same directory needs to be revised.
//updateList("../pages.js", __dirname, "../../templates/pages", "Pages");
