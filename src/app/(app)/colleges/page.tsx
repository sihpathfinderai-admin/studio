import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MapPin, Search } from "lucide-react";
import Image from "next/image";

const colleges = [
    { name: "Global Tech University", location: "Silicon Valley, USA", imageId: "college-1" },
    { name: "Innovate Institute of Design", location: "London, UK", imageId: "college-2" },
    { name: "Quantum Business School", location: "Singapore", imageId: "college-3" },
];

export default function CollegesPage() {
  const collegeImages = PlaceHolderImages.filter(img => img.id.startsWith("college-"));
  
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">College Locator</h1>
        <p className="text-muted-foreground">
          Find the perfect college that matches your criteria.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Filter Colleges</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="grid gap-2">
                    <Label htmlFor="keyword">Keyword</Label>
                    <Input id="keyword" placeholder="e.g., Engineering" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., California" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="degree">Degree</Label>
                     <Select>
                        <SelectTrigger id="degree">
                            <SelectValue placeholder="Select degree type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bachelors">Bachelor's</SelectItem>
                            <SelectItem value="masters">Master's</SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button className="w-full">
                    <Search className="mr-2 h-4 w-4"/>
                    Search
                </Button>
            </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {colleges.map((college, index) => {
            const image = collegeImages.find(img => img.id === college.imageId);
            return (
                 <Card key={college.name} className="overflow-hidden">
                    {image && (
                         <Image 
                            src={image.imageUrl} 
                            alt={college.name} 
                            width={400} 
                            height={250} 
                            className="w-full h-48 object-cover"
                            data-ai-hint={image.imageHint}
                        />
                    )}
                    <CardHeader>
                        <CardTitle>{college.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                            <MapPin className="w-4 h-4"/>
                            {college.location}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="secondary" className="w-full">View Details</Button>
                    </CardContent>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
