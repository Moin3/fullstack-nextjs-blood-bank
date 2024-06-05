'use client'
import Form from '@/components/reusable/Form';
import LogRegNavbar from '@/components/reusable/LogRegNavbar';
import React from 'react';

const RegisterForm: React.FC = () => {
  return (
    <>
      <LogRegNavbar/>
      <div className=" min-h-screen flex items-center justify-center bg-base-200 px-7">
        <div className="bg-white mt-16 mb-14 p-3 sm:p-8 md:p-8 rounded-md shadow-lg min-w-[315px] mx-5 my-5">
          <Form formTitle='Blood Bank Registration' btnTxt="Register" formType="register" btnType="login"/>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
