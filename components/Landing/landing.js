
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Loading.module.css';

const Landing = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.logoContainer}>
        <Link href="/recipeList"> 
            <Image src="/Images/logo.png" alt="Your Logo" width={250} height={300} />
        </Link>
      </div>
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
      <div className={styles.buttonsContainer}>
        <Link href="/signin" className={styles.button}>
          Sign In
        </Link>
        <Link href="/login" className={styles.button}>
          Log In
        </Link>
      </div>
    </div>
    
  );
};

export default Landing;

