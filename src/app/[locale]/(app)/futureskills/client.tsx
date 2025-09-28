'use client';

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { getSkills, type FormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Radar, Search, Briefcase, Award, Zap, GitBranch } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { FutureSkillsOutput } from "@/ai/flows/future-skills-radar";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Search className="mr-2 h-4 w-4" />
          Get Skill Insights
        </>
      )}
    </Button>
  );
}

function ResultsDisplay({ data }: { data: FutureSkillsOutput }) {
    return (
        <div className="space-y-8 mt-8">
            <Card>
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <GitBranch className="w-6 h-6 text-primary" />
                    <CardTitle>Your Future-Proof Skill Upgrade Path</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{data.upgradePath}</p>
                </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-1">
                <Card>
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <Zap className="w-6 h-6 text-primary" />
                        <CardTitle>Emerging Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {data.emergingSkills.map((item, index) => (
                                <li key={index} className="border-b pb-2">
                                    <p className="font-semibold">{item.skill}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <Award className="w-6 h-6 text-primary" />
                        <CardTitle>Recommended Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-4">
                            {data.certifications.map((item, index) => (
                                <li key={index} className="border-b pb-2">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">by {item.authority}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <Briefcase className="w-6 h-6 text-primary" />
                        <CardTitle>Trending Technologies & Tools</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {data.trendingTechnologies.map((item, index) => (
                                <li key={index} className="border-b pb-2">
                                    <p className="font-semibold">{item.technology}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export function FutureSkillsClient() {
  const { toast } = useToast();
  const initialState: FormState = { message: "" };
  const [state, formAction] = useActionState(getSkills, initialState);

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
        <div className="flex items-center gap-3 mb-2">
            <Radar className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold font-headline">Future Skills Radar</h1>
        </div>
        <p className="text-muted-foreground">
          Get AI-powered insights on emerging skills and technologies in your chosen field.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Analyze Your Career Path</CardTitle>
            <CardDescription>Enter a career or degree path to see what the future holds.</CardDescription>
        </CardHeader>
        <CardContent>
            <form action={formAction} className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="careerPath">Career / Degree Path</Label>
                    <Input
                        id="careerPath"
                        name="careerPath"
                        placeholder="e.g., 'Software Engineer', 'Data Scientist', 'B.S. in Marketing'"
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
