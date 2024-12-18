import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      console.log("Auth state changed:", event, session);
      if (session) {
        navigate("/");
        toast({
          title: "Logged in successfully",
          description: "Welcome back!",
        });
      }
    });

    // Check initial session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();
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
                  messageText: '#EF4444',
                  messageBackground: '#FEE2E2',
                  messageBorder: '#FECACA',
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
                padding: '0.75rem',
                marginBottom: '1rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
              }
            },
          }}
          providers={[]}
          redirectTo={window.location.origin}
        />
      </div>
    </div>
  );
};

export default Login;