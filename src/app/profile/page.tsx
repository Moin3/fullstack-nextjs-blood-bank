"use client"
import PreLoder from '@/components/reusable/Preloder'
import { selectAuth } from '@/redux/features/auth/authSlice'
import { useAppSelector } from '@/redux/hooks'
import React, { useEffect } from 'react'

const Profile = () => {
  const {user,loading}=useAppSelector(selectAuth)

  return (
  <>
  {
    user ?  (
      <>
      <div>profile{user?.name}</div>
      </>
    ) : <PreLoder/> 
  }
    
  </>
  )
}

export default Profile