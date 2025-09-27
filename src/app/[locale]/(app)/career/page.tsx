import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CareerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Career Exploration</h1>
       <Card>
        <CardHeader>
            <CardTitle>Recommended Career Paths</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Here, users can explore detailed information about various careers, including job responsibilities, salary expectations, required skills, and future outlook, all personalized to them.</p>
        </CardContent>
      </Card>
    </div>
  );
}
