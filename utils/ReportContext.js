import { createContext, useState, useContext } from "react";

const ReportContext = createContext(null);

export const ReportProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [hazardType, setHazardType] = useState("");
  const [freetext, setFreetext] = useState("");
  const [location, setLocation] = useState(null);

  const value = { photos, setPhotos, hazardType, setHazardType, freetext, setFreetext, location, setLocation };

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
};

export const useReport = () => useContext(ReportContext);
