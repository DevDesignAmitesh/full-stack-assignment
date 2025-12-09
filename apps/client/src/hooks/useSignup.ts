import { UserSignup } from "@repo/types/types";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { HTTP_URL } from "@/utils";
import { useRouter } from "next/navigation";

export const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignup = async (data: UserSignup) => {
    if (loading) return;
    try {
      setLoading(true);

      const res = await axios.post(`${HTTP_URL}/auth/signup`, data);

      if (res.status === 201) {
        toast.success(res?.data?.message ?? "signup successfull");
        router.push("/signin");
        return;
      }
    } catch (e: any) {
      console.log("error in handle signup ", e);
      toast.error(e?.response?.data?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, loading };
};
