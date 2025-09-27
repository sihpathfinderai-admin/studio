
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-background to-card">
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
          <CardTitle className="text-3xl font-headline">Welcome Back</CardTitle>
          <CardDescription className="text-lg">Sign in to your PathWise account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="student@pathwise.ai" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full h-12 text-base">
              <Link href="/dashboard?role=student">
                Sign In
              </Link>
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
      <footer className="z-10 mt-8 text-center text-muted-foreground text-sm">
        <p>PathWise AI &copy; {new Date().getFullYear()}. Prototype Version.</p>
      </footer>
    </main>
  );
}
