import { useNavigate } from 'react-router-dom';

interface DashboardPageProps {
  handleLogout: () => void;
}

const DashboardPage = ({ handleLogout }: DashboardPageProps) => {

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // Perform logout logic
    // ...

    // Call the handleLogout function to update authentication state
    handleLogout();
    navigate('/');
    // Redirect to the LandingPage after successful logout
    // Assuming that 'handleLogout' updates 'isAuth' state
  };

  return <div>
    <p>DashboardPage</p>
    <button onClick={handleLogoutClick}>Logout</button>
  </div>;

};

export default DashboardPage;
