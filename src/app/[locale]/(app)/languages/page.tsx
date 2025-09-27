import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LanguagesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-4">Language & Region</h1>
       <Card className="max-w-md">
        <CardHeader>
            <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select>
                    <SelectTrigger id="language">
                        <SelectValue placeholder="English (US)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en-us">English (US)</SelectItem>
                        <SelectItem value="en-gb">English (UK)</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
