// import React, { Fragment, useState, useEffect } from "react";
// import Loading from "../Loading/Loading";

// const RecipeInstructions = ({ recipes, onUpdateInstructions }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [instructions, setInstructions] = useState([]);
//   const [editedInstructions, setEditedInstructions] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Delay for simulating a loading state (e.g., 2 seconds)
//     const delay = 2000;

//     // Set a timeout to fetch and process instructions
//     const timeoutId = setTimeout(() => {
//       try {
//         // Sort the instructions based on their index
//         const sortedInstructions = recipes.instructions.map(
//           (instruction, index) => ({ index, instruction })
//         );
//         sortedInstructions.sort((a, b) => a.index - b.index);

//         // Map the sorted instructions to list items
//         const reorderedInstructions = sortedInstructions.map(
//           (instruction) => instruction.instruction
//         );

//         // Set the reordered instructions and mark loading as complete
//         setInstructions(reorderedInstructions.join("\n"));
//         setEditedInstructions(reorderedInstructions.join("\n"));
//         setLoading(false);
//       } catch (error) {
//         // Handle any errors that occur during the process
//         setError("An error occurred while fetching instructions.");
//         setLoading(false);
//       }
//     }, delay);

//     // Cleanup the timeout to prevent memory leaks
//     return () => clearTimeout(timeoutId);
//   }, [recipes.instructions]);

//   const toggleEditing = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleSaveInstructions = () => {
//     // Call an API to save the updated instructions
//     const updatedInstructions = editedInstructions.split("\n").map((instruction) => instruction.trim());
    
//     // Check if onUpdateInstructions is a function before calling it
//     if (typeof onUpdateInstructions === 'function') {
//       onUpdateInstructions(updatedInstructions);

//       // Update state and exit editing mode
//       setInstructions(updatedInstructions.join("\n"));
//       setIsEditing(false);
//     } else {
//       console.error("onUpdateInstructions is not a function");
//     }
//   };

//   return (
//     <Fragment>
//       {loading ? (
//         <p>
//           <Loading />
//         </p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <div>
//           {isEditing ? (
//             <div>
//               <textarea
//                 value={editedInstructions}
//                 onChange={(e) => setEditedInstructions(e.target.value)}
//                 rows={10}
//                 cols={70}
//               />
//               <button onClick={handleSaveInstructions}>Save</button>
//               <button onClick={toggleEditing}>Cancel</button>
//             </div>
//           ) : (
//             <div>
//               <ol className="list-decimal list-inside">{instructions}</ol>
//               <button onClick={toggleEditing}>Edit Instructions</button>
//             </div>
//           )}
//         </div>
//       )}
//     </Fragment>
//   );
// };

// export default RecipeInstructions;
