const form = document.querySelector("#agendaForm");
if (form) {
  try {
    form.addEventListener("freeform-ajax-success", function (event) {
      const { submissionId } = event.response;
      if (!submissionId) return;
      window.location.reload();
    });
  } catch (Exception) {
    console.warn("Exception in form => " + Exception);
  }
}
