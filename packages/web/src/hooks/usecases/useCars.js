import { useQuery } from "@tanstack/react-query";
import carApi from "../../api/car/car.api";

export const useCars = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cars"],
    queryFn: carApi.getAll,
  });

  return {
    cars: data,
    isLoading,
    isError,
    error,
  };
};
