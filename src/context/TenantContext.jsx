import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useAppContext } from "../hooks/useAppContext";

export const TenantContext = createContext();

const TenantProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { token } = useAppContext();
  const [locValue, setLocValue] = useState("");
  const [budget,setBudget] = useState("");
  const [Type, setType] = useState(" ")

  //api call
  const fetchProperties = async () => {
    if (token) {
      try {
        setIsLoading(true);
        const { data } = await axiosInstance.get(
          `/property?page=${page}&location=${locValue}&budget=${budget}&type=${Type}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProperties(data.properties);
        setPage(data.currentPage);
        setTotalPage(data.totalPages);
        setTotal(data.totalProperties);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [token, page, locValue, budget,Type]);

  const resetFilters = ()=>{
    setPage(1);
    setLocValue("");
    setBudget("")
  };
  return (
    <TenantContext.Provider
      value={{
        isLoading,
        properties,
        page,
        totalPage,
        setPage,
        total,
        setLocValue,
        resetFilters,
        setBudget,
        setType
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export default TenantProvider;
