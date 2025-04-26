
interface CakeImageProps {
  imageUrl: string;
  altText: string;
}

const CakeImage = ({ imageUrl, altText }: CakeImageProps) => (
  <div className="bg-gray-100 rounded-lg overflow-hidden">
    <img 
      src={imageUrl}
      alt={altText}
      className="w-full h-full object-cover"
    />
  </div>
);

export default CakeImage;
