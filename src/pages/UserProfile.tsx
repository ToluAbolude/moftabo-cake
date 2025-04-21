
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Get supabase client from window object, if available
const supabase = (window as any).supabase;

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSession() {
      try {
        // Check if supabase client exists
        if (!supabase) {
          console.error("Supabase client not found");
          setLoading(false);
          return;
        }

        // Check for getSession method and use it properly
        if (typeof supabase.auth.getSession === 'function') {
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("Session error:", error);
            navigate("/register");
            return;
          }
          
          if (!data.session?.user) {
            navigate("/register");
          } else {
            setUser(data.session.user);
          }
        } else {
          console.error("supabase.auth.getSession is not a function");
          navigate("/register");
        }
      } catch (error) {
        console.error("Failed to get session:", error);
        navigate("/register");
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [navigate]);

  const handleLogout = async () => {
    if (!supabase) {
      toast({ title: "Supabase client not available", variant: "destructive" });
      return;
    }
    
    try {
      await supabase.auth.signOut();
      toast({ title: "Logged out successfully" });
      setUser(null);
      navigate("/register");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({ title: "Failed to log out", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div>Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center py-24">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Not Logged In</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">You need to log in to view your profile.</p>
            <Button onClick={() => navigate("/register")}>Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-r from-soft-purple/70 to-white">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-cake-purple">My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <span className="text-gray-600">Email:</span>
              <div className="text-gray-900 font-medium">{user.email}</div>
            </div>
            <div>
              <span className="text-gray-600">ID:</span>
              <div className="text-xs text-gray-400">{user.id}</div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="w-full mt-4">
              Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
