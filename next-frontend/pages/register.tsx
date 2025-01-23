import SignupForm from '../components/SignupForm';

const RegisterPage = () => {
  return (
    <div className="relative flex items-center justify-center md:min-h-screen bg-gray-900 bg-opacity-50">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80')",
        }}
      ></div>

      {/* Form Container */}
      <div className="relative bg-white mt-40 mb-20 mx-4 bg-opacity-90 p-10 rounded-lg shadow-lg w-full max-w-lg z-10">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6 text-center">
          Create an account
        </h2>

        <div className="mt-10">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
