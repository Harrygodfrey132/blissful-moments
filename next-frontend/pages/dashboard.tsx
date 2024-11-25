// pages/dashboard.tsx
import DashboardLayout from '../components/DashboardLayout';

const DashboardPage = () => {
  return (
    <DashboardLayout>
        <div className='bg-white shadow-sm p-4 rounded'>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your dashboard.</p>
        </div>
      
    </DashboardLayout>
  );
};

// Add `noLayout` property to exclude global layout
DashboardPage.noLayout = true;

export default DashboardPage;
