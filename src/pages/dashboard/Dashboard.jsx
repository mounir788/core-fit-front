import styled, { css } from "styled-components";
import TopCard from "./components/TopCard";
import { Flex, Grid } from "../../styles/generalStyles";
import HorizontalScrollWrapper from "../../components/HorizontalScrollWrapper";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import useGetProfileData from "../../hooks/user/useGetProfileData";
import useGetstatistics from "../../hooks/dashboard/useGetstatistics";

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
  const { data: statistics } = useGetstatistics();

  return (
    <Flex $direction="column" $gap={16}>
      {/* User Name */}
      <WelcomeTitle>Welcome in, {data?.data?.username}!</WelcomeTitle>

      {/* Top Cards */}
      <HorizontalScrollWrapper>
        <Flex $gap={16}>
          {statistics?.data?.overview?.map((card) => (
            <TopCard
              key={card.id}
              title={card.title}
              number={card.count}
              increasingValue={card.changeRate}
            />
          ))}
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
        {/* ✅ Income Comparison (LineChart) */}
        <ChartCard>
          <ChartTitle>Income Comparison (Stores vs Reservations)</ChartTitle>
          <LineChart
            xAxis={[
              {
                scaleType: "point",
                data:
                  statistics?.data?.monthlyIncome?.map((d) => d.month) || [],
              },
            ]}
            series={[
              {
                data:
                  statistics?.data?.monthlyIncome?.map((d) => d.storeIncome) ||
                  [],
                label: "Stores",
                color: "#8884d8",
              },
              {
                data:
                  statistics?.data?.monthlyIncome?.map(
                    (d) => d.reservationIncome
                  ) || [],
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
                data: statistics?.data?.topProducts || [],
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
            hideLegend={true}
            // width={300}
            height={300}
          />
        </ChartCard>
      </Grid>
    </Flex>
  );
};

export default Dashboard;
