import { Helmet } from "react-helmet-async";
import SplineArea from "@ui/splineArea";
import CircleCalories from "@ui/circleCalories";
import CircleGoal from "@ui/circleGoal";
import CircleTime from "@ui/circleTime";
import CircleSteps from "@ui/circleSteps";
import CircleDistance from "@ui/circleDistance";

const Dashboard = () => {
  const userInfoString = localStorage.getItem("userInfo")!;
  const userInfo = JSON.parse(userInfoString);

  return (
    <div>
      <Helmet>
        <title>Dashboard | Artiheal</title>
      </Helmet>
      <main className="flex justify-center mb-6 h-full">
        <article className="rounded-xl bg-background w-full sm:w-9/12 p-4 flex flex-col shadow-xl">
          <h2 className="font-bold text-2xl sm:text-4xl p-4 text-primary">
            <span className="font-bold text-primary">
              ¡Hola {userInfo.firstName}!
            </span>{" "}
            ¡Aquí está tu estado físico!
          </h2>
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
