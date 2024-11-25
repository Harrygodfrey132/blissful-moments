import SignupForm from '../components/SignupForm';

const RegisterPage = () => {
  return (
    <div className="flex bg-white min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className='md:mt-24 mt-10'>
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">Create an account</h2>
          </div>
          <div className="mt-10">
            <div>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
