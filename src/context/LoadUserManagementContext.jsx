import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create a Context
const DataContext = createContext();

// Provider Component
const LoadUserManagementContext = ({ children }) => {
  const [data, setData] = useState(true);

  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

// PropTypes Validation
LoadUserManagementContext.propTypes = {
  children: PropTypes.node.isRequired,
};

// Export both the provider and context separately
export { LoadUserManagementContext, DataContext };
