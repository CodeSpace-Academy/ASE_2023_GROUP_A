import { useState, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";
import Link from "next/link";
import Image from "next/image";

const Navigation = () => {
  const [categories, setCategories] = useState([]); // State to store fetched categories
  // Fetch categories from MongoDB 
  useEffect(() => {
    // Fetch categories from the API route
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
  const handleOptionSelect = (selectedOption) => {
    console.log("Selected Option:", selectedOption);
  };

  const heading = "< Cooking Devs >";

  return (
    // <div className="container bg-blue-400 w-full mx-auto p-4">
    //   <Link href={`/`}>Home</Link>
    //   <h1 className="text-3xl font-bold mb-4">Recipe Website</h1>
    //   <DropdownMenu options={categories} onSelect={handleOptionSelect} />
    // </div>

    <nav className="bg-yellow-700">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          {/* <!-- Mobile menu button--> */}
          <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open main menu</span>
            {/* <!--
              Icon when menu is closed.
  
              Menu open: "hidden", Menu closed: "block"
            --> */}
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            {/* <!--
              Icon when menu is open.
  
              Menu open: "block", Menu closed: "hidden"
            --> */}
            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-shrink-0 items-center">
          <Link href={`/`}>
            <Image  src="/Images/logo1.png" alt="Your Company" height={80} width={60}/>
            </Link>
          </div>
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="hidden sm:ml-6 sm:block">
          
            <div className="flex space-x-4">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <Link href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</Link>
              <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</Link>
              <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</Link>
              <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">View notifications</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>
{/*   
          <!-- Profile dropdown --> */}
          <div className="relative ml-3">
            <div>
              <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
              </button>
            </div>
            {/* <!--
              Dropdown menu, show/hide based on menu state.
  
              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}
            <div>
              {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
              <DropdownMenu options={categories} onSelect={handleOptionSelect} />
            </div>
          </div>
        </div>
      </div>
    </div>
  
    {/* <!-- Mobile menu, show/hide based on menu state. --> */}
    <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
        <Link href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</Link>
        <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</Link>
        <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</Link>
        <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</Link>
      </div>
    </div>
  </nav>

  );
};

export default Navigation;