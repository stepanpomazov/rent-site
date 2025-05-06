'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface ListingCardProps {
    title: string;
    location: string;
    distance: string;
    dates: string;
    price: string;
    imageUrl: string;
    rating: number;
    isGuestFavorite?: boolean; // Добавим пропс для управления отображением лейбла
}

const springValues = {
    damping: 30,
    stiffness: 100,
    mass: 2,
};

const ListingCard: React.FC<ListingCardProps> = ({
                                                     title,
                                                     location,
                                                     distance,
                                                     dates,
                                                     price,
                                                     imageUrl,
                                                     rating,
                                                     isGuestFavorite = true, // По умолчанию показываем лейбл
                                                 }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Animation values
    const rotateX = useSpring(0, springValues);
    const rotateY = useSpring(0, springValues);
    const scale = useSpring(1, springValues);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        rotateX.set((offsetY / (rect.height / 2)) * -15);
        rotateY.set((offsetX / (rect.width / 2)) * 15);
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
    };

    const handleMouseEnter = () => {
        scale.set(1.03);
    };

    const handleMouseLeave = () => {
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className="bg-white rounded-lg shadow-md overflow-hidden max-w-[300px] relative"
            style={{
                rotateX,
                rotateY,
                scale,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Guest Favorite Label - теперь с четкой видимостью */}
            {isGuestFavorite && (
                <motion.div
                    className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md z-20 flex items-center"
                    style={{
                        x: useSpring(x, { stiffness: 300, damping: 20 }),
                        y: useSpring(y, { stiffness: 300, damping: 20 }),
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="text-xs font-bold text-rose-600 whitespace-nowrap">
                        Выбор гостей
                    </span>
                </motion.div>
            )}

            {/* Image */}
            <div className="relative">
                <Image
                    src={imageUrl}
                    alt={`${title} image`}
                    width={300}
                    height={250}
                    className="w-full h-[250px] object-cover"
                    priority
                />

                {/* Favorite Button */}
                <button
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full z-10 backdrop-blur-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFavorite((prev) => !prev);
                    }}
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
                </button>
            </div>

            {/* Info Section */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base font-bold line-clamp-1">
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
                        <span className="text-sm font-semibold ml-1">{rating}</span>
                    </div>
                </div>

                <div className="text-gray-500 text-sm space-y-1">
                    <p>{distance}</p>
                    <p>{dates}</p>
                </div>

                <p className="text-lg font-semibold mt-2">{price}</p>
            </div>
        </motion.div>
    );
};

export default ListingCard;