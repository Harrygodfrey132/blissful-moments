import SignupForm from '../components/SignupForm';

const RegisterPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow">
        <SignupForm />
      </div>
    </div>
  );
};

export default RegisterPage;
