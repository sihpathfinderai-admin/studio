
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, BookOpen, BrainCircuit, Users } from 'lucide-react';

const aptitudeQuestions = [
  {
    question: 'If a car travels at 60 km/h, how far will it travel in 2.5 hours?',
    options: ['120 km', '150 km', '180 km', '200 km'],
    answer: '150 km',
  },
  {
    question: 'Which number comes next in the series: 2, 4, 8, 16, ...?',
    options: ['24', '32', '48', '64'],
    answer: '32',
  },
];

const interestQuestions = [
    { id: 'arts', label: 'Creating or appreciating art and design' },
    { id: 'science', label: 'Conducting experiments and scientific inquiry' },
    { id: 'tech', label: 'Working with computers and technology' },
    { id: 'business', label: 'Managing projects and leading teams' },
];

const personalityQuestions = [
    { question: 'When working on a project, you prefer to:', options: ['Work alone', 'Work in a team'] },
    { question: 'When faced with a difficult problem, you:', options: ['Follow a known approach', 'Experiment with new ideas'] },
];

const chartData = [
  { category: 'Logical', score: 85, fullMark: 100 },
  { category: 'Creative', score: 70, fullMark: 100 },
  { category: 'Analytical', score: 90, fullMark: 100 },
  { category: 'Social', score: 60, fullMark: 100 },
  { category: 'Technical', score: 75, fullMark: 100 },
];

const chartConfig = {
  score: {
    label: 'Score',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;


export default function ProfilerPage() {
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  const totalQuestions = aptitudeQuestions.length + interestQuestions.length + personalityQuestions.length;
  
  const handleInteraction = () => {
    setProgress(prev => Math.min(prev + (100 / totalQuestions), 100));
  }

  if (testSubmitted) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Profiler Results</h1>
          <p className="text-muted-foreground">Here is your generated profile based on the test.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BarChart className="w-6 h-6"/>
                Your Profile Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-semibold text-lg mb-2">Top Strengths:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Analytical Reasoning</li>
                <li>Logical Problem-Solving</li>
                <li>Interest in Technology</li>
              </ul>
               <Button className="mt-6 w-full">Save to Dashboard</Button>
            </div>
            <ChartContainer config={chartConfig} className="w-full h-[300px]">
              <ResponsiveContainer>
                <RadarChart data={chartData}>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <Radar
                    dataKey="score"
                    fill="var(--color-score)"
                    fillOpacity={0.6}
                    dot={{
                      r: 4,
                      fillOpacity: 1,
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Profiler</h1>
          <p className="text-muted-foreground">Take the test to discover your strengths and interests.</p>
        </div>
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <CardTitle>Start Your Profiler Test</CardTitle>
            <CardDescription>
              This test will help us understand your aptitudes, interests, and personality. Your results will be used to generate personalized career and education recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" onClick={() => setTestStarted(true)}>
              Start Test
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">Profiler Test</h1>
        <p className="text-muted-foreground">Complete all sections to view your profile.</p>
      </div>

      <Card>
        <CardHeader>
            <Progress value={progress} className="mb-4"/>
            <CardTitle>Complete the Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="aptitude" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="aptitude"><BrainCircuit className="mr-2"/>Aptitude</TabsTrigger>
              <TabsTrigger value="interests"><BookOpen className="mr-2"/>Interests</TabsTrigger>
              <TabsTrigger value="personality"><Users className="mr-2"/>Personality</TabsTrigger>
            </TabsList>
            <TabsContent value="aptitude" className="pt-6">
                <div className="space-y-6">
                    {aptitudeQuestions.map((q, i) => (
                        <div key={i} className="space-y-3">
                            <Label>{i + 1}. {q.question}</Label>
                            <RadioGroup onValueChange={handleInteraction}>
                                {q.options.map(opt => (
                                    <div key={opt} className="flex items-center space-x-2">
                                        <RadioGroupItem value={opt} id={`q${i}-${opt}`} />
                                        <Label htmlFor={`q${i}-${opt}`}>{opt}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="interests" className="pt-6">
                 <div className="space-y-8">
                    {interestQuestions.map((q) => (
                        <div key={q.id} className="space-y-3">
                            <Label>Rate your interest in: <span className="font-medium">{q.label}</span></Label>
                            <div className="flex gap-4 items-center">
                                <span className="text-sm text-muted-foreground">Low</span>
                                <Slider defaultValue={[50]} max={100} step={1} onValueChange={handleInteraction}/>
                                <span className="text-sm text-muted-foreground">High</span>
                            </div>
                        </div>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="personality" className="pt-6">
                 <div className="space-y-6">
                    {personalityQuestions.map((q, i) => (
                        <div key={i} className="space-y-3">
                            <Label>{i + 1}. {q.question}</Label>
                            <RadioGroup onValueChange={handleInteraction}>
                                {q.options.map(opt => (
                                    <div key={opt} className="flex items-center space-x-2">
                                        <RadioGroupItem value={opt} id={`pq${i}-${opt}`} />
                                        <Label htmlFor={`pq${i}-${opt}`}>{opt}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    ))}
                </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
          <Button size="lg" onClick={() => setTestSubmitted(true)} disabled={progress < 100}>
            Submit & View Results
          </Button>
      </div>

    </div>
  );
}
