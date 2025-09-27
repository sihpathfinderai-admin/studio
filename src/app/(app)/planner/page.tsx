import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlannerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Action Plan</h1>
       <Card>
        <CardHeader>
            <CardTitle>Your Personalized Action Plan</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This page will feature a to-do list or planner where users can track tasks related to their college applications, skill development, and career preparation. It can include milestones and deadlines.</p>
        </CardContent>
      </Card>
    </div>
  );
}
