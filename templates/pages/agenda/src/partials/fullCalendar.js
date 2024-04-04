import { Calendar, formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from "@fullcalendar/interaction";
import { openModal } from "./modal";

const agenda = document.querySelector("#agenda");
if (agenda) {
  const today = new Date();

  const mobileCheck = function () {
    if (window.innerWidth >= 768) {
      return false;
    } else {
      return true;
    }
  };

  const calendar = new Calendar(agenda, {
    plugins: [dayGridPlugin, listPlugin, interactionPlugin, timeGridPlugin],
    locale: esLocale,
    height: 680,
    longPressDelay: 0,
    initialView: `${mobileCheck() ? "timeGridWeek" : "dayGridMonth"}`,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: `${mobileCheck() ? "timeGridWeek" : "dayGridMonth"},listWeek`,
    },
    eventTimeFormat: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    },
    windowResize: function (view) {
      if (window.innerWidth >= 768) {
        calendar.changeView("dayGridWeek");
      } else {
        calendar.changeView("timeGridWeek");
      }
    },
    events: window.events || [],
    dateClick: function (info) {
      if (info.date < today.setHours(0, 0, 0, 0)) return;

      const eventsOnDay = calendar.getEvents().filter(function (event) {
        return event.start.toDateString() === info.date.toDateString();
      });

      const hasAllDayEvent = eventsOnDay.some((event) => event.allDay);

      if (hasAllDayEvent) return;

      const totalDuration = eventsOnDay.reduce(function (accumulator, event) {
        return accumulator + (event.end - event.start);
      }, 0);

      const durationLimit = 8 * 60 * 60 * 1000;

      if (totalDuration >= durationLimit) return;

      const dateInfo = formatDate(info.date, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        locale: "es",
      });

      return openModal({
        dateInfo,
        date: info.date.toISOString().slice(0, 10),
      });
    },
  });
  calendar.render();
}
