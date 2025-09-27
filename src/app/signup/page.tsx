
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Eye, EyeOff, ShieldAlert, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signUpWithEmail } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dialog, setDialog] = useState<{ title: string; message: string; isError: boolean } | null>(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName) {
        setDialog({
            isError: true,
            title: 'Sign Up Failed',
            message: 'Please enter your full name.',
        });
        return;
    }
    setLoading(true);
    const { user, error } = await signUpWithEmail(email, password, fullName);
    setLoading(false);

    if (error) {
      setDialog({
        isError: true,
        title: 'Sign Up Failed',
        message: error.message,
      });
    } else {
      setDialog({
        isError: false,
        title: 'Account Created',
        message: "Welcome! You're now being redirected to your dashboard.",
      });
    }
  };

  const closeDialogAndRedirect = () => {
    setDialog(null);
    if (dialog && !dialog.isError) {
      router.push('/dashboard?role=student');
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-background to-card">
       <AlertDialog open={!!dialog} onOpenChange={() => dialog?.isError && setDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center text-center">
            {dialog?.isError ? (
              <ShieldAlert className="w-12 h-12 text-destructive" />
            ) : (
              <CheckCircle2 className="w-12 h-12 text-primary" />
            )}
            <AlertDialogTitle className="text-2xl">{dialog?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialog?.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeDialogAndRedirect} className="w-full">
                {dialog?.isError ? 'Close' : 'Go to Dashboard'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

       <div className="absolute top-4 left-4">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <Card className="w-full max-w-md z-10 shadow-2xl shadow-primary/10">
        <CardHeader className="items-center text-center">
          <div className="p-3 bg-primary/10 rounded-full mb-4 border border-primary/20">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
          <CardDescription className="text-lg">Start your journey with PathFinder AI</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input 
                id="fullname" 
                type="text" 
                placeholder="John Doe" 
                required 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john.doe@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
      <footer className="z-10 mt-8 text-center text-muted-foreground text-sm">
        <p>PathFinder AI &copy; {new Date().getFullYear()}.</p>
      </footer>
    </main>
  );
}
