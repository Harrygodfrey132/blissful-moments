import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

const useInactivityLogout = (timeoutDuration = 2 * 60 * 60 * 1000) => {
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsSessionExpired(true);
        localStorage.setItem('isSessionExpired', 'true'); // Store in localStorage
        signOut(); // Log out user after inactivity timeout
      }, timeoutDuration);
    };

    const handleActivity = () => {
      resetTimer();
      localStorage.removeItem('isSessionExpired'); // Clear session expired flag on activity
    };

    // Check if session has already expired when the page loads
    if (localStorage.getItem('isSessionExpired') === 'true') {
      setIsSessionExpired(true);
    }

    // Add event listeners for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);

    // Initialize timer
    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [timeoutDuration]);

  return isSessionExpired;
};

export default useInactivityLogout;
