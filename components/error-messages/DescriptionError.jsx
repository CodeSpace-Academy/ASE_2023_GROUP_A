import React from "react";

/**
 * DescriptionError component for displaying an error message when description loading fails.
 * @returns {JSX.Element} - The rendered DescriptionError component.
 */
export default function DescriptionError() {
  return (
    <p className="description-err text-red-800 font-extrabold bg-slate-400">
      Failed to load description!
    </p>
  );
}
