import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">User Management</h1>
      <Card>
        <CardHeader>
            <CardTitle>Manage Users</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This page will feature a table of all users (students, counselors, admins) with options to view, edit, or remove them. It will include search and filter functionality.</p>
        </CardContent>
      </Card>
    </div>
  );
}
