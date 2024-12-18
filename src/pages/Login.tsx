import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AuthChangeEvent } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    // Listen for auth errors
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
      if (event === 'SIGNED_OUT') {
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-[#1B3B35] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#1B3B35] text-center mb-8">Welcome to Praxis</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#1B3B35',
                  brandAccent: '#FFD700',
                  inputText: '#1B3B35',
                  inputBackground: 'white',
                  inputBorder: '#E2E8F0',
                  inputBorderHover: '#1B3B35',
                  inputBorderFocus: '#1B3B35',
                }
              }
            },
            style: {
              button: {
                borderRadius: '0.375rem',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                fontWeight: '500',
              },
              input: {
                borderRadius: '0.375rem',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
              },
              anchor: {
                color: '#1B3B35',
                textDecoration: 'underline',
              },
              message: {
                color: 'red',
                fontSize: '0.875rem',
                marginTop: '0.5rem',
              }
            },
          }}
          providers={[]}
          redirectTo={window.location.origin}
          onError={(error) => {
            toast({
              title: "Authentication Error",
              description: error.message,
              variant: "destructive",
            });
          }}
        />
      </div>
    </div>
  );
};

export default Login;