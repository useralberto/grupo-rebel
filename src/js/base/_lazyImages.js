const getImgsLazy = function () {
  const imgsLazy = document.querySelector(".lazyload");
  if (!imgsLazy) return;
  const lazyLoadInstance = new LazyLoad({
    container: document.querySelector("body"),
    elements_selector: ".lazyload",
  });
  lazyLoadInstance.update();
};

getImgsLazy();
