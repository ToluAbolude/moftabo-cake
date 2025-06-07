
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Facebook } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Provider } from "@supabase/supabase-js";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    if (!form.email.includes("@")) {
      toast({ title: "Please enter a valid email.", variant: "destructive" });
      return false;
    }
    if (form.password.length < 6) {
      toast({ title: "Password must be at least 6 characters.", variant: "destructive" });
      return false;
    }
    if (form.password !== form.confirm) {
      toast({ title: "Passwords do not match.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInput()) return;

    // Enhanced security: Don't allow registration with admin email
    if (form.email === 'admin@moftabo.com') {
      toast({ title: "This email is reserved for system administrators.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error: signUpError, data } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/profile`
        }
      });
      
      if (signUpError) {
        toast({ title: signUpError.message, variant: "destructive" });
        return;
      }

      if (data.user) {
        // Log user registration for audit trail
        try {
          await supabase.from('audit_logs').insert({
            user_id: data.user.id,
            action: 'USER_REGISTRATION',
            new_data: { 
              registration_time: new Date().toISOString(),
              user_email: form.email 
            }
          });
        } catch (err) {
          console.error("Failed to log user registration:", err);
        }

        toast({ title: "Registration successful! Please check your email for confirmation." });
        navigate("/profile");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      toast({ title: "Registration failed. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: Provider) => {
    setLoading(true);
    try {
      let { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + '/profile',
        },
      });
      if (error) {
        toast({ title: error.message, variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: `${provider} sign up failed. Try again.`, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-soft-purple">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-cake-purple">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              onChange={handleChange}
              value={form.email}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password (min 6 characters)"
              autoComplete="new-password"
              onChange={handleChange}
              value={form.password}
              required
            />
            <Input
              name="confirm"
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              onChange={handleChange}
              value={form.confirm}
              required
            />
            <Button type="submit" disabled={loading} className="w-full bg-cake-purple hover:bg-cake-dark-purple">
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <div className="mt-6 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={() => handleSocialSignIn('facebook')}
              disabled={loading}
            >
              <Facebook className="h-5 w-5 mr-2 text-blue-600" />
              Facebook
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={() => handleSocialSignIn('google')}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link to="/signin" className="text-cake-purple hover:underline">Sign in</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
