import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ParentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Parent Portal</h1>
       <Card>
        <CardHeader>
            <CardTitle>Information for Parents</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This section provides parents with an overview of their child's progress, upcoming deadlines, and resources to help them support their child's journey. Access would be controlled and granted by the student.</p>
        </CardContent>
      </Card>
    </div>
  );
}
