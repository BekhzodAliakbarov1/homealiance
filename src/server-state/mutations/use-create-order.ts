/* eslint-disable camelcase */
import { useMutation } from "react-query";
import { request } from "../api";
import { SingleOrderResponse } from "../queries/use-get-orders";

interface CreateOrdeRequest {
  brand: number;
  date: string;
  time: number | string;
  address: string;
  description: string;
  status: "new";
}

export const useSignUp = () =>
  useMutation(
    (register: CreateOrdeRequest) =>
      request.private
        .post<SingleOrderResponse>("/order/", register)
        .then((res) => res.data),
    {
      retry: false,
    }
  );
