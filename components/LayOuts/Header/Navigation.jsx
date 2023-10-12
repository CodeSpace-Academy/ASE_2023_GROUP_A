import { useState, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";
import Link from "next/link";
import Image from "next/image";

const Navigation = () => {
  const [categories, setCategories] = useState([]); // State to store fetched categories
  // Fetch categories from MongoDB when the component mounts
  useEffect(() => {
    // Fetch categories from the API route
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
  const handleOptionSelect = (selectedOption) => {
    console.log("Selected Option:", selectedOption);
    // You can perform actions when an option is selected
  };

  const heading = "< Cooking Devs >";

  return (
    <div className="container bg-orange-700 w-full mx-auto p-4">
      <ul className="nav_list">
        <li>
          <Link href={`/`}>
            Home
          </Link>
        </li>
        <li>
          <h1
            className="text-3xl font-bold mb-4"
            dangerouslySetInnerHTML={{ __html: heading }}
          ></h1>
        </li>
        <li>
          <DropdownMenu options={categories} onSelect={handleOptionSelect} />
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
