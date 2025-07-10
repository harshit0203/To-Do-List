"use client"
import * as apiService from "../utils/apiService"
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { toast } from "react-toastify";

export default function Login() {
    const route = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {
        try {
            e.preventDefault();
            let payload = {
                email: email,
                password: password
            };

            await apiService.apiPost("/auth/login", payload).then((res) => {
                if (res.status) {
                    toast.success("Logged in successfully!")
                    route.push("/todo")
                } else {
                    toast.error(res.message)
                }
            })
        } catch (err) {
            toast.error(`Error occurred: ${err.message || err}`);
        }

    };

    return (
        <>
            <Head>
                <title>Log in</title>
                <script src="https://cdn.tailwindcss.com"></script>
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div className="px-10 py-12">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
                            </div>

                            <form className="space-y-6" onSubmit={(e) => { loginUser(e) }}>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            value={email}
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                            placeholder="your@email.com"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            onChange={(e) => { setPassword(e.target.value) }}
                                            value={password}
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                            placeholder="••••••••"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        id="show_password"
                                        name="show_password"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        onChange={(e) => {
                                            const input = document.getElementById("password");
                                            input.type = e.target.checked ? "text" : "password";
                                        }}
                                    />
                                    <label htmlFor="show_password" className="text-sm text-gray-600 select-none">
                                        Show password
                                    </label>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center justify-center"
                                    >
                                        <span>Login</span>
                                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </form>

                            {/* Already a user section */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link href="/" legacyBehavior>
                                        <a className="text-indigo-600 hover:text-indigo-500 font-medium">Register</a>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
