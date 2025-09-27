import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DegreePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Degree Recommendations</h1>
      <Card>
        <CardHeader>
            <CardTitle>Recommended Degrees</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This page will list specific degrees (e.g., B.Sc. in Data Science, Bachelor of Fine Arts) that align with the user's profile and career aspirations.</p>
        </CardContent>
      </Card>
    </div>
  );
}
