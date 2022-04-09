import { useQuery } from "react-query";
import { request } from "../api";

interface OrderTimeListType {
  id: number;
  interval: string;
}

export const useServicesListType = () =>
  useQuery("suggested-users", () =>
    request.public
      .get<OrderTimeListType[]>("/service-type/")
      .then((res) => res.data)
  );
