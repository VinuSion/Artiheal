import { useNavigate } from 'react-router-dom';

interface LoginProps {
  handleLogin: () => void; // Adjust the type of handleLogin as needed
}

const Login = ({ handleLogin }: LoginProps) => {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Perform authentication logic
    // ...

    // Call the handleLogin function to update authentication state
    handleLogin();
    navigate('/dashboard');
    // Redirect to the HomePage after successful login
    // Assuming that 'handleLogin' updates 'isAuth' state
  };

  return (
    <div>
      <h2>Login Page</h2>
      {/* Login form */}
      <button onClick={handleLoginClick}>Login</button>
    </div>
  );
};

export default Login;
