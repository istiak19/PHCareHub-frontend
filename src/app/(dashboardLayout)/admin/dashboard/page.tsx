"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

interface MetaData {
  patientCount: number;
  doctorCount: number;
  adminCount: number;
  appointmentCount: number;
  paymentCount: number;
  totalRevenue: { _sum: { amount: number } };
  barChartData: { month: string; count: number }[];
  pieChartData: { status: string; count: number }[];
}

const COLORS = ["#4ade80", "#3b82f6", "#facc15", "#ef4444", "#a78bfa"]; // Tailwind colors

const DashboardPage = () => {
  const [data, setData] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/meta-data", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const json = await res.json();
        if (json.success) setData(json.data);
        else console.error("Failed to fetch meta data");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!data) return <div className="text-center py-10">No data available</div>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader><CardTitle className="text-sm text-gray-500 dark:text-gray-400">Patients</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{data.patientCount}</p></CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader><CardTitle className="text-sm text-gray-500 dark:text-gray-400">Doctors</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{data.doctorCount}</p></CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader><CardTitle className="text-sm text-gray-500 dark:text-gray-400">Admins</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{data.adminCount}</p></CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader><CardTitle className="text-sm text-gray-500 dark:text-gray-400">Revenue</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">${data.totalRevenue._sum.amount}</p></CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader><CardTitle>Monthly Appointments</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.barChartData}>
              <XAxis dataKey="month" tickFormatter={(month) => new Date(month).toLocaleString("default", { month: "short" })}/>
              <YAxis />
              <Tooltip labelFormatter={(month) => new Date(month).toLocaleString("default", { month: "short", year: "numeric" })} />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader><CardTitle>Appointment Status</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.pieChartData} dataKey="count" nameKey="status" outerRadius={100} label>
                {data.pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;