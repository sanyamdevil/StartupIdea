const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen p-23 relative">
      {/* Auth content area */}
      <main className="flex-grow flex items-center justify-center relative">
        <div className="w-full max-w-md p-6 bg-gray-700 rounded-2xl shadow-md relative">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
