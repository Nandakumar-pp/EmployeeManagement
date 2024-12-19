import React, { useState } from "react";

const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const closeNotification = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="flex items-center relative bg-teal-700 text-white py-2 px-4 flex items-center justify-between z-50">
        <div className="text-sm">
          You have a new notification! Check it out now.
        </div>
        <div >
                
                <button
                  onClick={closeNotification}
                  className="text-white px-4 py-1 bg-teal-800 hover:bg-teal-900 focus:outline-none"
                >
                  Close  
                </button>
        </div>
      </div>
    )
  );
};

export default NotificationBar;
