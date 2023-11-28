/* react scope for eslint complaint */
import React from "react";

export default function EnvError() {
  return (
    <div className="flex flex-grow h-screen bg-white flex-grow">
      <div className="bg-fuchsia-200 justify-items-center flex-grow">
        <h1 className="text-red-800 p-10 font-bold text-3xl align-middle justify-items-center bg-inherit pt-40 ">
          Something went wrong! Please try again
        </h1>
      </div>
    </div>
  );
}
