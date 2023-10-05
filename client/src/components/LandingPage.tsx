const LandingPage = () => {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-indigo-600 py-4 flex flex-row  h-28 items-center p-2">
          <img
            className="h-20, w-20"
            src="../artiheal-logo.svg"
            alt="logo"
          />
          <div className="container mx-auto text-white">
            <h1 className="text-4xl font-bold">Artiheal</h1>
            <p className="mt-2 text-lg"></p>
          </div>

          <div className="text-white mr-12 transition-all duration-300 hover:scale-110">
            <a href="signup">Registrarse</a>
          </div>

          <div className="text-white mr-7 transition-all duration-300 hover:scale-110">
            <a href="login">Iniciar sesión</a>
          </div>
        </header>
      </div>
    </div>
  );
};

export default LandingPage;
