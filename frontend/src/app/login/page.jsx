'use client';
import { useRouter } from 'next/navigation';
import LoginPage from '../components/Login';
import { checkAuth } from '../utils/apiService';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';


export default function LoginRoute() {
  const [loading, setLoading] = useState(true);
  const route = useRouter();

  useEffect(() => {
    const validate = async () => {
      const isLoggedIn = await checkAuth();

      if (isLoggedIn) {
        route.push("/todo")
      } else {
        setLoading(false)
      } 
    };

    validate();
  }, [])


  return loading ? <Loading /> : <LoginPage />;

}
