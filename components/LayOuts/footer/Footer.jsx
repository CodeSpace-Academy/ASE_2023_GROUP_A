import Link from "next/link";

export default function Footer() {
  const pageName = "< Cooking Devs />";
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-blue-500 bottom-0 left-0 right-0 z-10 h-18">
      <div className="text-lg flex space-x-10 items-center justify-center mb-auto">
        <Link target="_blank" href="https://www.privacypolicies.com/live/f3493839-9aed-4582-8b43-74340eb8295f">
          Privacy Policy
        </Link>

        <Link target="_blank" href="https://www.mars.com/cookies-english">
          Cookie Policy
        </Link>

        <Link target="_blank" href="https://www.mars.com/legal">
          Terms of Use
        </Link>

        <Link target="_blank" href="https://www.mars.com/accessibility">
          Accessibility
        </Link>

        <Link href="#cookie-settings">Cookie Settings</Link>
      </div>
        <p className="text-sm text-center mb-0 pt-2">
          Copyright © {currentYear} {pageName} Pty Ltd | All
          rights reserved
        </p>
    </footer>
  );
}


// import React from 'react'

// function Footer() {
//   return (
    
// <footer class="bg-red-200 rounded-lg shadow mt-auto -mb-10">
//   <p>;lkjhbv</p>
//     <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
//         <div class="sm:flex sm:items-center sm:justify-between">
//             <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0">
//                 <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
//                 <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
//             </a>
//             <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
//                 <li>
//                     <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
//                 </li>
//                 <li>
//                     <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
//                 </li>
//                 <li>
//                     <a href="#" class="mr-4 hover:underline md:mr-6 ">Licensing</a>
//                 </li>
//                 <li>
//                     <a href="#" class="hover:underline">Contact</a>
//                 </li>
//             </ul>
//         </div>
//         <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
//         <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
//     </div>
// </footer>


//   )
// }

// export default Footer