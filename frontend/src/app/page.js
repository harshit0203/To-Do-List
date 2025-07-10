"use client"
import { useEffect, useState } from "react";
import LoginPage from "./components/Login";
import Register from "./components/Register";
import { checkAuth } from "./utils/apiService";
import { useRouter } from "next/navigation";
import Loading from "./components/Loading";
import Todo from "./components/Todo";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  useEffect(()=>{
    const validate = async ()=> {
      const isLoggedIn = await checkAuth();

      if(isLoggedIn){
        route.push('/todo');
      } else{
        setLoading(false);
      }
    }

    validate();
  }, [])

  return (
   <>
     {loading ? <Loading /> : <Register />} 
   </>
  );
}
