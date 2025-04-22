
-- Function to safely assign admin role to the admin user if needed
CREATE OR REPLACE FUNCTION public.assign_admin_role_if_needed(user_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Check if this user should be an admin (based on email)
  IF EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = user_id AND email = 'admin@moftabo.com'
  ) THEN
    -- Check if user already has admin role
    IF NOT EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = $1 AND role = 'admin'
    ) THEN
      -- Insert or update the role to admin
      INSERT INTO public.user_roles (user_id, role)
      VALUES ($1, 'admin')
      ON CONFLICT (user_id) 
      DO UPDATE SET role = 'admin';
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
