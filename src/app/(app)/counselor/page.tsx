import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CounselorPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Counselor Connect</h1>
      <Card>
        <CardHeader>
            <CardTitle>Connect with a Career Counselor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-muted-foreground">This page will allow users to schedule appointments with human counselors, view counselor profiles, and engage in text or video chat sessions for more in-depth guidance.</p>
            <Button>Schedule a Session</Button>
        </CardContent>
      </Card>
    </div>
  );
}
