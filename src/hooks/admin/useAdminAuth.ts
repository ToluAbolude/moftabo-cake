
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Please sign in as admin to access this page", variant: "destructive" });
        navigate("/signin");
        return false;
      }

      if (session.user.email !== 'admin@moftabo.com') {
        toast({ title: "You do not have admin access", variant: "destructive" });
        navigate("/");
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error checking admin access:", error);
      toast({ title: "Authentication error", variant: "destructive" });
      navigate("/signin");
      return false;
    }
  };

  return { checkAdminAccess };
};
