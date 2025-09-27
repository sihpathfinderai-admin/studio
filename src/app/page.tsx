import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, HelpCircle, Info, Mail, Phone, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
            <span className="text-xl font-bold">PathFinder AI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#overview" className="text-sm font-medium transition-colors hover:text-primary">Overview</Link>
            <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">About Us</Link>
            <Link href="#faq" className="text-sm font-medium transition-colors hover:text-primary">FAQ</Link>
            <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
             <Button asChild variant="secondary">
                <Link href="/login">Login</Link>
            </Button>
             <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Language Selector</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-background to-card">
           <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="container mx-auto px-4 md:px-6 text-center z-10 relative">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
              Your Future, Intelligently Guided
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
              PathFinder AI is a government-led initiative to provide personalized career and education counseling to every student.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">What PathFinder AI Offers</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg mt-4">
                A comprehensive platform to discover, plan, and achieve your career goals.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Roadmaps</CardTitle>
                  <CardDescription>AI-driven suggestions for careers, degrees, and colleges based on your unique profile.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Expert Connections</CardTitle>
                  <CardDescription>Connect with certified career counselors for one-on-one guidance and support.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Resource Hub</CardTitle>
                  <CardDescription>Access a curated library of learning materials, resume builders, and application trackers.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="bg-card py-16 md:py-24">
          <div className="container mx-auto grid items-center gap-8 px-4 md:grid-cols-2 md:px-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">About Us</h2>
              <p className="mt-4 text-muted-foreground">
                PathFinder AI is a flagship initiative by the Ministry of Education, designed to democratize career counseling. Our mission is to empower every student with the tools and information needed to make informed decisions about their future, fostering a skilled and future-ready workforce for the nation.
              </p>
            </div>
            <div className="flex justify-center">
                <Info className="h-32 w-32 text-primary"/>
            </div>
          </div>
        </section>

        {/* AI Advisor Chatbot Intro */}
        <section id="chatbot-intro" className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-primary"/>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mt-4">Meet Your AI Advisor</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg mt-4">
                    Get instant answers to your career questions. Our AI chatbot is available 24/7 to provide guidance, suggest resources, and help you explore your options. This is a non-interactive preview.
                </p>
                <Card className="mt-8 max-w-2xl mx-auto text-left">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                            </div>
                            <div className="bg-muted p-3 rounded-lg">
                                <p className="text-sm">Hi! I can help you with career choices. How can I assist you today?</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-card py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg mt-4">
                Have questions? We have answers.
              </p>
            </div>
            <Accordion type="single" collapsible className="mx-auto mt-12 max-w-3xl">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is PathFinder AI free?</AccordionTrigger>
                <AccordionContent>
                  Yes, PathFinder AI is a government-funded initiative and is completely free for all students in the country.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Who can use this platform?</AccordionTrigger>
                <AccordionContent>
                  The platform is designed for students from 9th grade onwards, but anyone seeking career guidance is welcome to use it.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How is my data used?</AccordionTrigger>
                <AccordionContent>
                  Your data is used solely to personalize your recommendations and is protected under strict privacy policies. It is not shared with any third parties without your explicit consent.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Get in Touch</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg mt-4">
              Our support team is here to help you.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
                <Card className="text-left">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <Phone className="w-8 h-8 text-primary"/>
                        <CardTitle>Helpline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">For immediate assistance, call our national helpline.</p>
                        <p className="text-lg font-semibold mt-2">1-800-123-4567</p>
                    </CardContent>
                </Card>
                 <Card className="text-left">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <Mail className="w-8 h-8 text-primary"/>
                        <CardTitle>Email Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Send us your queries and we'll get back to you.</p>
                        <p className="text-lg font-semibold mt-2">support@pathfinder.gov.in</p>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} PathFinder AI. A Government Initiative. All rights reserved.</p>
          <div className="flex items-center gap-4">
             <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">Privacy Policy</Link>
             <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
