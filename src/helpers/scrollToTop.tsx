import Scroll from 'react-scroll';

const scrollToTop = () => {
    Scroll.animateScroll.scrollToTop({
        duration: 500,
        delay: 0,
        smooth: true,});
};

export default scrollToTop;