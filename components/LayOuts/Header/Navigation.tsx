import React,{useState, useEffect} from 'react';
import DropdownMenu from './DropdownMenu';
import Link from 'next/link';
import { fetchCategories } from '@/helpers/mongoDB-utils';
const Navigation = () => {
    const [categories, setCategories] = useState([]); // State to store fetched categories
    // Fetch categories from MongoDB when the component mounts
    useEffect(() => {
        // Fetch categories from the API route
        fetch('/api/categories')
          .then((response) => response.json())
          .then((data) => setCategories(data))
          .catch((error) => console.error('Error fetching categories:', error));
      }, []);
    const handleOptionSelect = (selectedOption:any) => {
        console.log('Selected Option:', selectedOption);
        // You can perform actions when an option is selected
      };
      
  return (
    <div className="container bg-blue-400 w-full mx-auto p-4">
        <Link href={`/`}>Home</Link>
      <h1 className="text-3xl font-bold mb-4">Recipe Website</h1>
      <DropdownMenu options={categories} onSelect={handleOptionSelect} />
    </div>
  );
};

export default Navigation;
