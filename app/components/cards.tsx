// components/ListingsPage.tsx

import React from 'react';
import ListingCard from '@/app/components/listingCard';

const ListingsPage = () => {
    const listings = [
        {
            title: 'Slootdorp',
            location: '(Нидерланды)',
            distance: 'Расстояние: 61 километр',
            dates: '31 авг. – 5 сент.',
            price: '62 580 RUB за 5 ночей',
            imageUrl: '/house.jpg',
            rating: 4.97,
        },
        {
            title: 'Slootdorp',
            location: '(Нидерланды)',
            distance: 'Расстояние: 61 километр',
            dates: '31 авг. – 5 сент.',
            price: '62 580 RUB за 5 ночей',
            imageUrl: '/house.jpg',
            rating: 4.97,
            isGuestFavorite: true
        },
        {
            title: 'Slootdorp',
            location: '(Нидерланды)',
            distance: 'Расстояние: 61 километр',
            dates: '31 авг. – 5 сент.',
            price: '62 580 RUB за 5 ночей',
            imageUrl: '/house.jpg',
            rating: 4.97,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {listings.map((listing, index) => (
                <ListingCard key={index} {...listing} />
            ))}
        </div>
    );
};

export default ListingsPage;