
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// You must have supabase client set up via Lovable's integration
const supabase = (window as any).supabase;

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const session = supabase.auth.getSession
      ? supabase.auth.getSession()
      : Promise.resolve({ data: { session: null } });
    session.then(({ data }) => {
      if (!data.session?.user) {
        navigate("/register");
      } else {
        setUser(data.session.user);
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out successfully" });
    setUser(null);
    navigate("/register");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center py-24">
        <div>Loading profile...</div>
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
