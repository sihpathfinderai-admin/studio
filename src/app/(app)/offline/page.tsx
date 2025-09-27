import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OfflinePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Offline Access</h1>
       <Card>
        <CardHeader>
            <CardTitle>Offline Mode</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This page will explain the app's offline capabilities, allowing users to access downloaded resources, their planner, and other key information without an internet connection.</p>
        </CardContent>
      </Card>
    </div>
  );
}
