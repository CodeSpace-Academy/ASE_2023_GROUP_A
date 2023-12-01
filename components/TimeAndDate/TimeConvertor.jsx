import Time from "@/helpers/TimeConvertor";
import { FaClock, FaUtensils, FaCalendarDay, FaBookReader } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";

export const PrepTime = ({ prepTime }) => {
  return (
    <div className='flex items-center'>
      <FaUtensils className='mr-2' />
      <span className='font-bold p-1'>Prep Time</span>
      <Time cookTimeInMinutes={prepTime} label={""} />
    </div>
  );
};

export const CookTime = ({ cookTime }) => {
  return (
    <div className='flex items-center'>
      <GiCookingPot className='mr-2' />
      <span className='font-bold p-1'>Cook Time</span>
      <Time cookTimeInMinutes={cookTime} label={""} />
    </div>
  );
};

export const TotalTime = ({ totalTime }) => {
  return (
    <div className='flex items-center'>
      <FaClock className='mr-2' />
      <span className='font-bold p-1'>Total Time</span>
      <Time cookTimeInMinutes={totalTime.cook + totalTime.prep} label='' />
    </div>
  );
};

export const Published = ({ published }) => {
  return (
    <div className='flex items-center'>
      <FaCalendarDay className='mr-2' />
      <b className='font-bold p-1'>Published:</b>
      <p>{new Date(published).toLocaleDateString()}</p>
    </div>
  );
};

export const Steps = ({ instructions }) => {
  return (
    <div className='flex items-center'>
      <FaBookReader className='mr-2' />
      <b className='font-bold p-1'>Steps:</b>
      <p>{instructions.length}</p>
    </div>
  );
};
