
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  ListChecks,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const StudentDashboard = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const createLink = (href: string) => {
    const params = new URLSearchParams(searchParams);
    return `${href}?${params.toString()}`;
  }

  const studentCards = [
    {
      title: "My Profile",
      description: "Complete your profile to get personalized recommendations.",
      icon: <Target className="h-6 w-6 text-primary" />,
      link: createLink("/profiler"),
      cta: "Complete Profile",
    },
    {
      title: "Explore Careers",
      description: "Discover career paths that match your interests and skills.",
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      link: createLink("/career"),
      cta: "Explore Now",
    },
    {
      title: "Find Degrees",
      description: "Search for degrees and programs from top universities.",
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      link: createLink("/degree"),
      cta: "Find Degrees",
    },
    {
      title: "Action Plan",
      description: "View and manage your tasks to stay on track.",
      icon: <ListChecks className="h-6 w-6 text-primary" />,
      link: createLink("/planner"),
      cta: "View Plan",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome, Student!</h1>
        <p className="text-muted-foreground">Here's a snapshot of your journey.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {studentCards.map((card) => (
          <Card key={card.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{card.title}</CardTitle>
                {card.icon}
              </div>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild className="w-full">
                <Link href={card.link}>
                  {card.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>AI Advisor</CardTitle>
          <CardDescription>Get instant, personalized advice for your career and education questions.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="mb-4 text-muted-foreground">Ready to explore your future? Our AI is here to help you navigate your options.</p>
             <Button asChild>
                <Link href={createLink("/ai-advisor")}>
                  Ask AI Advisor <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">Oversee and manage the platform.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View and manage student and counselor accounts.</CardDescription>
          </CardHeader>
          <CardContent><p>1,250 Active Students</p></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>Update information about careers, colleges, and degrees.</CardDescription>
          </CardHeader>
           <CardContent><p>300 Careers, 1500 Colleges</p></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Analytics</CardTitle>
            <CardDescription>Monitor platform usage and performance.</CardDescription>
          </CardHeader>
           <CardContent><p>Usage is up 15% this month.</p></CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <StudentDashboard />;
}
