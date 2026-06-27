import { verify } from "@/api/verify.api";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";

export const useVerify = () => {
  const token = useAuthStore((s) => s.token);
  const setAdmin = useAuthStore((s) => s.setAdmin);
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);

  const query = useQuery({
    queryKey: ["verify"],
    queryFn: verify,
    enabled: !!token,
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setAdmin(query.data.data.admin);
      setAuth(true);
    }

    if (query.isError) {
      logout();
    }
  }, [query.isSuccess, query.isError, query.data]);

  return query;
};
