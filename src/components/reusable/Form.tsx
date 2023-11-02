"use client"
import React,{useEffect} from 'react'
import InputType from './InputType'
import Button from './Button';
import { useFormik } from 'formik';
import Link from 'next/link'
import { LoginSchema, RegistrationSchema } from '@/formValidation';
import { useAppDispatch } from '@/redux/hooks';
import { loginUserAsync, registerUserAsync } from '@/redux/features/auth/authAction';
import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/features/auth/authSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { IForm, IFormValues } from '@/types/types';


const Form = ({formTitle,btnTxt,formType,btnType}:IForm) => {
  /* ----------------------------- necessary hooks ---------------------------- */
    const router = useRouter()
    const loginUserInfo=useAppSelector(selectAuth)
    const RegisterUserInfo=useAppSelector(selectAuth)
    

    const dispatch=useAppDispatch()

    const initialFormValues: IFormValues = {
        role: 'admin',
        email: '',
        password: '',
      };
    
      /* ---------------- initial value based on role and formType ---------------- */
      if (formType === 'register') {
        if (initialFormValues.role === 'admin' || initialFormValues.role === 'donar') {
          initialFormValues.name = '';
        }  if (initialFormValues.role === 'hospital') {
          initialFormValues.hospitalName = '';
        }  if (initialFormValues.role === 'organisation') {
          initialFormValues.organisationName = '';
        }
         /* ----------- Add the new fields for website, address, and phone ----------- */
        initialFormValues.website = '';
        initialFormValues.address = '';
        initialFormValues.phone = '';
      }

      /* ---------------------------- use of use formik --------------------------- */
    const {values,handleChange,handleSubmit,errors,touched} = useFormik({
        initialValues:initialFormValues,
        validationSchema:formType=="login" ? LoginSchema : RegistrationSchema,
        onSubmit:(values:IFormValues,action) => {
        /* --------------------------- dispatch loginInfo -------------------------- */
          if(formType==="login"){
            dispatch(
              loginUserAsync({role:values.role,password:values.password,email:values.email})
            );
          }
          /* --------------------------- Register form dispatch -------------------------- */
          if(formType==="register"){
            dispatch(
              registerUserAsync({
                role:values.role,
                email:values.email,
                password:values.password,
                name:values.name,
                hospitalName:values.hospitalName,
                organisationName:values.organisationName,
                website:values.website,
                address:values.address,
                phone:values.phone
              })
            );
            
          }
          action.resetForm();
        },
      });

      /* --------------------------- useEffect for login -------------------------- */
      useEffect(() => {
        if(loginUserInfo.message) {
          if(loginUserInfo.token===undefined){
            toast.error(loginUserInfo.message)
          }else if(loginUserInfo.token){
            toast.success(loginUserInfo.message)
            router.push('/')
          }
        }
      }, [loginUserInfo.message])

      /* --------------------------- useEffect for login -------------------------- */
      useEffect(() => {
        if(RegisterUserInfo.isSuccess){
            if(RegisterUserInfo.message === 'User already exists') {
              toast.error("User already exists")
            }else if(RegisterUserInfo.message === 'User Registered Successfully'){
              toast.success('User Registered Successfully')
              // router.push('/login')
              setTimeout(() => {
                window.location.replace('/login');
              }, 1000);
            }else if(RegisterUserInfo.message==='Admin already exists'){
              toast.error("Admin already exists")
            }
        }

      }, [RegisterUserInfo.message])
      

  
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        {/* --------------------------- role and validation -------------------------- */}
        <div className="mb-4">
          <label className="block text-gray-700 text-[12px] font-bold mb-2" htmlFor="role">
            Select Role
          </label>
          
          <div className="flex text-[12px]">
                <div className="">
                    <div className="flex text-[12px] gap-3">
                        <InputType labelTxt='Admin' inputType='radio' id='adminRadio' name='role' value='admin' onChange={handleChange} checked={values.role === 'admin'}/>
                        <InputType labelTxt='Donar' inputType='radio' id='donarRadio' name='role' value='donar' onChange={handleChange} checked={values.role === 'donar'}/>
                        <InputType labelTxt='Hospital' inputType='radio' id='hospitalRadio' name='role' value='hospital' onChange={handleChange} checked={values.role === 'hospital'}/>
                        <InputType labelTxt='Organisation' inputType='radio' id='organisationRadio' name='role' value='organisation' onChange={handleChange} checked={values.role === 'organisation'}/>
                    </div>
                    <p className="text-red-500 text-xs mt-1 ml-1">
                        {
                            touched.role && errors.role ? (
                            <div>{errors.role}</div>
                            ) : null
                        }
                    </p>
                </div>
          </div>
        </div>
        {(() => {

          switch (true) {
            case formType === "login": {
              return (
                <>
                  {/* -------------------------- email and validation -------------------------- */}
                    <div className="mb-3">
                        <InputType labelTxt='Email' inputType='text' id='email' name='email' value={values.email} onChange={handleChange} />
                        <p className="text-red-500 text-xs mt-1 ml-1">
                            {
                                touched.email && errors.email ? (
                                <div>{errors.email}</div>
                                ) : null
                            }
                        </p>
                    </div>
                    {/* ------------------------- password and validation ------------------------ */}
                    <div className="mb-3">
                        <InputType labelTxt='Password' inputType='password' id='password' name='password' value={values.password} onChange={handleChange}/>
                        <p className="text-red-500 text-xs mt-1 ml-1">
                            {
                                touched.password && errors.password ? (
                                <div>{errors.password}</div>
                                ) : null
                            }
                        </p>
                    </div>
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                 {/* ------------------------- name,organisation name,hospital name handle and validation ------------------------ */}
                   {(values.role === "admin" || values.role === "donar") && (
                    <div className="mb-3">
                        <InputType labelTxt='Name' inputType='text' id='name' name='name' value={values.name} onChange={handleChange}/>
                        <p className="text-red-500 text-xs mt-1 ml-1">
                            {
                                touched.name && errors.name ? (
                                <div>{errors.name}</div>
                                ) : null
                            }
                        </p>
                    </div>
                  )}

                {(values.role === "organisation") && (
                    <div className="mb-3">
                        <InputType labelTxt='Organisation Name' inputType='text' id='organisation' name='organisationName' value={values.organisationName} onChange={handleChange}/>
                        <p className="text-red-500 text-xs mt-1 ml-1">
                            {
                                touched.organisationName && errors.organisationName ? (
                                <div>{errors.organisationName}</div>
                                ) : null
                            }
                        </p>
                    </div>
                  )}

                {(values.role === "hospital") && (
                    <div className="mb-3">
                        <InputType labelTxt='Hospital Name' inputType='text' id='hospital' name='hospitalName' value={values.hospitalName} onChange={handleChange}/>
                        <p className="text-red-500 text-xs mt-1 ml-1">
                            {
                                touched.hospitalName && errors.hospitalName ? (
                                <div>{errors.hospitalName}</div>
                                ) : null
                            }
                        </p>
                    </div>
                  )}

                  {/* -------------------------- email and validation -------------------------- */}
                  <div className="mb-3">
                        <InputType labelTxt='Email' inputType='text' id='email' name='email' value={values.email} onChange={handleChange} />
                        <p className="text-red-500 text-xs mt-1 ml-1">
                            {
                                touched.email && errors.email ? (
                                <div>{errors.email}</div>
                                ) : null
                            }
                        </p>
                    </div>
                    {/* ------------------------- password and validation ------------------------ */}
                    <div className="mb-3">
                        <InputType labelTxt='Password' inputType='password' id='password' name='password' value={values.password} onChange={handleChange}/>
                        <p className="text-red-500 text-xs mt-1 ml-1">
                            {
                                touched.password && errors.password ? (
                                <div>{errors.password}</div>
                                ) : null
                            }
                        </p>
                    </div>

                  {/* ------------------------- website and validation ------------------------ */}
                    <div className="mb-3">
                        <InputType labelTxt='Website' inputType='text' id='website' name='website' value={values.website} onChange={handleChange}/>
                        <p className="text-red-500 text-xs mt-1 ml-1">
                            {
                                touched.website && errors.website ? (
                                <div>{errors.website}</div>
                                ) : null
                            }
                        </p>
                    </div>
                    {/* ------------------------- address and validation ------------------------ */}
                    <div className="mb-3">
                        <InputType labelTxt='Address' inputType='text' id='address' name='address' value={values.address} onChange={handleChange}/>
                        <p className="text-red-500 text-xs mt-1 ml-1">
                            {
                                touched.address && errors.address ? (
                                <div>{errors.address}</div>
                                ) : null
                            }
                        </p>
                    </div>
                    {/* ------------------------- Phone and validation ------------------------ */}
                    <div className="mb-3">
                        <InputType labelTxt='Phone' inputType='text' id='phone' name='phone' value={values.phone} onChange={handleChange}/>
                        <p className="text-red-500 text-xs mt-1 ml-1">
                            {
                                touched.phone && errors.phone ? (
                                <div>{errors.phone}</div>
                                ) : null
                            }
                        </p>
                    </div>
                </>
              );
            }
          }
        })()}
        {/*  ------------------------------ submit button -----------------------------  */}
        <Button btnTxt={btnTxt} btnType={btnType}/>
      </form>
      {
        formType==="login" ? (
            <p className="text-center mt-3 text-xs">
                Don't have an account? <a href="/register" className="text-pink-500 hover:underline">Register</a>
            </p>
        ) : (
            <p className="text-center mt-3 text-xs">
                Already have an account? <a href="/login" className="text-pink-500 hover:underline">Login</a>
            </p>
        )
      }
      
      </>
  )
}

export default Form