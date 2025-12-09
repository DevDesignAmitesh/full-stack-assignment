import { UserSignin } from "@repo/types/types";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { HTTP_URL } from "@/utils";
import { useRouter } from "next/navigation";

export const useSignin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignin = async (data: UserSignin) => {
    if (loading) return;
    try {
      setLoading(true);

      const res = await axios.post(`${HTTP_URL}/auth/signin`, data);

      if (res.status === 200) {
        toast.success(res?.data?.message ?? "signin successfull");
        localStorage.setItem("user_name", res?.data?.data?.name);
        localStorage.setItem("token", res?.data?.data?.token);
        router.push("/chat");
        return;
      }
    } catch (e: any) {
      console.log("error in handle Signin ", e);
      toast.error(e?.response?.data?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { handleSignin, loading };
};
