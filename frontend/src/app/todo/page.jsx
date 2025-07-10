'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TodoPage from '../components/Todo';
import { checkAuth } from '../utils/apiService';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

export default function TodoRoute() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const validate = async () => {
            const isLoggedIn = await checkAuth();
            if (!isLoggedIn) {
                toast.error("User unauthorized.")
                router.push('/login');
            } else {
                setLoading(false);
            }
        };

        validate();
    }, []);

    return loading ? <Loading /> : <TodoPage />;
}
