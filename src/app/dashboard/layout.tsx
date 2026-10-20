import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal & Automation Dashboard",
  description: "Real-time client portal for monitoring AI receptionist activity, appointment bookings, and CRM pipelines.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-canvas">{children}</div>;
}
