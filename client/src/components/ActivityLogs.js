import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ActivityContext = createContext();

export const useActivity = () => useContext(ActivityContext);

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  const logActivity = (activity) => {
    const newActivity = {
      id: activities.length + 1,
      description: activity,
      timestamp: new Date(),
    };
    setActivities([...activities, newActivity]);
  };

  return (
    <ActivityContext.Provider value={{ activities, logActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

ActivityProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
