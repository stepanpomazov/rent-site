

import Image from 'next/image';

const Hero = () => {
    return (
        <section style={styles.hero}>
            <div style={styles.backgroundImage}>
                <Image
                    src="/hero.webp"
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
        height: '80vh',
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