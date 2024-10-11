import React, { useEffect, useRef } from 'react';

const SlickMousewheel = ({ children, ...props }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider && slider.innerSlider && slider.innerSlider.list) {
      const handleWheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
          slider.slickPrev();
        } else {
          slider.slickNext();
        }
      };

      slider.innerSlider.list.addEventListener('wheel', handleWheel);

      return () => {
        if (slider && slider.innerSlider && slider.innerSlider.list) {
          slider.innerSlider.list.removeEventListener('wheel', handleWheel);
        }
      };
    }
  }, []);

  return React.cloneElement(children, { ref: sliderRef });
};

export default SlickMousewheel;