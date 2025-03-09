import React, { useRef, useState } from 'react'

const TooltipPopup = ({children, content}) => {
  const [isVisible, setIsvisible] = useState(false)
  const popupRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
            document.removeEventListener('mousedown', handleClickOutside);
    }
    }, [])


    return (
    <div className='relative inline-block' ref={popupRef}
    onClick={()=> setIsvisible(true)}
    > 
    {children}
    
    {isVisible && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 rounded-lg shadow-lg z-10 bg-black">
            {content}
        </div>
    )}
         
    </div>
  )
}

export default TooltipPopup