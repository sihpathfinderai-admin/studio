import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Eye } from "lucide-react";

export default function ResumePage() {
  return (
     <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Resume & Portfolio Builder</h1>
        <p className="text-muted-foreground">
          Create a professional resume and portfolio in minutes.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Edit Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="John Doe" />
             </div>
             <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
             </div>
             <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Textarea id="education" placeholder="e.g., Global Tech University - B.S. in Computer Science" />
             </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Textarea id="experience" placeholder="e.g., Software Engineer Intern at Innovate Corp" />
             </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>This is a static preview of your resume.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg p-6 min-h-[400px] bg-background">
                    <h2 className="text-2xl font-bold">John Doe</h2>
                    <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                    <hr className="my-4"/>
                    <h3 className="font-bold text-primary">Education</h3>
                    <p>Global Tech University - B.S. in Computer Science</p>
                    <h3 className="font-bold text-primary mt-4">Experience</h3>
                    <p>Software Engineer Intern at Innovate Corp</p>
                </div>
                <div className="flex gap-2 mt-4">
                    <Button className="w-full"><Download className="mr-2 h-4 w-4"/> Download</Button>
                    <Button variant="secondary" className="w-full"><Eye className="mr-2 h-4 w-4"/> Preview</Button>
                </div>
            </CardContent>
        </Card>
      </div>
     </div>
  );
}
