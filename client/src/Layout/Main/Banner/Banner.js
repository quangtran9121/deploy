import React from 'react';
import styles from './Banner.module.scss'; // Import SCSS module
import game from '../img/gamedistributionpublisher.png-removebg.png'

function Banner() {
    return (
        <div className={styles.banner}>
            <div className={styles.textSection}>
                <h1 className={styles.title}>
                    High-Yield Solutions <br /> For Quang - Publishers
                </h1>
                <p className={styles.subtitle}>
                    Discover the advantages of<br /> partnering with GameDistribution
                </p>
                <button className={styles.ctaButton}>
                    Show More <span>→</span>
                </button>
            </div>
            <div className={styles.imageSection}>
                <img 
                    src={game} 
                    alt="Game Preview" 
                    loading="lazy"
                    className={styles.bannerImage} 
                />
            </div>
        </div>
    );
}

export default Banner;
