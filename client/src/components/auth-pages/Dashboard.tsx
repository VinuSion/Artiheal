import { Helmet } from "react-helmet-async";
import SplineArea from "@/components/ui/splineArea";
import CircleCalories from "@/components/ui/circleCalories";
import CircleGoal from "@/components/ui/circleGoal";
import CircleTime from "@/components/ui/circleTime";
import CircleSteps from "@/components/ui/circleSteps";
import CircleDistance from "@/components/ui/circleDistance";



const Dashboard = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard | Artiheal</title>
      </Helmet>
      <h2 className="font-bold text-2xl sm:text-4xl p-4 text-primary">
        Mi condicion fisica
      </h2>
      <main className="flex justify-center mb-6 h-full">
        <article className="rounded-xl bg-background w-full sm:w-9/12 p-4 flex flex-col shadow-xl ">
          <div className="flex flex-row gap-4 py-8 mb-8 justify-center flex-wrap border border-s rounded-md">
            <div className="border border-s p-6 rounded-md ">
              {" "}
              <CircleCalories />
            </div>
            <div className="border border-s p-6 rounded-md ">
              {" "}
              <CircleTime />
            </div>
            <div className="border border-s p-6 rounded-md ">
              {" "}
              <CircleSteps />
            </div>
            <div className="border border-s p-6 rounded-md ">
              {" "}
              <CircleDistance />
            </div>
          </div>

          <div className=" py-6 flex flex-row justify-center gap-16 border border-s rounded-md flex-wrap">
          <div className="border border-s p-6 rounded-md ">
            <SplineArea />
            </div>
            
            <div className="border border-s p-6 rounded-md ">
            <CircleGoal />  
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default Dashboard;
