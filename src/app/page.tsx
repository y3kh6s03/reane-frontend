import ChartProvider from "./components/libs/ChartProvider";
import MyChart from "./myChart/page";

export default async function Home() {
  return (
    <ChartProvider>
      <MyChart />
    </ChartProvider>
  );
}
