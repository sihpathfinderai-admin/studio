import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-background to-card">
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <Card className="w-full max-w-md z-10 shadow-2xl shadow-primary/10">
        <CardHeader className="items-center text-center">
          <div className="p-3 bg-primary/10 rounded-full mb-4 border border-primary/20">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">Welcome to PathWise</CardTitle>
          <CardDescription className="text-lg">Your Personal Career & Education Advisor</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-center text-muted-foreground">Select your role to continue</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild size="lg" className="h-12 text-base">
              <Link href="/dashboard?role=student">
                I am a Student
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="h-12 text-base">
              <Link href="/dashboard?role=admin">
                I am an Admin
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <footer className="z-10 mt-8 text-center text-muted-foreground text-sm">
        <p>PathWise AI &copy; {new Date().getFullYear()}. Prototype Version.</p>
      </footer>
    </main>
  );
}
