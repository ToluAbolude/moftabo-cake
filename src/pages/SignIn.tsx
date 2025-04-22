
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram } from "lucide-react";

// You must have supabase client set up via Lovable's integration
const supabase = (window as any).supabase;

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<"customer" | "admin">("customer");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.includes("@")) {
      toast({ title: "Please enter a valid email.", variant: "destructive" });
      return;
    }
    if (!form.password) {
      toast({ title: "Please enter your password.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) {
        toast({ title: error.message, variant: "destructive" });
      } else {
        toast({ title: "Welcome back!" });
        // Redirect based on user type
        if (userType === "admin") {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      }
    } catch (err: any) {
      toast({ title: "Sign in failed. Try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'facebook' | 'google' | 'instagram') => {
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
      toast({ title: `${provider} sign in failed. Try again.`, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-soft-purple">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-cake-purple">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6 gap-4">
            <Button 
              type="button" 
              variant={userType === "customer" ? "default" : "outline"}
              className={userType === "customer" ? "bg-cake-purple hover:bg-cake-dark-purple flex-1" : "flex-1"}
              onClick={() => setUserType("customer")}
            >
              Customer
            </Button>
            <Button 
              type="button"
              variant={userType === "admin" ? "default" : "outline"}
              className={userType === "admin" ? "bg-cake-purple hover:bg-cake-dark-purple flex-1" : "flex-1"}
              onClick={() => setUserType("admin")}
            >
              Admin
            </Button>
          </div>
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
              placeholder="Password"
              autoComplete="current-password"
              onChange={handleChange}
              value={form.password}
              required
            />
            <Button type="submit" disabled={loading} className="w-full bg-cake-purple hover:bg-cake-dark-purple">
              {loading ? "Signing in..." : "Sign In"}
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
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={() => handleSocialSignIn('instagram')}
              disabled={loading}
            >
              <Instagram className="h-5 w-5 mr-2 text-pink-600" />
              Instagram
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-center mt-2">
            New to Moftabo?{" "}
            <Link to="/register" className="text-cake-purple hover:underline">Create an account</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
