import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  DollarSign,
  Activity,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";
import type { DashboardStat } from "@/data/dashboardStats";
import { mockRecentSales } from "@/data/recentSales";
import { mockChartData, chartMonths } from "@/data/chartData";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function Dashboard() {
  const stats: DashboardStat[] = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+180",
      trend: "up",
      icon: Users,
    },
    {
      title: "Sales",
      value: "+12,234",
      change: "+19%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Active Now",
      value: "573",
      change: "-12",
      trend: "down",
      icon: Activity,
    },
  ];

  // Prepare chart data
  const chartData = chartMonths.map((month, index) => ({
    month,
    revenue: mockChartData[index] * 1000, // Scale for better visualization
  }));

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your business.
          </p>
        </div>
        <Badge variant="outline" className="gap-1">
          <Activity className="h-3 w-3" />
          Live
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {stat.change}
                  </span>
                  <span>from last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Overview Chart Card */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Monthly revenue for this year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-muted"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  className="text-muted-foreground"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Sales Card */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockRecentSales.map((sale) => (
                <div key={sale.email} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`/avatars/${sale.avatar}.png`} />
                    <AvatarFallback>{sale.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1 flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none">
                      {sale.name}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {sale.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium flex items-center gap-1">
                    {sale.amount}
                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer">
              <Users className="h-4 w-4" />
              <span className="text-sm">Add New User</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer">
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm">Create Order</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer">
              <Activity className="h-4 w-4" />
              <span className="text-sm">View Reports</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>All systems operational</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">API Server</span>
              <Badge className="bg-green-500">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <Badge className="bg-green-500">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Cache</span>
              <Badge className="bg-green-500">Online</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>Recent system activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="font-medium">New user registered</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">Order #1234 completed</p>
              <p className="text-xs text-muted-foreground">15 minutes ago</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">System backup completed</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
