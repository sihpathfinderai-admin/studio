

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
  BookCopy,
  Building,
  FileText,
  MessageSquareWarning,
  GitMerge,
  WifiOff,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

const StudentDashboardInternal = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const createLink = (href: string) => {
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
      title: "Explore Streams",
      description: "Discover educational streams that fit you.",
      icon: <BookCopy className="h-6 w-6 text-primary" />,
      link: createLink("/stream"),
      cta: "Explore Streams",
    },
    {
        title: "Find Degrees",
        description: "Search for degrees and programs from top universities.",
        icon: <GraduationCap className="h-6 w-6 text-primary" />,
        link: createLink("/degree"),
        cta: "Find Degrees",
    },
    {
      title: "Explore Careers",
      description: "Discover career paths that match your interests and skills.",
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      link: createLink("/career"),
      cta: "Explore Now",
    },
    {
        title: "Action Plan",
        description: "View and manage your tasks to stay on track.",
        icon: <ListChecks className="h-6 w-6 text-primary" />,
        link: createLink("/planner"),
        cta: "View Plan",
    },
    {
        title: "College Locator",
        description: "Find the perfect college for your chosen path.",
        icon: <Building className="h-6 w-6 text-primary" />,
        link: createLink("/colleges"),
        cta: "Find Colleges",
    },
    {
        title: "My Roadmap",
        description: "Visualize your educational and career timeline.",
        icon: <GitMerge className="h-6 w-6 text-primary" />,
        link: createLink("/timeline"),
        cta: "View Timeline",
    },
    {
        title: "Learning Resources",
        description: "Access curated materials to help you succeed.",
        icon: <BookCopy className="h-6 w-6 text-primary" />,
        link: createLink("/resources"),
        cta: "Browse Resources",
    },
    {
        title: "Resume Builder",
        description: "Create a professional resume in minutes.",
        icon: <FileText className="h-6 w-6 text-primary" />,
        link: createLink("/resume"),
        cta: "Build Resume",
    },
     {
        title: "Send Feedback",
        description: "Share your thoughts to help us improve the platform.",
        icon: <MessageSquareWarning className="h-6 w-6 text-primary" />,
        link: createLink("/feedback"),
        cta: "Give Feedback",
    },
    {
        title: "Offline Access",
        description: "Access your saved resources without an internet connection.",
        icon: <WifiOff className="h-6 w-6 text-primary" />,
        link: createLink("/offline"),
        cta: "View Offline Content",
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Hi Gowtham, continue your career journey!</h1>
        <p className="text-muted-foreground">Here's a snapshot of your journey.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          </Header>
           <CardContent><p>300 Careers, 1500 Colleges</p></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Analytics</CardTitle>
            <CardDescription>Monitor platform usage and performance.</CardDescription>
          </Header>
           <CardContent><p>Usage is up 15% this month.</p></CardContent>
        </Card>
      </div>
    </div>
  );
};

function DashboardPageInternal() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <StudentDashboardInternal />;
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardPageInternal />
    </Suspense>
  )
}
