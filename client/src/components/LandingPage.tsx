import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h2>Landing Page</h2>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LandingPage;
