import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StreamPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Stream Recommendations</h1>
      <Card>
        <CardHeader>
            <CardTitle>Recommended Streams</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Based on your profile, this page will display recommended educational streams like Computer Science, Arts & Humanities, Commerce, etc., with details about each.</p>
        </CardContent>
      </Card>
    </div>
  );
}
