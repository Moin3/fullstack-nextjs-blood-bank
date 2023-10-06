'use client'
import Form from '@/components/reusable/Form';
import LogRegNavbar from '@/components/reusable/LogRegNavbar';
import React from 'react';

const RegisterForm: React.FC = () => {
  return (
    <>
      <LogRegNavbar/>
      <div className=" flex items-center justify-center bg-base-200">
        <div className="bg-white mt-14 mb-14 p-8 rounded-md shadow-lg w-96 mx-5">
          <Form formTitle='Registration' btnTxt="Register" formType="register" btnType="login"/>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
