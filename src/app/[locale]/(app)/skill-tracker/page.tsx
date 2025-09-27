
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SkillTrackerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Skill Tracker</h1>
       <Card>
        <CardHeader>
            <CardTitle>Your Personalized Skill Tracker</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This page will feature a to-do list or planner where users can track tasks related to their college applications, skill development, and career preparation. It can include milestones and deadlines.</p>
        </CardContent>
      </Card>
    </div>
  );
}
