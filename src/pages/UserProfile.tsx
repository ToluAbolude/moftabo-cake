
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Calendar } from "lucide-react";

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchUserAndProfile() {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error || !data.session) {
          navigate("/signin");
          toast({ title: "Please sign in to view your profile", variant: "destructive" });
          return;
        }
        
        setUser(data.session.user);
        
        // Fetch user profile from profiles table
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();

        if (profileError) {
          console.error("Profile error:", profileError);
          // If no profile exists, create one
          if (profileError.code === 'PGRST116') {
            const { data: newProfile, error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: data.session.user.id,
                email: data.session.user.email,
                full_name: data.session.user.user_metadata?.full_name || data.session.user.user_metadata?.name,
                avatar_url: data.session.user.user_metadata?.avatar_url || data.session.user.user_metadata?.picture
              })
              .select()
              .single();
            
            if (insertError) {
              console.error("Error creating profile:", insertError);
            } else {
              setProfile(newProfile);
            }
          }
        } else {
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Failed to get session:", error);
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    }

    fetchUserAndProfile();
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({ title: "Logged out successfully" });
      setUser(null);
      setProfile(null);
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({ title: "Failed to log out", variant: "destructive" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
            <Button onClick={() => navigate("/signin")}>Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-r from-soft-purple/70 to-white">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-20 w-20">
              <AvatarImage 
                src={profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture} 
                alt="Profile picture" 
              />
              <AvatarFallback className="bg-cake-purple text-white text-lg">
                {getInitials(profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-cake-purple">My Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-cake-purple" />
              <div>
                <span className="text-sm text-gray-600">Full Name:</span>
                <div className="text-gray-900 font-medium">
                  {profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || "Not provided"}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-cake-purple" />
              <div>
                <span className="text-sm text-gray-600">Email:</span>
                <div className="text-gray-900 font-medium">{profile?.email || user.email}</div>
              </div>
            </div>
            
            {profile?.created_at && (
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-cake-purple" />
                <div>
                  <span className="text-sm text-gray-600">Member since:</span>
                  <div className="text-gray-900 font-medium">{formatDate(profile.created_at)}</div>
                </div>
              </div>
            )}
            
            <div className="pt-4 space-y-3">
              <Button 
                onClick={() => navigate("/orders")} 
                variant="outline" 
                className="w-full"
              >
                View My Orders
              </Button>
              <Button onClick={handleLogout} variant="outline" className="w-full">
                Log Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
