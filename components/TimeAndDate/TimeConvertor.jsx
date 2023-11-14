import Time from "@/helpers/TimeConvertor";
import Image from "next/image";

export const PrepTime = ({ prepTime }) => {
  return (
    <>
      <Image
        src='/Images/preptime.png'
        alt='cooking Time'
        width={100}
        height={100}
      />
      <Time cookTimeInMinutes={prepTime} label={"Prep Time"} />
    </>
  );
};

export const CookTime = ({ cookTime }) => {
  return (
    <>
      <Image
        src='/Images/cooking-time.png'
        alt='cooking Time'
        width={100}
        height={100}
      />
      <Time cookTimeInMinutes={cookTime} label={"Cook Time"} />{" "}
    </>
  );
};

export const TotalTime = ({ totalTime }) => {
  return (
    <>
      {" "}
      <Image
        src='/Images/timing.png'
        alt='cooking Time'
        width={100}
        height={100}
      />
      <Time
        cookTimeInMinutes={totalTime.cook}
        prepTimeInMinutes={totalTime.prep}
        label='Total time'
      />
    </>
  );
};
export const Published = ({ published }) => {
  return (
    <>
      <b className='font-bold'>Published:</b>
      <p className=' transform translate-x-0 hover:translate-x-2 transition-transform duration-300 ease-in-out'>
        {new Date(published).toLocaleDateString()}
      </p>
    </>
  );
};
