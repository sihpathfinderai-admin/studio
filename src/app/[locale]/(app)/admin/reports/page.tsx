import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminReportsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Reports & Analytics</h1>
      <Card>
        <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This area will display detailed analytics and reports on user engagement, popular career paths, AI advisor usage, and other key performance indicators.</p>
        </CardContent>
      </Card>
    </div>
  );
}
