const openModal = function (data = {}) {
  try {
    const { date, dateInfo } = data;
    const modal = document.querySelector("#modalAgenda");
    const fieldDate = modal.querySelector(`[name="dateEvent"]`);
    const fieldDateInfo = modal.querySelector(`[name="dateEventInfo"]`);

    if (!modal || !fieldDate || !fieldDateInfo || !date || !dateInfo) return;

    fieldDate.setAttribute("value", date);
    fieldDateInfo.setAttribute("value", dateInfo);

    modal.removeAttribute("style");
    modal.classList.remove("d-none");
  } catch (Exception) {
    console.warn("Exception in openModal => " + Exception);
  }
};

export { openModal };
