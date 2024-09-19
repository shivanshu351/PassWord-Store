import React, { useState } from 'react';
import { BASE_URL } from '../App'; // Importing BASE_URL from App.js
import { FaEye } from "react-icons/fa"; // Importing Eye icon from react-icons/fa
import { FaEyeSlash } from "react-icons/fa"; // Importing EyeSlash icon from react-icons/fa
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing default CSS for react-toastify

// Component for adding a new password
export default function Input({ setPasswords }) {
    const [input, setInput] = useState({ // State for input fields
        websiteName: "",
        websiteLink: "",
        userName: "",
        password: ""
    });
    const [loading, setLoading] = useState(false); // Loading state for submit button
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

    // Function to handle form submission
    const handleInputs = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true); // Set loading state to true
        try {
            const res = await fetch(BASE_URL, { // Send POST request to BASE_URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input) // Send input data as JSON in request body
            });

            const data = await res.json(); // Parse response data as JSON
            if (!res.ok) {
                throw new Error(data.error || 'An error occurred'); // Throw error if response is not ok
            }

            // Update passwords state with new data
            setPasswords(prev => [...prev, data]);

            // Clear input fields after successful submission
            setInput({
                websiteName: "",
                websiteLink: "",
                userName: "",
                password: ""
            });

            // Show success toast notification
            toast.success('Password added successfully', {
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
            // Show error toast if input fields are empty or other error occurs
            toast.error('Input fields cannot be empty', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(error.message); // Log error message to console
        } finally {
            setLoading(false); // Set loading state to false after try-catch block
        }
    }

    // Function to toggle password visibility
    const handleShowPassword = () => {
        setShowPassword(!showPassword); // Toggle showPassword state
    }

    // Render form for adding new password
    return (
        <>
            <form className='m-10' onSubmit={handleInputs}>
                <div className='flex flex-col items-center gap-4'>
                    {/* Input field for website name */}
                    <input
                        type="text"
                        className='w-full rounded-md p-2 bg-[#080f22] text-white border-[0.5px] border-gray-500'
                        placeholder='Website name' value={input.websiteName} onChange={e => { setInput({ ...input, websiteName: e.target.value }) }}
                    />
                    {/* Input field for website link */}
                    <input
                        type="text"
                        className='w-full rounded-md p-2 bg-[#080f22] text-white border-[0.5px] border-gray-500'
                        placeholder='Website link' value={input.websiteLink} onChange={e => { setInput({ ...input, websiteLink: e.target.value }) }}
                    />
                    <div className='w-full flex flex-col md:flex-row gap-4'>
                        {/* Input field for username */}
                        <input
                            type="text"
                            placeholder='Username' value={input.userName} onChange={e => { setInput({ ...input, userName: e.target.value }) }}
                            className='w-full md:flex-1 rounded-md p-2 bg-[#080f22] text-white border-[0.5px] border-gray-500'
                        />
                        <div className='relative'>
                            {/* Input field for password with toggle visibility */}
                            <input
                                type={!showPassword ? "password" : "text"}
                                placeholder='Password' value={input.password} onChange={e => { setInput({ ...input, password: e.target.value }) }}
                                className='w-full md:flex-1 rounded-md p-2 bg-[#080f22] text-white border-[0.5px] border-gray-500'
                            />
                            {/* Toggle button for password visibility */}
                            {!showPassword ? <FaEye className="text-blue-100 text-lg absolute top-3 right-2 cursor-pointer" onClick={handleShowPassword} /> : <FaEyeSlash className="text-blue-100 text-lg absolute top-3 right-2 cursor-pointer" onClick={handleShowPassword} />}
                        </div>
                    </div>

                    {/* Submit button */}
                    <button type='submit' className='px-5 w-[47%] py-1 m-4 bg-[#f8fafc] font-semibold rounded-md hover:bg-[#b2d4f6] duration-200'>
                        {/* Conditional rendering based on loading state */}
                        {loading ? (
                            <div className="flex justify-center items-center">
                                {/* Loading spinner */}
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : "+ Add New Password"}
                    </button>
                </div>
            </form>
        </>
    );
}
