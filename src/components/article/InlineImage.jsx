import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const InlineImage = ({ image }) => {
    return (
        <motion.figure
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-8"
        >
            <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-auto"
                />
                {image.credit && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                        <Camera size={12} />
                        <span>{image.credit}</span>
                    </div>
                )}
            </div>
            {image.caption && (
                <figcaption className="mt-3 text-gray-600 text-sm italic text-center border-l-4 border-primary pl-4 py-2 bg-gray-50">
                    {image.caption}
                </figcaption>
            )}
        </motion.figure>
    );
};

export default InlineImage;