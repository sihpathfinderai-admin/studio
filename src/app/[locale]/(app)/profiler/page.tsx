'use client';

import { useState, useEffect } from 'react';
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
import { BarChart, BookOpen, BrainCircuit, Users, ArrowLeft, ArrowRight, Loader2, Bot, Edit, Download } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { User as FirebaseUser } from 'firebase/auth';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { getAptitudeQuestions } from './actions';
import { Skeleton } from '@/components/ui/skeleton';

const interestQuestions = [
    { id: 'tech', label: 'How interested are you in building apps or working with computers?', options: ['Not interested', 'A little interested', 'Interested', 'Very interested'], category: 'Technical' },
    { id: 'science', label: 'How interested are you in exploring scientific concepts and doing experiments?', options: ['Not interested', 'A little interested', 'Interested', 'Very interested'], category: 'Analytical' },
    { id: 'creative', label: 'How interested are you in designing, drawing, or writing stories?', options: ['Not interested', 'A little interested', 'Interested', 'Very interested'], category: 'Creative' },
    { id: 'business', label: 'How interested are you in learning about businesses and how they run?', options: ['Not interested', 'A little interested', 'Interested', 'Very interested'], category: 'Logical' },
    { id: 'helping', label: 'How interested are you in working with people and helping others?', options: ['Not interested', 'A little interested', 'Interested', 'Very interested'], category: 'Social' },
];

type AptitudeQuestion = {
    question: string;
    options: string[];
    answer: string;
    category: 'Logical' | 'Analytical' | 'Verbal';
};

const personalityQuestions = [
    { question: 'When starting a new project, do you prefer to:', options: ['Plan everything in detail first', 'Jump in and figure it out as you go'], category: 'Logical' },
    { question: 'Do you enjoy group discussions and debates more, or quiet, focused work?', options: ['Group discussions', 'Quiet, focused work'], category: 'Social' },
    { question: 'When solving a problem, do you usually trust:', options: ['Proven methods that have worked before', 'New, creative, or unconventional ideas'], category: 'Creative' },
];

