import { Box } from '@mui/material';
import React, { PureComponent, useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
} from 'recharts';
import { apiFetchAnalytics } from 'src/utils/api-endpoints';

interface Props {
  searchVal: string;
}

export const Analytics = ({ searchVal }: Props) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<any>();

  const fetchData = async (query: string) => {
    setLoading(true);

    try {
      const res = await apiFetchAnalytics(query);

      setData(res?.data);
      setLoading(false);
    } catch (e) {
      console.log('e-', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchVal);
  }, [searchVal]);

  return loading ? (
    <Box>Loading...</Box>
  ) : (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={
          data?.map((res: any) => ({
            name: res?.phase,
            count: res?.phase_count,
          })) || []
        }
        margin={{
          left: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={{ fill: 'transparent' }} />
        <Legend />
        <Bar maxBarSize={80} dataKey="count" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
      </BarChart>
    </ResponsiveContainer>
  );
};
