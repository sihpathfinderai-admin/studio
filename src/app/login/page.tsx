

'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Eye, EyeOff, User, Shield, ShieldAlert, CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signInWithEmail, sendPasswordReset } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

const LoginForm = ({ role, onBack }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ title: string; message: string } | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ role: 'admin' | 'student' } | null>(null);

  const [resetEmail, setResetEmail] = useState('');
  const [resetDialog, setResetDialog] = useState<{ open: boolean; state: 'idle' | 'loading' | 'success' | 'error', message?: string}>({ open: false, state: 'idle' });


  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { user, error: authError, role: userRole } = await signInWithEmail(email, password, role);
    setLoading(false);
    
    if (authError) {
      let message = authError.message;
      if (authError.code === 'auth/invalid-credential') {
        message = 'Incorrect email or password. Please try again.';
      }
      setError({
        title: 'Sign In Failed',
        message: message,
      });
    } else {
        setSuccessInfo({ role: userRole });
    }
  };
  
  const handlePasswordReset = async () => {
    setResetDialog(prev => ({ ...prev, state: 'loading' }));
    const { error } = await sendPasswordReset(resetEmail);
    if (error) {
        setResetDialog(prev => ({ ...prev, state: 'error', message: error.message }));
    } else {
        setResetDialog(prev => ({ ...prev, state: 'success', message: "A password reset link has been sent to your email. Please check your spam folder if you don't see it." }));
    }
  }

  const closeSuccessDialogAndRedirect = () => {
    if (successInfo) {
      if (successInfo.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard?role=student');
      }
      setSuccessInfo(null);
    }
  };

  return (
    <div>
       <AlertDialog open={!!error} onOpenChange={() => setError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center text-center">
            <ShieldAlert className="w-12 h-12 text-primary" />
            <AlertDialogTitle className="text-2xl">{error?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {error?.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setError(null)} className="w-full">Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!successInfo} onOpenChange={() => successInfo && closeSuccessDialogAndRedirect()}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center text-center">
            <CheckCircle2 className="w-12 h-12 text-primary" />
            <AlertDialogTitle className="text-2xl">Sign In Successful</AlertDialogTitle>
            <AlertDialogDescription>
             Welcome back! Redirecting you to the {successInfo?.role} dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeSuccessDialogAndRedirect} className="w-full">
                Go to Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Dialog open={resetDialog.open} onOpenChange={(open) => setResetDialog({ open, state: 'idle'})}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogDescription>
                    Enter your email address and we'll send you a link to reset your password.
                </DialogDescription>
            </DialogHeader>
            {resetDialog.state === 'success' || resetDialog.state === 'error' ? (
                 <div className="flex flex-col items-center text-center gap-4 p-4">
                    {resetDialog.state === 'success' ? <CheckCircle2 className="w-12 h-12 text-primary"/> : <ShieldAlert className="w-12 h-12 text-destructive"/>}
                    <p>{resetDialog.message}</p>
                    <Button onClick={() => setResetDialog({ open: false, state: 'idle' })} className="w-full">Close</Button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="reset-email">Email</Label>
                        <Input 
                            id="reset-email" 
                            type="email" 
                            placeholder="you@example.com" 
                            value={resetEmail} 
                            onChange={(e) => setResetEmail(e.target.value)}
                            disabled={resetDialog.state === 'loading'}
                        />
                    </div>
                    <Button onClick={handlePasswordReset} className="w-full" disabled={resetDialog.state === 'loading'}>
                        {resetDialog.state === 'loading' ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                </div>
            )}
        </DialogContent>
      </Dialog>

      <form onSubmit={handleSignIn} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder={role === 'student' ? 'student@pathwise.ai' : 'admin@pathwise.ai'}
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
             <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-xs text-primary hover:underline"
                onClick={() => setResetDialog({ open: true, state: 'idle' })}
            >
                Forgot password?
            </Button>
          </div>
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
          {loading ? 'Signing In...' : `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
        </Button>
      </form>
       <p className="mt-4 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

const RoleSelector = ({ onSelectRole }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
            className="cursor-pointer hover:bg-accent hover:border-primary transition-all"
            onClick={() => onSelectRole('student')}
        >
            <CardHeader className="items-center text-center">
                <User className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Student</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                    Access your personalized career roadmap, profiler, and resources.
                </p>
            </CardContent>
        </Card>
        <Card 
            className="cursor-pointer hover:bg-accent hover:border-primary transition-all"
            onClick={() => onSelectRole('admin')}
        >
            <CardHeader className="items-center text-center">
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Admin</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                    Access the admin dashboard to manage students and platform content.
                </p>
            </CardContent>
        </Card>
    </div>
);


export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-background to-card">
      <div className="absolute top-4 left-4 z-10">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <Card className="w-full max-w-xl z-10 shadow-2xl shadow-primary/10">
        <CardHeader className="relative items-center text-center pt-12">
            {selectedRole && (
                 <Button variant="ghost" onClick={() => setSelectedRole(null)} className="absolute top-4 left-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            )}
          <div className="p-3 bg-primary/10 rounded-full mb-4 border border-primary/20">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">
            {selectedRole ? `Welcome ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}` : 'Choose Your Role'}
          </CardTitle>
          <CardDescription className="text-lg">
            {selectedRole ? 'Sign in to your PathFinder AI account' : 'Please select how you would like to access PathFinder AI.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {selectedRole ? (
            <LoginForm role={selectedRole} onBack={() => setSelectedRole(null)} />
          ) : (
            <RoleSelector onSelectRole={setSelectedRole} />
          )}
        </CardContent>
      </Card>
      <footer className="z-10 mt-8 text-center text-muted-foreground text-sm">
        <p>PathFinder AI &copy; {new Date().getFullYear()}.</p>
      </footer>
    </main>
  );
}
