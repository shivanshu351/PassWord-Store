import React, { useEffect, useState } from 'react';
import { FaAngleDown } from "react-icons/fa"; // Importing AngleDown icon from react-icons/fa
import { BASE_URL } from '../App'; // Importing BASE_URL from App.js
import Editmodal from './Editmodal'; // Importing Editmodal component
import { FaEye } from "react-icons/fa"; // Importing Eye icon from react-icons/fa
import { FaEyeSlash } from "react-icons/fa"; // Importing EyeSlash icon from react-icons/fa
import { FaRegClipboard } from "react-icons/fa"; // Importing RegClipboard icon from react-icons/fa
import { FaCheck } from "react-icons/fa"; // Importing Check icon from react-icons/fa
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing default CSS for react-toastify

// Component for displaying individual password entry
export default function Passwords({ password, setPasswords }) {
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [loading, setLoading] = useState(false); // State for controlling loading state
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [copied, setCopied] = useState(false); // State for tracking if password is copied to clipboard

  // Function to toggle modal visibility
  const handleModal = () => {
    setShowModal(!showModal);
  }

  // Function to toggle password visibility
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  // Function to handle password deletion
  const handleDelete = async () => {
    setLoading(true); // Set loading state to true
    try {
      const res = await fetch(`${BASE_URL}/${password._id}`, { // Send DELETE request to delete specific password
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'An error occurred'); // Throw error if response is not ok
      }

      // Update passwords state by filtering out deleted password
      setPasswords(prev => prev.filter(p => p._id !== password._id));

      // Show success toast notification
      toast.success('Password deleted successfully', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error(error);
      // Show error toast notification if deletion fails
      toast.error('Failed to delete password!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false); // Set loading state to false after try-catch block
    }
  }

  // Function to mask password for display
  const getMaskedPassword = (password) => {
    return '•'.repeat(password.length); // Replace characters with dots for masking
  };

  // Function to handle copying password to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(password.password) // Use Clipboard API to write password to clipboard
      .then(() => {
        setCopied(true); // Set copied state to true
        // Show success toast notification
        toast.success('Copied to clipboard', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch(err => {
        console.error('Failed to copy password: ', err);
        // Show error toast notification if copying fails
        toast.error('Failed to copy password', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }

  // Render password entry component
  return (
    <>
      <div className='w-full flex flex-col max-w-sm sm:max-w-lg md:max-w-4xl gap-5 border-[0.5px] border-gray-500 rounded-md m-3'>
        <button onClick={handleModal} className='flex flex-row items-center justify-between p-3 rounded-md'>
          <p className='text-blue-100 text-md capitalize'>{password.websiteName}</p>
          <FaAngleDown className={`text-blue-100 text-lg rotate-icon ${showModal ? 'open' : ''}`} />
        </button>

        <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${showModal ? 'max-h-screen' : 'max-h-0'}`}>
          <div className='p-4 w-[90%] text-blue-100 border-[0.5px] border-gray-500 rounded-md mx-auto'>
            <p className='text-sm font-extralight'><span className='font-light text-blue-300'>Username: </span> {password.userName}</p>
            <div className='flex flex-row items-center'>
              <p className='text-sm font-extralight'><span className='font-light text-blue-300'>Password: </span>
                {showPassword ? password.password : getMaskedPassword(password.password)}
              </p>

              {copied ? <FaCheck className="text-blue-100 mx-1 text-sm cursor-pointer" onClick={handleCopy} /> : <FaRegClipboard className="text-blue-100 mx-1 text-sm cursor-pointer" onClick={handleCopy} />}

              {!showPassword ? <FaEye className="text-blue-100 mx-2 text-sm cursor-pointer" onClick={handleShowPassword} /> : <FaEyeSlash className="text-blue-100 mx-2 text-sm cursor-pointer" onClick={handleShowPassword} />}
            </div>
            <p className='text-sm font-extralight'><span className='font-light text-blue-300'>URL: </span> {password.websiteLink}</p>
          </div>
          <div className='w-[90%] text-blue-100 rounded-md mx-auto m-3 flex flex-row justify-between'>
            <button onClick={handleDelete} className='border-[0.5px] border-gray-500 p-1 w-[47%] rounded-md hover:bg-red-900 duration-200'>
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : "Delete"}
            </button>
            <Editmodal password={password} setPasswords={setPasswords} />
          </div>
        </div>
      </div>
    </>
  );
}
