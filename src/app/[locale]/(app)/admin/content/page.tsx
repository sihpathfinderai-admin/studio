import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminContentPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Content Management</h1>
      <Card>
        <CardHeader>
            <CardTitle>Manage Platform Content</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Admins will use this section to add, edit, or remove data related to careers, degrees, colleges, and other resources available on the platform.</p>
        </CardContent>
      </Card>
    </div>
  );
}
