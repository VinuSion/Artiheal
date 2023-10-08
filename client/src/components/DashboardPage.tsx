import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface DashboardPageProps {
  handleLogout: () => void;
}

const DashboardPage = ({ handleLogout }: DashboardPageProps) => {
  const navigate = useNavigate();

  // You can remove this when you're done testing
  const userInfoString = localStorage.getItem('userInfo')!;
  const userInfo = JSON.parse(userInfoString);

  const handleLogoutClick = () => {
    handleLogout(); // handleLogout in App component
    navigate("/"); // navigates to landing page after logging out
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard | Artiheal</title>
      </Helmet>
      {/* ONLY USE THIS TO TEST THINGS, REMOVE THIS WHEN YOURE DONE */}
      <h1>User ID: {userInfo._id}</h1>
      <p>DashboardPage</p>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default DashboardPage;
