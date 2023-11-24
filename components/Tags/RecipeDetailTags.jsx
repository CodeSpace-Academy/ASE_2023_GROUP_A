import { FaTag } from "react-icons/fa";

const RecipeDetailTags = ({ recipe }) => {
  try {
    if (!recipe) {
      return <div>Loading please wait...</div>;
    }

    return (
      <div className=' pb-2 items-center pt-2'>
        <div className='flex'>
          <FaTag className='mr-2' />
          <b>Tags</b>
        </div>
        <ul className='list-disc list-inside'>
          {recipe.tags.map((tag, index) => (
            <li key={index} className='text-gray-1000'>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("An error occurred:", error);
    return <div>Failed to load tags!</div>;
  }
};

export default RecipeDetailTags;
