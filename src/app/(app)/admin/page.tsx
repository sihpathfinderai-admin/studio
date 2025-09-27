import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>1,250 Active</CardDescription>
          </CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">+5% this week</p></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Counselors</CardTitle>
            <CardDescription>52 Active</CardDescription>
          </CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">2 new applications</p></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Engagement</CardTitle>
            <CardDescription>78% Weekly Active Users</CardDescription>
          </CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">High engagement in AI Advisor</p></CardContent>
        </Card>
      </div>
    </div>
  );
}
