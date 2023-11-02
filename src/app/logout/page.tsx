"use client"
import PageLoader from '@/components/reusable/PageLoader';
import { signOutAsync } from '@/redux/features/auth/authAction';
import { selectAuth } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {useEffect} from 'react'
import toast from 'react-hot-toast';

const Logout = () => {
    const {user}=useAppSelector(selectAuth)
    const dispatch=useAppDispatch()
    useEffect(() => {
        dispatch(signOutAsync({}));
        if(user===null){
            toast.success('Logged out')
            setTimeout(() => {
                window.location.replace('/login');
              }, 1000);
        }
      },[user]);

      
      return(
        <div className='min-h-screen flex items-center justify-center'>
            <PageLoader/>
        </div>
        
      )

}

export default Logout