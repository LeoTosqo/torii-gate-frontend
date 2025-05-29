import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useAppContext } from "../hooks/useAppContext";


export const TenantContext = createContext();

const TenantProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { token } = useAppContext();

  //api call
  const fetchProperties = async () => {
    if (token) {
      try {
        const { data } = await axiosInstance.get(`/property?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProperties(data.properties);
        setPage(data.currentPage);
        setTotalPage(data.totalPage);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [token, page]);
  return (
    <TenantContext.Provider
      value={{ isLoading, properties, page, totalPage, setPage }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export default TenantProvider;
