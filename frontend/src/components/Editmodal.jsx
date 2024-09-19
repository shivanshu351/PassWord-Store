import React, { useState } from "react";
import { BASE_URL } from "../App";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

// Modal component for editing passwords
export default function Modal({ password, setPasswords }) {
    // State variables
    const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState({
        websiteName: password.websiteName,
        websiteLink: password.websiteLink,
        userName: password.userName,
        password: password.password
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Toggle password visibility
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

     // Handle form submission
    const handleInputs = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Send PATCH request to update password details
            const res = await fetch(BASE_URL + `/${password._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input)
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'An error occurred');
            }

            // Update passwords state with updated data
            setPasswords(prev => prev.map(pw => pw._id == password._id ? data : pw));

            // Update input state with fetched data
            setInput({
                websiteName: data.websiteName,
                websiteLink: data.websiteLink,
                userName: data.userName,
                password: data.password
            });

            // Close the modal after successful update
            setShowModal(false);

             // Show success toast notification
            toast.success('Details edited successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    return (
        <>
            <button
                className='p-1 w-[47%] rounded-md bg-[#080f22] hover:bg-green-800 duration-200'
                type="button"
                onClick={() => setShowModal(true)}
            >
                Edit
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#030711] outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Edit Details
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-blue-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-blue-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <form className='m-10' onSubmit={handleInputs}>
                                    <div className='flex flex-col gap-4'>
                                        <p className="">Website Name</p>
                                        <input
                                            type="text"
                                            className='w-full rounded-md p-2 bg-[#080f22] text-white border-[0.5px] border-gray-500'
                                            placeholder='Website name' value={input.websiteName} onChange={e => { setInput({ ...input, websiteName: e.target.value }) }}
                                        />
                                        <p className="">URL</p>
                                        <input
                                            type="text"
                                            className='w-full rounded-md p-2 bg-[#080f22] text-white border-[0.5px] border-gray-500'
                                            placeholder='Website link' value={input.websiteLink} onChange={e => { setInput({ ...input, websiteLink: e.target.value }) }}
                                        />
                                        <div className='w-full flex flex-col md:flex-row gap-4'>
                                            <div className="flex flex-col gap-4">
                                                <p className="">Username</p>
                                                <input
                                                    type="text"
                                                    placeholder='Username' value={input.userName} onChange={e => { setInput({ ...input, userName: e.target.value }) }}
                                                    className='w-full md:flex-1 rounded-md p-2 bg-[#080f22] text-white border-[0.5px] border-gray-500'
                                                />
                                            </div>
                                            <div className="flex flex-col gap-4 relative">
                                                <p className="">Password</p>
                                                <input
                                                    type={!showPassword ? "password" : "text"}
                                                    placeholder='Password' value={input.password} onChange={e => { setInput({ ...input, password: e.target.value }) }}
                                                    className='w-full md:flex-1 rounded-md p-2 bg-[#080f22] text-white border-[0.5px] border-gray-500'
                                                />
                                                {!showPassword ? <FaEye className="text-blue-100 text-lg absolute top-12 right-2 cursor-pointer" onClick={handleShowPassword} /> : <FaEyeSlash className="text-blue-100 text-lg absolute top-12 right-2 cursor-pointer" onClick={handleShowPassword} />}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end p-6 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            {loading ? (
                                                <div className="flex justify-center items-center">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            ) : "Save Changes"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}