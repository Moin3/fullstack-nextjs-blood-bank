"use client"
import { getCurrentUser } from '@/helper/apiRequest';
import { getCurrentUserAsync } from '@/redux/features/auth/authAction';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';

interface ProtectedRoutesDataProps {
  children: React.ReactNode;
}

const ProtectedRoutesData = ({ children }: ProtectedRoutesDataProps) => {
  const dispatch = useAppDispatch();

  const getUser = async () => {
    try {
      const { data } = await getCurrentUser() as any;
      if (data?.success) {
        dispatch(getCurrentUserAsync(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return <>{children}</>;
};

export default ProtectedRoutesData;
