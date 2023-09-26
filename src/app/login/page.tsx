import Form from '@/components/reusable/Form';
import React from 'react';

const LoginForm: React.FC = () => {


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-400 to-pink-500">
      <div className="bg-white p-8 rounded-md shadow-lg w-96">
        <Form formTitle='Blood Bank Login' btnTxt="Login" formType="login" btnType="login"/>
      </div>
    </div>
  );
};

export default LoginForm;
