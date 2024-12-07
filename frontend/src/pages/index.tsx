import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function index() {
  return (
    <div className="max-w-7xl mx-auto">
      Hello world
      <div className="mt-12">
        <Card className="w-1/4">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
