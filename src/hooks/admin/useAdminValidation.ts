
import { supabase } from "@/integrations/supabase/client";

export const useAdminValidation = () => {
  const validateAdminAccess = async () => {
    try {
      const { data: isAdminResult, error } = await supabase.rpc('is_admin');
      if (error) {
        console.error("Error checking admin status:", error);
        return false;
      }
      return isAdminResult;
    } catch (error) {
      console.error("Error validating admin access:", error);
      return false;
    }
  };

  const logAuditAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      try {
        await supabase.from('audit_logs').insert({
          user_id: session.user.id,
          action: 'DASHBOARD_ACCESS',
          table_name: 'orders',
          new_data: { 
            accessed_at: new Date().toISOString()
          }
        });
      } catch (err) {
        console.error("Failed to log dashboard access:", err);
      }
    }
  };

  return {
    validateAdminAccess,
    logAuditAccess
  };
};
