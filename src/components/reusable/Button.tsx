import { selectAuth } from '@/redux/features/auth/authSlice'
import { useAppSelector } from '@/redux/hooks'
import React from 'react'
import PreLoder from './Preloder'
interface IBtn{
    btnTxt:string,
    btnType:string,

}
const Button = ({btnTxt,btnType}:IBtn) => {
  const loginUserInfo=useAppSelector(selectAuth)
  const RegisterUserInfo=useAppSelector(selectAuth)


  return (
    <div className="mt-4">
          <button
            type="submit"
            className="w-full text-[15px] bg-red-600 hover:bg-red-500 text-white font-semibold py-1 px-2 rounded hover:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-400"
          >
            {(btnType==="register" && loginUserInfo.loading) &&  <PreLoder/> }
            {(btnType==="login" && RegisterUserInfo.loading) && <PreLoder/> }
            {(loginUserInfo.loading || RegisterUserInfo.loading) ? "" : btnTxt}

          </button>
        </div>
  )
}

export default Button