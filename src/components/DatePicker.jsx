import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider } from "@mui/material";
import { theme } from "./PickersTheme";
import { LuCalendarDays } from "react-icons/lu";
import { Box } from "../styles/generalStyles";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import the utc plugin
import timezone from "dayjs/plugin/timezone"; // Import the timezone plugin

dayjs.extend(utc);
dayjs.extend(timezone);

export default function BasicDatePicker({ onChange, defaultValue }) {
  // Parse the ISO defaultValue (2026-09-18T21:00:00+03:00) into a dayjs object
  const parsedDefaultValue = defaultValue
    ? dayjs(defaultValue).local() // Use local timezone for defaultValue
    : null;

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              format="DD/MM/YYYY" // Custom format for the date picker
              showDaysOutsideCurrentMonth
              defaultValue={parsedDefaultValue} // Set the parsed default value
              componentsProps={{
                openPickerButton: {
                  sx: {
                    color: "var(--buttonActive)", // Customize the button color
                  },
                },
              }}
              slots={{
                openPickerIcon: LuCalendarDays, // Custom icon
              }}
              sx={{
                "& .MuiInputBase-input": {
                  padding: "0 10px",
                  height: "calc(3rem - 1px)",
                  color: "var(--gray400)", // Customize input text color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--gray300)", // Customize border color
                    borderRadius: "8px",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--gray300)", // Customize hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", // Customize focused border color
                  },
                },
              }}
              onChange={(value) => {
                // Convert dayjs object to local date string in YYYY-MM-DD format
                const localDate = value
                  ? value.local().format("YYYY-MM-DD")
                  : null;
                console.log(new Date(localDate));
                onChange(localDate); // Pass local date to onChange
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </ThemeProvider>
    </Box>
  );
}
