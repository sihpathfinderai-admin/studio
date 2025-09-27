import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FeedbackPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Send Feedback</h1>
        <p className="text-muted-foreground">
          We'd love to hear your thoughts.
        </p>
      </div>
      <Card className="max-w-xl">
        <CardHeader>
            <CardTitle>Feedback Form</CardTitle>
            <CardDescription>Let us know what you think, or report an issue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="feedback">Your Message</Label>
                <Textarea id="feedback" placeholder="Your feedback..." rows={6}/>
            </div>
            <Button>Submit Feedback</Button>
        </CardContent>
      </Card>
    </div>
  );
}
