import  Time  from "@/helpers/TimeConvertor";

export const PrepTime = ({ prepTime }) => {
  return (
    <>
      <Time cookTimeInMinutes={prepTime} label={"Prep Time"} />
    </>
  );
};

export const CookTime = ({ cookTime }) => {
  return (
    <>
      <Time cookTimeInMinutes={cookTime} label={"Cook Time"} />
    </>
  );
};

export const TotalTime = ({ totalTime }) => {
  return (
    <>
      <Time
        cookTimeInMinutes={totalTime.cook}
        prepTimeInMinutes={totalTime.prep}
        label="Total time"
      />
    </>
  );
};
export const Published = ({ published }) => {
    return (
        <>
            <b className="font-bold">Published:</b>
            <p className=" transform translate-x-0 hover:translate-x-2 transition-transform duration-300 ease-in-out">
                {new Date(published).toLocaleDateString()}
            </p>
        </>
    )
}