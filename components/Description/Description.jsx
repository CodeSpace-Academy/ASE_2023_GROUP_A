import DescriptionError from "../error-messages/DescriptionError";

const Description = ({ recipe }) => {
  return (
    <div>
      <h3 className="font-bold text-black">Description</h3>
      {!recipe ? (
        <DescriptionError  />
      ) : (
        <p className="text-slate-900">{recipe.description}</p>
      )}
    </div>
  );
};

export default Description;
