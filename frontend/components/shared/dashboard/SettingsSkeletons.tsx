import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

export default function SettingsSkeleton() {
  return (
    <Card className="flex flex-col gap-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
