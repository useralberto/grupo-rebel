const convertTime12to24 = function (time12h) {
  const match = time12h.match(/^(\d+):(\d+) (AM|PM)$/);
  if (!match) return null;

  let [_, hours, minutes, period] = match;
  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const startTimeInput = document.getElementById("form-input-startTime");
const endTimeInput = document.getElementById("form-input-endTime");

if (startTimeInput && endTimeInput) {
  startTimeInput.addEventListener("change", function () {
    try {
      const endTimePicker = endTimeInput._flatpickr;
      const startTimeSelected = startTimeInput.value;
      const time24 = convertTime12to24(startTimeSelected);
      endTimePicker.set("minTime", time24);
      endTimePicker.setDate(time24, true);
      return;
    } catch (Exception) {
      console.warn("Exception in startTimeInput(Change) => " + Exception);
    }
  });
}
