import { useVerify } from "@/hooks/use-verify";
import { useAuthStore } from "@/store/auth.store";

export const AppInit = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((s) => s.token);
  const { isLoading } = useVerify();

  if (token && isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
