'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { useMediaQuery } from 'react-responsive';

interface ListingCardProps {
    title: string;
    location: string;
    distance: string;
    dates: string;
    price: string;
    imageUrls: string[];
    rating: number;
    isGuestFavorite?: boolean;
}

const springValues = {
    damping: 25,
    stiffness: 100,
    mass: 1.5,
};

const ListingCard: React.FC<ListingCardProps> = ({
                                                     title,
                                                     location,
                                                     distance,
                                                     dates,
                                                     price,
                                                     imageUrls,
                                                     rating,
                                                     isGuestFavorite = true,
                                                 }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const rotateX = useSpring(0, springValues);
    const rotateY = useSpring(0, springValues);
    const scale = useSpring(1, springValues);
    const labelFloat = useSpring(0, { stiffness: 200, damping: 10 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        rotateX.set((offsetY / (rect.height / 2)) * -5);
        rotateY.set((offsetX / (rect.width / 2)) * 5);
        labelFloat.set(offsetY * 0.02);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        scale.set(1.08, {
            type: "spring",
            stiffness: 200,
            damping: 15,
            mass: 0.7
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        scale.set(1, {
            type: "spring",
            stiffness: 200,
            damping: 15,
            mass: 0.7
        });
        rotateX.set(0);
        rotateY.set(0);
        labelFloat.set(0);
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
        );
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => nextImage(),
        onSwipedRight: () => prevImage(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div className="relative max-w-[300px]">
            {isGuestFavorite && (
                <motion.div
                    className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full shadow-lg z-30"
                    style={{
                        y: labelFloat,
                        scale: isHovered ? 1.1 : 1
                    }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 15,
                        mass: 0.5,
                        scale: {
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                            duration: 0.3
                        }
                    }}
                >
                    <span className="text-xs font-bold text-rose-600 whitespace-nowrap">
                        Выбор гостей
                    </span>
                </motion.div>
            )}

            <motion.div
                ref={ref}
                className="bg-white rounded-lg shadow-md overflow-hidden w-full relative [perspective:1000px]"
                style={{ rotateX, rotateY, scale }}
                onMouseMove={handleMouse}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div className="relative [transform-style:preserve-3d] w-full h-full">
                    <div className="relative" {...(isMobile ? swipeHandlers : {})}>
                        <Image
                            src={imageUrls[currentImageIndex]}
                            alt={`${title} image ${currentImageIndex + 1}`}
                            width={300}
                            height={250}
                            className="w-full h-[250px] object-cover rounded-3xl"
                            priority
                        />

                        {isMobile && imageUrls.length > 1 && (
                            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                                {imageUrls.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-1 rounded-full ${index === currentImageIndex ? 'bg-white w-3' : 'bg-white/50 w-1'}`}
                                    />
                                ))}
                            </div>
                        )}

                        {!isMobile && imageUrls.length > 1 && (
                            <div className={`absolute inset-0 flex items-center justify-between px-3 opacity-0 hover:opacity-100 transition-opacity duration-200 ${isHovered ? 'opacity-100' : ''}`}>
                                <button
                                    className="bg-white/90 rounded-full p-2 shadow-md z-10 hover:bg-white border border-gray-200"
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>
                                <button
                                    className="bg-white/90 rounded-full p-2 shadow-md z-10 hover:bg-white border border-gray-200"
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        <motion.button
                            className="absolute top-2 right-2 p-2 z-10 backdrop-blur-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsFavorite((prev) => !prev);
                            }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    fill={isFavorite ? '#ff0000' : 'rgba(0,0,0,0.5)'}
                                    stroke={isFavorite ? '#ff0000' : '#fff'}
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </motion.button>
                    </div>

                    <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-base text-black font-bold line-clamp-1">
                                {title}, {location}
                            </h3>
                            <div className="flex items-center shrink-0">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="#FFD700"
                                    className="shrink-0"
                                >
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                <span className="text-sm text-black font-semibold ml-1">{rating}</span>
                            </div>
                        </div>

                        <div className="text-gray-500 text-sm space-y-1">
                            <p>{distance}</p>
                            <p>{dates}</p>
                        </div>

                        <p className="text-lg text-black font-semibold mt-2">{price}</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ListingCard;