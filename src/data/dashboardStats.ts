import type { LucideIcon } from "lucide-react";

export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}
