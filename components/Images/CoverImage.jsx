import Image from "next/image";
const CoverImage = ({ images, title }) => {
      const firstImage = images[0];
    return (
      <div>
        <Image
          src={firstImage}
          alt={title}
          width={300}
          height={300}
          layout="responsive"
          className="max-w-full h-auto object-cover"
        />
      </div>
    );
}

export default CoverImage