const chartConfig = {
  score: {
    label: 'Score',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const initialChartData = [
  { category: 'Logical', score: 0, fullMark: 100 },
  { category: 'Creative', score: 0, fullMark: 100 },
  { category: 'Analytical', score: 0, fullMark: 100 },
  { category: 'Social', score: 0, fullMark: 100 },
  { category: 'Technical', score: 0, fullMark: 100 },
  { category: 'Verbal', score: 0, fullMark: 100},
];

export default function ProfilerPage() {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [currentStep, setCurrentStep] = useState(0); 
  const [progress, setProgress] = useState(0);

  const [interestAnswers, setInterestAnswers] = useState<Record<string, string>>({});
  const [aptitudeAnswers, setAptitudeAnswers] = useState<Record<string, string>>({});
  const [personalityAnswers, setPersonalityAnswers] = useState<Record<string, string>>({});
  
  const [aptitudeQuestions, setAptitudeQuestions] = useState<AptitudeQuestion[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const [manualProfile, setManualProfile] = useState({
      strongestSubject: '',
      math: 3,
      science: 3,
      english: 3,
      skills: '',
      grade: '',
      favoriteSubject: '',
      ambition: ''
  });

  const [chartData, setChartData] = useState(initialChartData);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const totalQuestions = aptitudeQuestions.length + interestQuestions.length + personalityQuestions.length;
  
  useEffect(() => {
    if (totalQuestions > 0) {
      const answeredCount = Object.keys(interestAnswers).length + Object.keys(aptitudeAnswers).length + Object.keys(personalityAnswers).length;
      setProgress(Math.min((answeredCount / totalQuestions) * 100, 100));
    }
  }, [interestAnswers, aptitudeAnswers, personalityAnswers, totalQuestions]);

  const handleAnswerChange = (section: 'interest' | 'aptitude' | 'personality', questionId: string, value: string) => {
    if (section === 'interest') {
      setInterestAnswers(prev => ({...prev, [questionId]: value}));
    } else if (section === 'aptitude') {
      setAptitudeAnswers(prev => ({...prev, [questionId]: value}));
    } else {
      setPersonalityAnswers(prev => ({...prev, [questionId]: value}));
    }
  };
  
  const calculateResults = () => {
    const scores = { 'Logical': 0, 'Creative': 0, 'Analytical': 0, 'Social': 0, 'Technical': 0, 'Verbal': 0 };
    const maxScores = { 'Logical': 0, 'Creative': 0, 'Analytical': 0, 'Social': 0, 'Technical': 0, 'Verbal': 0 };

    interestQuestions.forEach((q, i) => {
      const answer = interestAnswers[q.id];
      const scoreValue = q.options.indexOf(answer) * 25; // Scale 0-3 to 0-75
      if(scoreValue >= 0) scores[q.category] += scoreValue;
      maxScores[q.category] += 75;
    });

    aptitudeQuestions.forEach((q, i) => {
      if (aptitudeAnswers[String(i)] === q.answer) {
        scores[q.category] += 50;
      }
      maxScores[q.category] += 50;
    });

    personalityQuestions.forEach((q, i) => {
      if (q.options.indexOf(personalityAnswers[String(i)]) === 0) { // First option corresponds to category
          scores[q.category] += 50;
      }
      maxScores[q.category] += 50;
    });
    
    const finalScores = Object.keys(scores).map(category => ({
      category,
      score: maxScores[category] > 0 ? Math.round((scores[category] / maxScores[category]) * 100) : 0,
      fullMark: 100,
    }));

    setChartData(finalScores);
    
    const sortedScores = [...finalScores].sort((a, b) => b.score - a.score);
    setStrengths(sortedScores.slice(0, 3).map(s => s.category));

    setCurrentStep(4);
  };
  
  const calculateManualResults = () => {
     // A simple mapping from manual inputs to profile categories
    const scores = {
        'Logical': manualProfile.math * 20, 
        'Analytical': manualProfile.science * 20,
        'Verbal': manualProfile.english * 20,
        'Creative': 0,
        'Social': 0,
        'Technical': 0
    };

    if (manualProfile.strongestSubject === 'Maths' || manualProfile.strongestSubject === 'Commerce') {
        scores.Logical += 30;
    }
    if (manualProfile.strongestSubject === 'Science') {
        scores.Analytical += 30;
    }
    if (manualProfile.strongestSubject === 'Arts') {
        scores.Creative += 40;
    }
     if (manualProfile.skills.toLowerCase().includes('coding')) {
        scores.Technical += 50;
    }
     if (manualProfile.skills.toLowerCase().includes('drawing') || manualProfile.skills.toLowerCase().includes('writing')) {
        scores.Creative += 40;
    }

     const finalScores = Object.entries(scores).map(([category, score]) => ({
      category,
      score: Math.min(score, 100), // Cap at 100
      fullMark: 100,
    }));

    setChartData(finalScores);
    
    const sortedScores = [...finalScores].sort((a, b) => b.score - a.score);
    setStrengths(sortedScores.slice(0, 3).map(s => s.category).filter(s => s));

    setCurrentStep(4);
  }

  const handleSave = async () => {
    if (!currentUser) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to save your results.' });
        return;
    }
    setIsSaving(true);
    try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        await setDoc(userDocRef, { profilerResults: { chartData, strengths, timestamp: new Date() } }, { merge: true });
        toast({ title: 'Success', description: 'Your profiler results have been saved!' });
    } catch(error) {
        toast({ variant: 'destructive', title: 'Save Failed', description: 'Could not save your results. Please try again.' });
    } finally {
        setIsSaving(false);
    }
  }

  const startAiTest = async () => {
    setLoadingQuestions(true);
    setCurrentStep(1);
    const result = await getAptitudeQuestions();
    if(result.message === 'success' && result.data?.questions) {
      setAptitudeQuestions(result.data.questions);
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.message || 'Could not load aptitude questions. Please try again later.' });
      setCurrentStep(0);
    }
    setLoadingQuestions(false);
  }


  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  if (currentStep === 4) { // Results page
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Your Profiler Results</h1>
          <p className="text-muted-foreground">Here is your generated profile based on your inputs.</p>
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
                {strengths.length > 0 ? strengths.map(strength => <li key={strength}>{strength}</li>) : <li>No distinct strengths found.</li>}
              </ul>
              <div className='mt-4 bg-muted p-3 rounded-md'>
                <h4 className='font-semibold'>AI Recommendation Note:</h4>
                <p className='text-sm text-muted-foreground'>You have strong logical skills and high interest in science and technology. You may fit well in engineering or IT-related fields.</p>
              </div>
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
           <CardFooter className="flex-col sm:flex-row gap-2">
               <Button className="w-full sm:w-auto" onClick={handleSave} disabled={isSaving}>
                 {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Saving...</> : 'Save to Dashboard'}
               </Button>
               <Button asChild variant="secondary" className="w-full sm:w-auto">
                    <Link href="/stream">Go to Stream Suggestion</Link>
               </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Download as PDF
               </Button>
                <Button variant="ghost" className="w-full sm:w-auto" onClick={() => setCurrentStep(0)}>Retake/Edit Profile</Button>
           </CardFooter>
        </Card>
      </div>
    );
  }

  if (currentStep === 0) { // Initial choice
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Profiler – Discover Your Path</h1>
          <p className="text-muted-foreground">Answer a few questions or set up your profile manually to begin your journey.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="flex flex-col text-center">
            <CardHeader>
              <Bot className="w-12 h-12 mx-auto text-primary" />
              <CardTitle className="mt-4">Automated Test Mode</CardTitle>
              <CardDescription>
                This 10-15 minute test will analyze your aptitude, interests, and personality to guide your stream, degree, and career options.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button size="lg" onClick={startAiTest} className="w-full" disabled={loadingQuestions}>
                {loadingQuestions ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Starting...</> : 'Start AI Test'}
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col text-center">
            <CardHeader>
              <Edit className="w-12 h-12 mx-auto text-primary" />
              <CardTitle className="mt-4">Manual Setup Mode</CardTitle>
              <CardDescription>
                If you already know your strengths, you can input your profile scores directly to get recommendations faster.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button size="lg" onClick={() => setCurrentStep(5)} variant="secondary" className="w-full">
                Manual Setup
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 5) { // Manual input
    return (
      <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Manual Profile Setup</h1>
            <p className="text-muted-foreground">Fill in your details to generate a profile report.</p>
        </div>
        <Card>
            <CardContent className="pt-6 space-y-6">
                <Card>
                    <CardHeader><CardTitle>Aptitude & Strengths</CardTitle></CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='grid gap-2'>
                            <Label>Select your strongest subject</Label>
                            <RadioGroup onValueChange={(value) => setManualProfile(p => ({...p, strongestSubject: value}))} value={manualProfile.strongestSubject} className="flex flex-wrap gap-4">
                                {['Math', 'Science', 'Arts', 'Commerce', 'Languages', 'Others'].map(sub => (
                                    <div key={sub} className="flex items-center space-x-2">
                                        <RadioGroupItem value={sub} id={`sub-${sub}`} />
                                        <Label htmlFor={`sub-${sub}`}>{sub}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        <div className='grid gap-4 sm:grid-cols-3'>
                             {['math', 'science', 'english'].map(subject => (
                                <div key={subject} className="grid gap-2">
                                    <Label>Rate yourself in {subject.charAt(0).toUpperCase() + subject.slice(1)} ({manualProfile[subject]}/5)</Label>
                                    <Slider
                                        min={1} max={5} step={1}
                                        value={[manualProfile[subject]]}
                                        onValueChange={([val]) => setManualProfile(p => ({...p, [subject]: val}))}
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Current Skills</CardTitle></CardHeader>
                    <CardContent>
                        <Label htmlFor="skills">Enter skills you have (e.g., Coding, Writing, Drawing, Public Speaking, Sports)</Label>
                        <Textarea id="skills" value={manualProfile.skills} onChange={e => setManualProfile(p => ({...p, skills: e.target.value}))} placeholder='e.g., Python, Graphic Design...'/>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Academic Performance</CardTitle></CardHeader>
                    <CardContent className='grid sm:grid-cols-2 gap-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor="grade">Enter your latest overall grade/percentage</Label>
                            <Input id="grade" value={manualProfile.grade} onChange={e => setManualProfile(p => ({...p, grade: e.target.value}))} placeholder="e.g., 85% or A+"/>
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor="fav-subject">Favorite subject (optional)</Label>
                            <Input id="fav-subject" value={manualProfile.favoriteSubject} onChange={e => setManualProfile(p => ({...p, favoriteSubject: e.target.value}))} placeholder="e.g., Physics"/>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader><CardTitle>Ambition</CardTitle></CardHeader>
                     <CardContent>
                        <Label htmlFor="ambition">What do you want to become?</Label>
                        <Input id="ambition" value={manualProfile.ambition} onChange={e => setManualProfile(p => ({...p, ambition: e.target.value}))} placeholder="e.g., Software Developer, Doctor, Designer..."/>
                     </CardContent>
                </Card>

            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(0)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <Button onClick={calculateManualResults}>
                    Generate Profile Report
                </Button>
            </CardFooter>
        </Card>
      </div>
    );
  }

  // AI Test steps
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
                <div className="space-y-6">
                    {interestQuestions.map((q) => (
                        <div key={q.id} className="space-y-3">
                            <Label>{q.label}</Label>
                            <RadioGroup onValueChange={(value) => handleAnswerChange('interest', q.id, value)} value={interestAnswers[q.id]}>
                                {q.options.map(opt => (
                                    <div key={opt} className="flex items-center space-x-2">
                                        <RadioGroupItem value={opt} id={`${q.id}-${opt}`} />
                                        <Label htmlFor={`${q.id}-${opt}`}>{opt}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    ))}
                </div>
            )}
            {currentStep === 2 && (
                 <div className="space-y-6">
                    {loadingQuestions ? (
                        Array.from({length: 5}).map((_, i) => (
                          <div key={i} className="space-y-3">
                            <Skeleton className="h-5 w-3/4" />
                            <div className="space-y-2 pt-2">
                              <Skeleton className="h-4 w-1/2" />
                              <Skeleton className="h-4 w-1/2" />
                              <Skeleton className="h-4 w-1/2" />
                              <Skeleton className="h-4 w-1/2" />
                            </div>
                          </div>
                        ))
                    ) : (
                        aptitudeQuestions.map((q, i) => (
                            <div key={i} className="space-y-3">
                                <Label>{i + 1}. {q.question}</Label>
                                <RadioGroup onValueChange={(value) => handleAnswerChange('aptitude', `${i}`, value)} value={aptitudeAnswers[i]}>
                                    {q.options.map(opt => (
                                        <div key={opt} className="flex items-center space-x-2">
                                            <RadioGroupItem value={opt} id={`q${i}-${opt}`} />
                                            <Label htmlFor={`q${i}-${opt}`}>{opt}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        ))
                    )}
                </div>
            )}
            {currentStep === 3 && (
                <div className="space-y-6">
                    {personalityQuestions.map((q, i) => (
                        <div key={i} className="space-y-3">
                            <Label>{i + 1}. {q.question}</Label>
                            <RadioGroup onValueChange={(value) => handleAnswerChange('personality', `${i}`, value)} value={personalityAnswers[i]}>
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
                <Button onClick={calculateResults} disabled={progress < 100}>
                    Finish & Analyze
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
