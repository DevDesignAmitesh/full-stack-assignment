import { signupSchema, UserSignup, zodErrorMessage } from "@repo/types/types";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { HTTP_URL } from "@/utils";
import { useRouter } from "next/navigation";

export const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignup = async (input: UserSignup) => {
    if (loading) return;
    try {
      const { data, error, success } = signupSchema.safeParse(input);
      
      if (!success) {
        toast.error(zodErrorMessage({ error }));
        return;
      }

      setLoading(true);

      const res = await axios.post(`${HTTP_URL}/auth/signup`, data);

      if (res.status === 201) {
        toast.success(res?.data?.message ?? "signup successfull");
        router.push("/signin");
        return;
      }
    } catch (e: any) {
      console.log("error in handle signup ", e);
      toast.error(e?.response?.data?.message ?? "Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, loading };
};
