
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TimelinePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Roadmap Generator</h1>
      <Card>
        <CardHeader>
            <CardTitle>Personalized Education & Career Timeline</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This page will visualize a timeline for the user, from their current academic year through college and into their early career. It will show key milestones, application deadlines, and suggested activities.</p>
        </CardContent>
      </Card>
    </div>
  );
}
