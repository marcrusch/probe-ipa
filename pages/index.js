import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'
import Admin from '../src/components/Admin';
import Header from '../src/components/Header';
import Login from '../src/components/Login';
import Main from '../src/components/Main';

export default function Home() {
  const [user, setUser] = useState(false);

  const onLogout = () => {
    setUser(false);
    Cookies.remove("userinfo");
  }

  return (
    <>
    <Header userInfo={user} onLogout={onLogout}/>
      {!user && <Login setGlobalUser={setUser}/> }
      {user && user.role==="admin" && <Admin user={user}/>}
      {user && user.role==="user" && <Main user={user}/>}
    </>
  )
}
