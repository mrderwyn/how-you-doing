import React, { useEffect, useState } from 'react';

import scrollToTop from '../../helpers/scrollToTop';

import styles from './ScrollToTopButton.module.css';

const ScrollToTopButton = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        function handleScroll() {
          if (window.scrollY > 500) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        }
      
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    return <>
        {scrolled && 
            <div className={styles.scroll} onClick={scrollToTop}>
              <span className={styles.text}>Scroll to top</span>
            </div>
        }
    </>;
};

export default ScrollToTopButton;