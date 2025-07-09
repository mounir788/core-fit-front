import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider } from "@mui/material";
import { IoTimeOutline } from "react-icons/io5";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { theme } from "./PickersTheme";
import { Box } from "../styles/generalStyles";

export default function ResponsiveTimePickers({
  onChange,
  defaultValue,
  error,
}) {
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker
              defaultValue={defaultValue && dayjs(`1997-01-01T${defaultValue}`)}
              sx={{
                // display: "block",
                "& .MuiInputBase-input": {
                  padding: "0 10px",
                  height: "calc(3rem - 1px)",
                  color: "var(--gray400)", // Customize input text color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: error ? "var(--buttonRed)" : "var(--gray300)", // Customize border color
                    borderRadius: "6px",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--gray300)", // Customize hover border color
                  },
                  // "&.Mui-focused fieldset": {
                  //   borderColor: "black", // Customize focused border color
                  // },
                },
              }}
              slotProps={{
                textField: { placeholder: "-- : --" },
                openPickerIcon: IoTimeOutline,
              }}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                // seconds: renderTimeViewClock,
              }}
              onChange={(value) => {
                onChange(dayjs(value).format("HH:mm"));
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </ThemeProvider>
    </Box>
  );
}
