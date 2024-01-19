const fs = require("fs");
const path = require("path");

const updateList = (listFile, baseDirectory, sourceDirectory, fileType) => {
  try {
    const listFilePath = path.join(baseDirectory, listFile);
    const sourceDirPath = path.join(baseDirectory, sourceDirectory);

    // If the file doesn't exist, create an empty list
    if (!fs.existsSync(listFilePath)) {
      fs.writeFileSync(listFilePath, `exports.list = [];\n`, "utf-8");
    }

    // Read the current list file
    let itemList = require(listFilePath).list || [];

    // Read directory names in the source directory
    const itemDirectories = fs
      .readdirSync(sourceDirPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => {
        const item = {
          name: dirent.name,
          deep: [],
          purgerException: true,
        };

        // Add file property for pages
        if (fileType === "Pages") {
          item.file = path.join(sourceDirectory, dirent.name, "index.twig");
          item.deep = [];
          item.purgerException = false;
        }

        return item;
      });

    // Remove items for directories that no longer exist
    itemList = itemList.filter((existingItem) =>
      itemDirectories.some((newItem) => newItem.name === existingItem.name)
    );

    // Add new items to the list
    itemDirectories.forEach((item) => {
      const existingItem = itemList.find(
        (existing) => existing.name === item.name
      );
      if (!existingItem) {
        itemList.push(item);
      }
    });

    // Save the updated list to the list file
    fs.writeFileSync(
      listFilePath,
      `exports.list = ${JSON.stringify(itemList, null, 2)};\n`,
      "utf-8"
    );

    console.log(`${fileType} list updated successfully.`);
  } catch (error) {
    console.error(
      `Error during the update of the ${fileType} list:`,
      error.message
    );
  }
};

module.exports = { updateList };
