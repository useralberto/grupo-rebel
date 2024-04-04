const openChat = function () {
  try {
    BrevoConversations("openChat", true);
  } catch (Exception) {
    console.warn("Exception in openChat => " + Exception);
  }
};

document.addEventListener("click", function (event) {
  if (event.target.getAttribute("href") === "#openChat") {
    event.preventDefault();
    return openChat();
  }
});
