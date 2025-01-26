import Image from 'next/image';
import SignupForm from '../components/SignupForm';

const RegisterPage = () => {
  return (
    <div className="relative flex items-center justify-center md:min-h-screen bg-gray-900 bg-opacity-50">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter "
      >
        <Image
          // src="/img/white-dove-flying.jpeg"
          src="https://images.unsplash.com/photo-1614239374931-ed5165a07231?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Flying doves"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
        />
      </div>

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
