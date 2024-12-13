import React, { useState } from 'react';



export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollPosition > 100);
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div className='scroll__padding'  > 
    <i id="scroll-up" onClick={scrollToTop} style={{ opacity: isVisible ? 1 : 0 }}>
  <img className='scroll-up'  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ7pnIBYr0z-Pgo6ohUkR6SZ1NaHMuaL4jDdqlip9jsw&s" alt="arrow up pokemon"  />
    </i>
    </div>
  );
}

