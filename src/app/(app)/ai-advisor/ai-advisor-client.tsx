"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { getSuggestions, type FormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bot, Library, GraduationCap, Network, Building, Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Getting Suggestions...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Get AI Suggestions
        </>
      )}
    </Button>
  );
}

function ResultsDisplay({ data }: { data: FormState['data'] }) {
    if (!data) return null;

    const results = [
        { title: 'Learning Resources', content: data.learningResources, icon: <Library className="w-6 h-6 text-primary" /> },
        { title: 'Colleges', content: data.colleges, icon: <Building className="w-6 h-6 text-primary" /> },
        { title: 'Degrees', content: data.degrees, icon: <GraduationCap className="w-6 h-6 text-primary" /> },
        { title: 'Streams', content: data.streams, icon: <Network className="w-6 h-6 text-primary" /> },
    ];

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 font-headline">Your Personalized Suggestions</h2>
            <div className="grid gap-6 md:grid-cols-2">
                {results.map(result => (
                    <Card key={result.title}>
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            {result.icon}
                            <CardTitle>{result.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-muted-foreground whitespace-pre-wrap">{result.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export function AiAdvisorClient() {
  const { toast } = useToast();
  const initialState: FormState = { message: "" };
  const [state, formAction] = useActionState(getSuggestions, initialState);

  useEffect(() => {
    if (state.message && state.message !== "success") {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI-Powered Career Advisor</h1>
        <p className="text-muted-foreground">
          Fill in your details and let our AI provide personalized recommendations for your future.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Your Information</CardTitle>
            <CardDescription>The more detail you provide, the better the suggestions will be.</CardDescription>
        </CardHeader>
        <CardContent>
            <form action={formAction} className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="profileData">Your Profile</Label>
                    <Textarea
                        id="profileData"
                        name="profileData"
                        placeholder="Describe your interests, skills, academic background, and any projects you've worked on. e.g., 'I am interested in creative arts and technology. I have experience with Python and enjoy building small games. I am in 12th grade with a focus on computer science.'"
                        rows={6}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="preferences">Your Preferences</Label>
                    <Textarea
                        id="preferences"
                        name="preferences"
                        placeholder="What are you looking for? e.g., 'I prefer project-based learning, am looking for colleges in California, and am interested in Bachelor of Science degrees. I'm open to both Computer Science and Digital Media streams.'"
                        rows={6}
                        required
                    />
                </div>
                <SubmitButton />
            </form>
        </CardContent>
      </Card>
      
      {state.data && <ResultsDisplay data={state.data} />}
    </div>
  );
}
