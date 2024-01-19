/*
 * Content:
 * - Build Files Bases
 * - Single Files Pages
 * - Single Files Components
 * - Single Files Partials
 */

const bfb = require("./webpack-settings/builders-config/build-files-bases");
const sfp = require("./webpack-settings/builders-config/single-files-pages");
const sfc = require("./webpack-settings/builders-config/single-files-components");
const sfpt = require("./webpack-settings/builders-config/single-files-partials");

// Build Files Bases
bfb.bfb_start();

//Single Files Components

sfc.sfc_start();

//Single Files Partials
sfpt.sfpt_start();

//Single Files Pages
sfp.sfp_start();
