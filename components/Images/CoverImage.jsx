import React from "react";
import Image from "next/image";

/**
 * CoverImage component for displaying a cover image with Next.js Image component.
 * @param {Object} props - The component props
 * @param {string[]} props.images - An array of image URLs.
 * @param {string} props.title - The title of the image.
 * @returns {JSX.Element} - The rendered CoverImage component.
 */
function CoverImage({ images, title }) {
  const firstImage = images[0];

  return (
    <div>
      <Image
        src={firstImage}
        alt={title}
        width={300}
        height={300}
        layout="responsive"
        className="max-w-full h-auto object-cover rounded"
      />
    </div>
  );
}

export default CoverImage;
