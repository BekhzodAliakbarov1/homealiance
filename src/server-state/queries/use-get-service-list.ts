import { useQuery } from "react-query";
import { request } from "../api";

interface SingleService {
  id: number;
  name: string;
}

export const useServicesList = () =>
  useQuery("suggested-users", () =>
    request.public.get<SingleService[]>("/service/").then((res) => res.data)
  );
