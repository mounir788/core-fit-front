import styled, { css } from "styled-components";
import TopCard from "./components/TopCard";
import { Flex, Grid } from "../../styles/generalStyles";
import HorizontalScrollWrapper from "../../components/HorizontalScrollWrapper";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import useGetProfileData from "../../hooks/user/useGetProfileData";

// ✅ Dummy Data
const topProductsData = [
  { id: 0, value: 120, label: "Football" },
  { id: 1, value: 80, label: "Jersey" },
  { id: 2, value: 65, label: "Shoes" },
];

const incomeComparisonData = [
  { month: "Jan", storeIncome: 3000, reservationIncome: 1800 },
  { month: "Feb", storeIncome: 3500, reservationIncome: 2000 },
  { month: "Mar", storeIncome: 4000, reservationIncome: 2500 },
  { month: "Apr", storeIncome: 4200, reservationIncome: 2800 },
  { month: "May", storeIncome: 4600, reservationIncome: 3000 },
  { month: "June", storeIncome: 4600, reservationIncome: 3000 },
  { month: "July", storeIncome: 4600, reservationIncome: 3000 },
  { month: "August", storeIncome: 4600, reservationIncome: 3000 },
  { month: "Octobar", storeIncome: 4600, reservationIncome: 3000 },
  { month: "November", storeIncome: 4600, reservationIncome: 3000 },
  { month: "December", storeIncome: 4600, reservationIncome: 3000 },
];

const WelcomeTitle = styled.h1`
  font-size: 36px;
  font-weight: 400;
  line-height: 1.3;
  color: var(--gray700);
  margin-bottom: 10px;

  @media (width <= 768px) {
    font-size: 26px;
    line-height: 1.5;
  }
`;

const ChartCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const ChartTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Dashboard = () => {
  const { data } = useGetProfileData();
  return (
    <Flex $direction="column" $gap={16}>
      <WelcomeTitle>Welcome in, {data?.data?.username}!</WelcomeTitle>
      <HorizontalScrollWrapper>
        <Flex $gap={16}>
          <TopCard />
          <TopCard increasingValue={-5} />
          <TopCard />
          <TopCard />
          <TopCard />
        </Flex>
      </HorizontalScrollWrapper>

      <Grid
        $cols="1fr auto"
        $customeStyle={css`
          @media (width <= 1048px) {
            grid-template-columns: 1fr;
          }
        `}
      >
        {" "}
        {/* ✅ Income Comparison (LineChart) */}
        <ChartCard>
          <ChartTitle>Income Comparison (Stores vs Reservations)</ChartTitle>
          <LineChart
            xAxis={[
              {
                scaleType: "point",
                data: incomeComparisonData.map((d) => d.month),
              },
            ]}
            series={[
              {
                data: incomeComparisonData.map((d) => d.storeIncome),
                label: "Stores",
                color: "#8884d8",
              },
              {
                data: incomeComparisonData.map((d) => d.reservationIncome),
                label: "Reservations",
                color: "#1a9d56",
              },
            ]}
            // width={750}
            height={300}
          />
        </ChartCard>
        {/* ✅ Top 3 Selling Products (PieChart) */}
        <ChartCard>
          <ChartTitle>Top 3 Selling Products</ChartTitle>
          <PieChart
            series={[
              {
                data: topProductsData,
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -45,
                endAngle: 225,
                cx: 150,
                cy: 150,
              },
            ]}
            // width={300}
            height={300}
          />
        </ChartCard>
      </Grid>
    </Flex>
  );
};

export default Dashboard;
