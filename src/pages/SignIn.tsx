
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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
        navigate("/profile");
      }
    } catch (err: any) {
      toast({ title: "Sign in failed. Try again.", variant: "destructive" });
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
            <div className="text-sm text-center mt-2">
              New to Moftabo?{" "}
              <Link to="/register" className="text-cake-purple hover:underline">Create an account</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;

