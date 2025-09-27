import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResourcesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Learning Resources</h1>
      <Card>
        <CardHeader>
            <CardTitle>Your Personalized Library</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This section will contain a curated list of learning resources, such as online courses, articles, books, and videos, tailored to the user's interests and goals.</p>
        </CardContent>
      </Card>
    </div>
  );
}
