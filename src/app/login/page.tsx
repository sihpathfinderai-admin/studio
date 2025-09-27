
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Eye, EyeOff, User, Shield } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signInWithEmail } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const LoginForm = ({ role, onBack }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ title: string; message: string } | null>(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { user, error: authError, role: userRole } = await signInWithEmail(email, password, role);
    setLoading(false);
    
    if (authError) {
      setError({
        title: 'Sign In Failed',
        message: authError.message,
      });
    } else {
      if (userRole === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard?role=student');
      }
    }
  };

  return (
    <div>
      <AlertDialog open={!!error} onOpenChange={() => setError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{error?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {error?.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setError(null)}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

        <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to role selection
        </Button>
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
        <div className="space-y-2 relative">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
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
            className="absolute right-1 top-7 h-8 w-8 text-muted-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
          </Button>
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
      <Card className="w-full max-w-lg z-10 shadow-2xl shadow-primary/10">
        <CardHeader className="items-center text-center">
          <div className="p-3 bg-primary/10 rounded-full mb-4 border border-primary/20">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">
            {selectedRole ? `Welcome ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}` : 'Choose Your Role'}
          </CardTitle>
          <CardDescription className="text-lg">
            {selectedRole ? 'Sign in to your PathWise account' : 'Please select how you would like to access PathWise AI.'}
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
        <p>PathWise AI &copy; {new Date().getFullYear()}.</p>
      </footer>
    </main>
  );
}
