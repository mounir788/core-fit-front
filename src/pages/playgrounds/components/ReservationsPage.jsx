import useGetAllReservations from "../../../hooks/playgrounds/useGetAllReservations";
import { BoxContainer, MainTitle } from "../../../styles/generalStyles";
import ReservationCalendar from "./ReservattionCalendar";

const ReservationsPage = () => {
  const { data, isLoading, isError } = useGetAllReservations();
  return (
    <BoxContainer>
      <MainTitle>Playground Reservations</MainTitle>
      {/* {!isLoading && isError && ( */}
      <ReservationCalendar reservations={data?.data || []} />
      {/* )} */}
    </BoxContainer>
  );
};

export default ReservationsPage;
