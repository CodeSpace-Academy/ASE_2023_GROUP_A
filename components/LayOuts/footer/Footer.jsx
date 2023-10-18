export default function Footer() {
  const pageName = "< Cooking Devs />";
  return (
    <div className="bg-red-700 p-7 text-white text-lg flex space-x-12 justify-center">
      <h2>Contact Us</h2>
      
      <p className="text-sm justify-center pl-12 pt-1 pr-12">
        Copyright © 2023 {pageName} | All rights reserved
      </p>
      
      <h2>Subscribe to our newsletter</h2>
    </div>
  );
}
