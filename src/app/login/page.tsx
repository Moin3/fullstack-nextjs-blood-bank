"use client"
import Form from '@/components/reusable/Form';
import LogRegNavbar from '@/components/reusable/LogRegNavbar';
import React from 'react';

const LoginForm: React.FC = () => {
  return (
    <>
    <LogRegNavbar/>
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="bg-white p-8 rounded-md shadow-lg w-96 mx-5">
        <Form formTitle='Blood Bank Login' btnTxt="Login" formType="login" btnType="login"/>
      </div>
    </div>
    </>
    
  );
};

export default LoginForm;
