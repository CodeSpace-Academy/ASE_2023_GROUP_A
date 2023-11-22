import Time from "@/helpers/TimeConvertor";
import { FaClock, FaTag, FaUtensils, FaUsers } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";

export const PrepTime = ({ prepTime }) => {
  return (
    <div className='flex items-center'>
      <FaUtensils className='mr-2' />
      <span className='mr-2'>Prep Time</span>
      <Time cookTimeInMinutes={prepTime} label={""} />
    </div>
  );
};

export const CookTime = ({ cookTime }) => {
  return (
    <div className='flex items-center'>
      <GiCookingPot className='mr-2' />
      <span className='mr-2'>Cook Time</span>
      <Time cookTimeInMinutes={cookTime} label={""} />
    </div>
  );
};

export const TotalTime = ({ totalTime }) => {
  return (
    <div className='flex items-center'>
      <FaClock className='mr-2' />
      <span className='mr-2'>Total Time</span>
      <Time cookTimeInMinutes={totalTime.cook + totalTime.prep} label='' />
    </div>
  );
};

export const Published = ({ published }) => {
  return (
    <div className='flex items-center'>
      <FaClock className='mr-2' />
      <b className='font-bold'>Published:</b>
      <p className='transform translate-x-0 hover:translate-x-2 transition-transform duration-300 ease-in-out'>
        {new Date(published).toLocaleDateString()}
      </p>
    </div>
  );
};
