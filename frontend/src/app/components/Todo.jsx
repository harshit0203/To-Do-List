import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import * as apiService from "../utils/apiService"
import { toast } from 'react-toastify';

export default function Todo() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [toDoTitle, setToDoTitle] = useState("");
    const [selectedId, setSelectedId] = useState();
    const [toDoDescription, setToDoDescription] = useState("");
    const [tasks, setTasks] = useState([]);
    const menuRef = useRef();
    const router = useRouter();

    const todosExist = tasks?.length > 0 ? true : false;


    useEffect(() => {
        getTask();

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {

        apiService.apiPost("/auth/logout", {}).then((res) => {
            if (res.status) {
                toast.success("User logged out successfully!")
                router.push("/login");
                return
            }
        })
    };

    const getTask = () => {
        apiService.apiGet("/todo/get-todo").then((res) => {
            if (res.status) {
                setTasks(res.data);
            }
            else {
                toast.error(res.message);
            }
        })
    }

    const addTask = () => {
        const payload = {
            title: toDoTitle,
            description: toDoDescription
        };

        apiService.apiPost("/todo/add-todo", payload).then((res) => {
            if (res.status) {
                toast.success(res.message);
                setShowModal(false);
                getTask();
            } else {
                toast.error(res.message);
                setShowModal(false);
            }
        })
    };

    const updateTask = (id) => {
        const payload = {
            title: toDoTitle,
            description: toDoDescription
        };

        apiService.apiPost(`/todo/update-todo/${id}`, payload).then((res) => {
            if (res?.status) {
                toast.success(res?.message);
                getTask();
                setShowModal(false);
            } else {
                toast.error(res?.message)
                setShowModal(false);
            }
        })
    };

    const deleteTask = (id) => {
        apiService.apiPost(`/todo/delete-todo/${id}`, {}).then((res) => {
            if (res?.status) {
                toast.success(res?.message);
                getTask();
            } else {
                toast.error(res?.message);
            }
        })
    };

    const handleStatusToggle = (id, status) => {
        let newStatus = !status;

        apiService.apiPost(`/todo/change-status/${id}`, {status: newStatus}).then((res)=>{
            if(res?.status){
                toast.success(res?.message);
                getTask();
            } else{
                toast.error(res?.message);
            }
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">To-Do List</h1>

                    <div className="flex items-center gap-4 relative" ref={menuRef}>
                        <button onClick={() => { setShowModal(true); setIsEdit(false); setToDoTitle(""); setToDoDescription("") }} className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition">
                            + Add To-Do
                        </button>

                        {/* Avatar */}
                        <div
                            className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer overflow-hidden ring-2 ring-indigo-500"
                            onClick={() => setMenuOpen((prev) => !prev)}
                        >
                            <img
                                src="https://ui-avatars.com/api/?name=U+N&background=4f46e5&color=fff"
                                alt="User"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Dropdown */}
                        {menuOpen && (
                            <div className="absolute right-0 top-14 w-36 bg-white border border-gray-200 rounded shadow-lg z-50">
                                <button
                                    onClick={() => { handleLogout() }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>


                {!todosExist ? (
                    <div className="text-center text-gray-500 text-lg py-20">Nothing to-do!</div>
                ) : (
                    <div className="overflow-x-auto bg-white shadow rounded-lg">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-indigo-600 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">#</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Title</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Description</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
                                    <th className="px-6 py-3 text-center text-sm font-semibold uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* You will replace this row with dynamic loop later */}
                                {tasks?.map((item, index) => {
                                    return (

                                        <tr className="border-b hover:bg-gray-50 transition">

                                            <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                                            <td className="px-6 py-4 text-gray-800">{item?.title}</td>
                                            <td className="px-6 py-4 text-gray-600">{item?.description}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleStatusToggle(item?.id, item?.status)}
                                                    className={`text-sm font-medium px-3 py-1 rounded-full transition cursor-pointer ${item?.status
                                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                        }`}
                                                >
                                                    {item?.status ? 'Completed' : 'Pending'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 flex justify-center gap-3">
                                                <button onClick={() => { setShowModal(true); setSelectedId(item?.id); setIsEdit(true); setToDoTitle(item?.title); setToDoDescription(item?.description) }} className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm">
                                                    Update
                                                </button>
                                                <button onClick={() => { deleteTask(item?.id) }} className="cursor-pointer bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm">
                                                    Delete
                                                </button>
                                            </td>


                                        </tr>
                                    )
                                })}

                                {/* Repeat above <tr> for more static todos */}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Modal for Add To-Do */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">{!isEdit ? "Add New To-Do" : "Edit To-Do"}</h2>

                            <div className="mb-4">
                                <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
                                <input
                                    onChange={(e) => { setToDoTitle(e.target.value) }}
                                    value={toDoTitle}
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    placeholder="Enter task title"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    onChange={(e) => { setToDoDescription(e.target.value) }}
                                    value={toDoDescription}
                                    rows="3"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    placeholder="Enter task description"
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                {!isEdit ?
                                    <button
                                        onClick={() => { addTask() }}
                                        className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
                                    >
                                        Add Task
                                    </button> :
                                    <button
                                        onClick={() => { updateTask(selectedId) }}
                                        className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
                                    >
                                        Update Task
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}
