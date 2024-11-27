"use client";
import { Box, Card, ScrollArea, Text } from "@radix-ui/themes";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

interface Props {
  title: string;
  data: { name: string; debit: number; credit: number }[];
  width: number;
  onBar?: boolean;
}

const formatYAxis = (value: number) => {
  return value.toLocaleString();
};

const formatXAxis = (name: string) => {
  if (name.length > 12)
    return name
      .split(" ")
      .map((word) => word.charAt(0) + ".")
      .join(" ");

  return name;
};

const BerChartComponent = ({ title, data, width, onBar }: Props) => {
  return (
    <ScrollArea type="auto" scrollbars="horizontal">
      <Text size="4" className="font-medium text-gray-700">
        {title}
      </Text>
      <Card className="mt-3">
        <Box width={`${width}px`} className="space-y-5 p-1">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ left: 20 }}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" tickFormatter={formatXAxis} />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip
                formatter={formatYAxis}
                wrapperStyle={{ width: 150, backgroundColor: "#ccc" }}
              />
              <Legend margin={{ top: 20, right: 20, bottom: 20, left: 20 }} />
              <Bar dataKey="debit" barSize={40} fill="var(--accent-9)" />
              {!onBar && <Bar dataKey="credit" barSize={40} fill="#82ca9d" />}
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </ScrollArea>
  );
};

export default BerChartComponent;
