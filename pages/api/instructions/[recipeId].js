import {
  connectToCollection,
 // closeMongoDBConnection,
} from "@/helpers/mongoDB-connection";

const updateInstructionsInDB = async (request, result) => {
  
    if (request.method === "PATCH") {
      const { instructions} = request.body
      const recipeId = request.query.recipeId
      try{
          const collection = await connectionToCollection("devdb", "recipes");
      const result = await collection.findOneAndUpdate(
        { _id: recipeId },
        { $set: { instructions: instructions } }
        {returnOriginal: false}
      );

      if (result.ok > && result.value) {
        res.status(200).json({message:`Instructions for '${id}' were successfully updated.`}) 
      } else {
        res.status(404).json({error: "Error updating instructions"});
              };
      } catch (error){
        console.error("Updating instructions failed", error);
        res.status(500).json({error: "Error updating instructions"});
      }
    } else if (request.method === "GET"){
      const recipeId = request.query.recipeId;
      try{
        const collection = await connectToCollection("devdb","recipes");
        const recipe = await collection.findOne({_id: recipeId});
        if (recipe){
          res.status(200).json({instructions: recipe.instructions});
        }else{
          res.status(404).json({error: "Recipe not found"
        });
      }
    } catch (error){
      console.error("Couldn't connect to instructions", error);
      res.status(505).json({error: "Couldn't connect to instructions"})
    }
  }else{
    res.status(607).json({error: "Couldn't connect to instructions"})
  }
}
//       if (result.deletedCount > 0) {
//         return {
//           success: true,
//           message: `Document with ID '${id}' was successfully deleted.`,
//         };
//       }
//     } else {
//       return { success: false, message: "Method not allowed." };
//     }
//   } catch (error) {
//     return {
//       success: false,
//       message: `Error updating instructions: ${error.message}`,
//     };
//   } finally {
//     await closeMongoDBConnection();
//   }
// };
export default updateInstructionsInDB;
