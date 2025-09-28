

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
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
import { BarChart, BookOpen, BrainCircuit, Users, ArrowLeft, ArrowRight } from 'lucide-react';

const interestQuestions = [
    { id: 'tech', label: 'Building apps or working with computers' },
    { id: 'science', label: 'Exploring scientific concepts and doing experiments' },
    { id: 'creative', label: 'Designing, drawing, or writing stories' },
    { id: 'business', label: 'Learning about businesses and how they run' },
    { id: 'helping', label: 'Working with people and helping others' },
];

const aptitudeQuestions = [
  {
    question: 'A train travels 120 km in 2 hours. What is its speed in km/h?',
    options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
    answer: '60 km/h',
  },
  {
    question: 'Find the next number in the series: 5, 10, 15, 20, ...?',
    options: ['25', '30', '35', '40'],
    answer: '25',
  },
  {
    question: 'If a book costs ₹80 after a 20% discount, what was its original price?',
    options: ['₹96', '₹100', '₹110', '₹120'],
    answer: '₹100'
  }
];

const personalityQuestions = [
    { question: 'When starting a new project, do you prefer to:', options: ['Plan everything in detail first', 'Jump in and figure it out as you go'] },
    { question: 'Do you enjoy group discussions and debates more, or quiet, focused work?', options: ['Group discussions', 'Quiet, focused work'] },
    { question: 'When solving a problem, do you usually trust:', options: ['Proven methods that have worked before', 'New, creative, or unconventional ideas'] },
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
  const [currentStep, setCurrentStep] = useState(0); // 0: Start, 1: Interests, 2: Aptitude, 3: Personality, 4: Results
  const [progress, setProgress] = useState(0);

  const totalQuestions = aptitudeQuestions.length + interestQuestions.length + personalityQuestions.length;
  
  const handleInteraction = () => {
    setProgress(prev => Math.min(prev + (100 / totalQuestions), 100));
  }

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);
  const startTest = () => setCurrentStep(1);
  const viewResults = () => setCurrentStep(4);

  if (currentStep === 4) {
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

  if (currentStep === 0) {
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
              This short test will help us understand your aptitudes and interests to generate personalized career and education recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" onClick={startTest}>
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
            <CardTitle className="flex items-center gap-2">
                {currentStep === 1 && <><BookOpen /> Interests</>}
                {currentStep === 2 && <><BrainCircuit /> Aptitude</>}
                {currentStep === 3 && <><Users /> Personality</>}
            </CardTitle>
            <CardDescription>
                {currentStep === 1 && "Rate your interest in the following areas to help us understand what you enjoy."}
                {currentStep === 2 && "Answer these questions to assess your logical and numerical reasoning."}
                {currentStep === 3 && "These questions will help us understand your work style and preferences."}
            </CardDescription>
        </CardHeader>
        <CardContent>
            {currentStep === 1 && (
                <div className="space-y-8">
                    {interestQuestions.map((q) => (
                        <div key={q.id} className="space-y-3">
                            <Label>How interested are you in: <span className="font-medium">{q.label}</span></Label>
                            <div className="flex gap-4 items-center">
                                <span className="text-sm text-muted-foreground">Not at all</span>
                                <Slider defaultValue={[50]} max={100} step={1} onValueChange={handleInteraction}/>
                                <span className="text-sm text-muted-foreground">Very Interested</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {currentStep === 2 && (
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
            )}
            {currentStep === 3 && (
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
            )}
        </CardContent>
         <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep <= 1}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
            </Button>
            {currentStep < 3 ? (
                 <Button onClick={nextStep}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            ) : (
                <Button onClick={viewResults} disabled={progress < 100}>
                    Submit & View Results
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
