import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { bookData } from "./bookData";

const BarGraph: React.FC = () => {
  return (
    <div className="text-center item-center justify-center flex flex-col">
      <h2 className="text-3xl py-10 font-semibold text-sky-500">
        Book Inventory Stock
      </h2>
      <div className="text-sm">
        <BarChart
          width={800}
          height={400}
          data={bookData}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stock" fill="#82ca9d">
            <LabelList
              dataKey="title"
              position="inside"
              fill="#fff"
              style={{ fontSize: 12 }}
            />
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default BarGraph;
