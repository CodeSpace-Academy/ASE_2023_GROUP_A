import DescriptionError from "../error-messages/DescriptionError";

const Description = ({ recipe }) => {
  return (
    <div>
      <h1 className="font-bold">Description</h1>
      {!recipe ? (
        <DescriptionError recipe={recipe} />
      ) : (
        <p className="text-slate-900">{recipe.description}</p>
      )}
    </div>
  );
};

export default Description;
