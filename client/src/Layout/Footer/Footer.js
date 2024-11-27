import React from "react";
import styles from "./Footer.module.scss";
import Logo from '../Header/img/Logo_XGame-011.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <img
            src={Logo} // Replace this with the actual logo URL or import your logo if it's a local file
            alt="Game Distribution Logo"
            loading='lazy'
            className={styles.logo}
          />

        </div>
        
        <div className={styles.middleSection}>
          <p className={styles.address}>
            <span className={styles.icon}>
              <i className="fas fa-map-marker-alt"></i>
            </span>
            The Nine, No. 9 Pham Van Dong, Mai Dich, Cau Giay, Hanoi - Check CI/CD
          </p>
          <p className={styles.copyright}>
            Azerion Copyright 2017 - 2023 |{" "}
            <a href="/privacy-policy" className={styles.link}>
              Privacy policy
            </a>{" "}
            -{" "}
            <a href="/platform-privacy-policy" className={styles.link}>
              Platform Privacy policy
            </a>{" "}
            -{" "}
            <a href="/terms-conditions" className={styles.link}>
              Terms & conditions
            </a>
          </p>
        </div>
        
        <div className={styles.rightSection}>
          <p>Follow us</p>
          <a
            href="https://www.facebook.com/xgamestudio" 
            className={styles.socialLink}
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
