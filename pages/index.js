import { useState } from 'react'
import Login from './Login';

export default function Home() {
  const [userInfo, setUserInfo] = useState();
  return (
    userInfo && <Login/>
  )
}
