
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Download, Pencil, Sparkles, XCircle } from "lucide-react";

const userProfile = {
    interests: ["Technology", "Problem-Solving", "Creative Arts"],
    aptitude: "Strong in Logical Reasoning"
};

const suggestedStreams = [
    {
        name: "Science (Technology)",
        explanation: "Given your interest in Technology and strong logical reasoning, the Science stream with a focus on computer science or engineering is a natural fit. It opens doors to high-demand careers in software development, AI, and data science.",
        careers: ["Software Engineer", "Data Scientist", "AI/ML Engineer", "Cybersecurity Analyst"]
    },
    {
        name: "Commerce with Information Practices",
        explanation: "This stream blends your technical aptitude with business principles. It's an excellent choice if you're interested in the business side of technology, such as FinTech, e-commerce, or IT management.",
        careers: ["IT Consultant", "Business Analyst", "Product Manager", "E-commerce Specialist"]
    }
];

const comparisonData = {
    "Science (Technology)": {
        pros: ["Direct path to core tech roles", "Strong foundation for advanced technical studies", "High demand in the job market"],
        cons: ["Can be highly competitive", "Requires strong focus on math and physics"]
    },
    "Commerce with IP": {
        pros: ["Versatile career options in tech and business", "Develops both technical and managerial skills", "Good for entrepreneurial ambitions"],
        cons: ["May not be as technically deep as a pure science path", "Some specialized tech roles may require extra certification"]
    }
};

export default function StreamPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Stream Suggestion</h1>
        <p className="text-muted-foreground">
          AI-powered recommendations for your academic path.
        </p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
            <div>
                <CardTitle>Your Profiler Snapshot</CardTitle>
                <CardDescription>Suggestions are based on these results.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Tweak Inputs
            </Button>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
           <div className="text-sm">
                <span className="font-semibold">Top Interests:</span>
                <span className="text-muted-foreground ml-2">{userProfile.interests.join(', ')}</span>
           </div>
            <div className="text-sm">
                <span className="font-semibold">Key Aptitude:</span>
                <span className="text-muted-foreground ml-2">{userProfile.aptitude}</span>
            </div>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2">
            <Sparkles className="text-primary w-6 h-6"/>
            AI-Powered Stream Suggestions
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
            {suggestedStreams.map(stream => (
                <Card key={stream.name}>
                    <CardHeader>
                        <CardTitle>{stream.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{stream.explanation}</p>
                        <h4 className="font-semibold mb-2">Potential Career Paths:</h4>
                        <div className="flex flex-wrap gap-2">
                            {stream.careers.map(career => (
                                <span key={career} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{career}</span>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
      
       <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Comparison View</h2>
        <Card>
            <CardHeader>
                <CardTitle>Stream A vs. Stream B</CardTitle>
                <CardDescription>A side-by-side look at your top recommendations.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Aspect</TableHead>
                            <TableHead>Science (Technology)</TableHead>
                            <TableHead>Commerce with Info. Practices</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-semibold">Pros</TableCell>
                            <TableCell>
                                <ul className="space-y-2">
                                    {comparisonData["Science (Technology)"].pros.map(pro => (
                                        <li key={pro} className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> <span>{pro}</span>
                                        </li>
                                    ))}
                                </ul>
                            </TableCell>
                             <TableCell>
                                <ul className="space-y-2">
                                    {comparisonData["Commerce with IP"].pros.map(pro => (
                                        <li key={pro} className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> <span>{pro}</span>
                                        </li>
                                    ))}
                                </ul>
                            </TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell className="font-semibold">Cons</TableCell>
                            <TableCell>
                               <ul className="space-y-2">
                                    {comparisonData["Science (Technology)"].cons.map(con => (
                                        <li key={con} className="flex items-start gap-2">
                                            <XCircle className="w-5 h-5 text-red-500 mt-0.5" /> <span>{con}</span>
                                        </li>
                                    ))}
                                </ul>
                            </TableCell>
                             <TableCell>
                                <ul className="space-y-2">
                                    {comparisonData["Commerce with IP"].cons.map(con => (
                                        <li key={con} className="flex items-start gap-2">
                                            <XCircle className="w-5 h-5 text-red-500 mt-0.5" /> <span>{con}</span>
                                        </li>
                                    ))}
                                </ul>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
      
       <div className="flex justify-end gap-2">
            <Button variant="secondary">Save to Profile</Button>
            <Button>
                <Download className="mr-2 h-4 w-4"/>
                Export as PDF
            </Button>
      </div>

    </div>
  );
}
