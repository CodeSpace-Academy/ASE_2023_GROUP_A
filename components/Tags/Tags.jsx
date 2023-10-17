// const Tags = ({ recipe }) => {
//     try {
//       if (!recipe) {
//         return <div>Loading please wait...</div>;
//       }
  
//       return (
//         <>
//           <h3 className="mt-2 text-lg font-semibold">Tags:</h3>
//           <ul className="list-disc list-inside">
//             {recipe.tags.map((tag, index) => (
//               <li key={index} className="text-gray-600">
//                 {tag}
//               </li>
//             ))}
//           </ul>
//         </>
//       );
//     } catch (error) {
//       console.error("An error occurred:", error);
//       return <div>Failed to load tags!</div>;
//     }
//   };
  
//   export default Tags;
  

// Tags.js
import React, { useState } from "react";
import TagModal from "./TagModal";

const Tags = ({ recipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");

  const openModal = (tag) => {
    setSelectedTag(tag);
    setIsModalOpen(true);
  };

  return (
    <div>

      <div className="list-disc flex list-inside space-y-2">
        <button
          onClick={() => openModal(recipe.tags)} // Pass all tags to the modal
          className="text-gray-600 scroll-smooth snap-both cursor-pointer mt-2 text-lg font-semibold"
        >
          Show Tags
        </button>
      </div>

      {isModalOpen && (
        <TagModal
          tags={recipe.tags} // Pass all tags to the modal
          selectedTag={selectedTag} // Pass the selected tag
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Tags;