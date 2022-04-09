import { useQuery } from "react-query";
import { request } from "../api";

interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  region: string;
  city: string;
  street: string;
  zip_code: string;
  user_type: string;
  email: string;
  profile_image: {
    id: number;
    file: string;
    thumbnail_150: string;
  };
}

export const useGetProfile = () =>
  useQuery("profile", () =>
    request.private
      .get<UserProfile>("/account/user/get-profile/")
      .then((res) => res.data)
  );
