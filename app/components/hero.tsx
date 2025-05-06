// components/Hero.js

import Image from 'next/image';

const Hero = () => {
    return (
        <section style={styles.hero}>
            {/* Фоновая картинка */}
            <div style={styles.backgroundImage}>
                <Image
                    src="/hero.webp" // Убедитесь, что изображение находится в папке public
                    alt="Hero Section"
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            </div>
        </section>
    );
};

const styles = {
    hero: {
        position: 'relative',
        height: '80vh', // Высота секции Hero (можно изменить)
        width: '100%',
        overflow: 'hidden',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
};

export default Hero;