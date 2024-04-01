const scrollContactForm = function (event) {
  try {
    event.preventDefault();
    const elementContactForm = document.querySelector(
      `[data-component-handle="contactForm"]`
    );
    if (!elementContactForm) {
      return window.location.replace("/#contact");
    }
    return elementContactForm.scrollIntoView();
  } catch (Exception) {
    console.warn("Exception in scrollContactForm => " + Exception);
  }
};
window.scrollContactForm = scrollContactForm;
