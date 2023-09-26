'use client'
import Form from '@/components/reusable/Form';
import React from 'react';

const RegisterForm: React.FC = () => {


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-400 to-pink-500">
      <div className="bg-white mt-14 mb-14 p-8 rounded-md shadow-lg w-96">
        <Form formTitle='Registration' btnTxt="Register" formType="register" btnType="login"/>
      </div>
    </div>
  );
};

export default RegisterForm;
