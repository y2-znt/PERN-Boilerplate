"use client";
import { ChevronRight } from "lucide-react";
import { StatsCard } from "../../components/shared/dashboard/stats-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Orders" description="Total orders" value={42} />
        <StatsCard
          title="Revenue"
          description="Total revenue this month"
          value="$4,200"
        />
        <StatsCard
          title="Customers"
          description="Active customers"
          value={128}
        />
        <StatsCard title="Growth" description="Revenue growth" value="+12.5%" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Products</CardTitle>
            <CardDescription>Top selling items this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Product A", sales: 120 },
                { name: "Product B", sales: 98 },
                { name: "Product C", sales: 76 },
                { name: "Product D", sales: 65 },
                { name: "Product E", sales: 54 },
              ].map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <span className="text-muted-foreground">{product.sales}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "New order from John Doe",
                "Payment received from Jane Smith",
                "Product X is out of stock",
                "New customer registration",
                "Support ticket resolved",
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Add New Product",
                "Create Invoice",
                "Update Inventory",
                "View Reports",
                "Manage Users",
              ].map((action, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer items-center gap-2 hover:text-primary"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
