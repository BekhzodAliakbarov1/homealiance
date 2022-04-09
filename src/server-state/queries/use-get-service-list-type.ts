import { useQuery } from "react-query";
import { request } from "../api";

interface SingleServiceType {
  id: number;
  name: string;
}

export const useServicesListType = () =>
  useQuery("suggested-users", () =>
    request.public
      .get<SingleServiceType[]>("/service-type/")
      .then((res) => res.data)
  );
