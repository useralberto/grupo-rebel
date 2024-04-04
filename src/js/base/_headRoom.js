import Headroom from "headroom.js";

let headroom;
const header = document.querySelector(".header");
const headerSpacer = document.querySelectorAll(".header-spacing");

const setHeaderSpacerHeight = function (height) {
  headerSpacer.forEach((i) => {
    i.style.height = `${height}px`;
  });
};

const init_Headroom = () => {
  try {
    if (!header) return;

    headroom = new Headroom(header, {
      offset: 100,
    });
    headroom.init();

    if (!headerSpacer.length > 0) return;

    window.onload = () => {
      setHeaderSpacerHeight(header.offsetHeight);
    };
    window.onresize = () => {
      setHeaderSpacerHeight(header.offsetHeight);
    };
  } catch (exc) {
    console.warn(`Exception in headroom => ${exc}`);
  }
};

init_Headroom();

const timeout = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const sideBar = document.querySelector("#sideBar");
if (sideBar) {
  const eventNavbar = async (event, element) => {
    try {
      event.preventDefault();
      const { state } = element.dataset;
      if (!state) return;
      if (state === "true") {
        element.dataset.state = "false";
        element.classList.remove("is-active");
        sideBar.classList.remove("v-show");
        sideBar.classList.add("v-hidden");
        await timeout(320);
        sideBar.classList.remove("v-hidden");
        headroom.unfreeze();
        sideBar.classList.add("d-none");
        document.body.removeAttribute("style");
      } else {
        document.body.setAttribute("style", "overflow:hidden;");
        sideBar.classList.remove("d-none");
        headroom.freeze();
        sideBar.classList.remove("v-hidden");
        element.classList.add("is-active");
        sideBar.classList.add("v-show");
        element.dataset.state = "true";
      }
    } catch (Exception) {
      console.warn("Exception in  => eventNavbar " + Exception);
    }
  };
  window.eventNavbar = eventNavbar;
}
