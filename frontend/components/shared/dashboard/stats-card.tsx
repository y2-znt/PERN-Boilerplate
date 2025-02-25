"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

interface StatsCardProps {
  title: string;
  description: string;
  value: string | number;
}

export function StatsCard({ title, description, value }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-semibold">{value}</h2>
      </CardContent>
    </Card>
  );
}
