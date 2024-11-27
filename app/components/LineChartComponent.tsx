"use client";
import { Card, Box, Text, ScrollArea } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  LineChart,
  Legend,
} from "recharts";

interface Props {
  data: { date: string; debit: number; credit: number }[];
  XAxisKey: string;
  FirstLineKey: string;
  SecondLineKey: string;
}

const formatYAxis = (value: number) => {
  return value.toLocaleString();
};

const LineChartComponent = ({
  data,
  XAxisKey,
  FirstLineKey,
  SecondLineKey,
}: Props) => {
  return (
    <Card>
      <ScrollArea type="auto" scrollbars="horizontal">
        <Box minWidth="100%" width="800px" className="space-y-5 p-1">
          <Text size="4" className=" font-medium text-gray-700">
            Line Chart.
          </Text>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data} margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={XAxisKey} />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={FirstLineKey}
                stroke="var(--accent-9)"
                strokeWidth={1.5}
              />
              <Line
                type="monotone"
                dataKey={SecondLineKey}
                stroke="#82ca9d"
                strokeWidth={1.5}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </ScrollArea>
    </Card>
  );
};

export default LineChartComponent;
