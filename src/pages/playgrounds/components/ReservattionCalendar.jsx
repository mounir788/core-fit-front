import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // For drag/drop or click

export default function ReservationCalendar({ reservations }) {
  // Transform your reservations data into FullCalendar events
  const events = reservations.flatMap((res) =>
    res.slots.map((slot) => {
      const start = new Date(`${res.date}T${slot}`);
      // Example: assume each slot is 1 hour long
      const end = new Date(start);
      end.setHours(end.getHours() + 1);

      return {
        id: `${res.id}-${slot}`,
        title: `${res.playgroundName} ${res.cancelled ? "(Cancelled)" : ""}`,
        start,
        end,
        backgroundColor: res.cancelled
          ? "#e74c3c"
          : res.ended
          ? "#95a5a6"
          : "var(--mainColor)",
        borderColor: "transparent",
        textColor: "#fff",
      };
    })
  );

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek" // Or "dayGridMonth"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      events={events}
      eventDisplay="block"
      height="auto"
    />
  );
}
