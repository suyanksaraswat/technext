import { Box } from '@mui/material';
import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { apiFetchAnalytics } from 'src/utils/api-endpoints';

const data = [
  {
    name: 'Page A',
    count: 4000,
    amt: 2400,
  },
  {
    name: 'Page B',
    count: 3000,
    amt: 2210,
  },
  {
    name: 'Page C',
    count: 2000,
    amt: 2290,
  },
  {
    name: 'Page D',
    count: 2780,
    amt: 2000,
  },
  {
    name: 'Page E',
    count: 1890,
    amt: 2181,
  },
  {
    name: 'Page F',
    count: 2390,
    amt: 2500,
  },
  {
    name: 'Page G',
    count: 3490,
    amt: 2100,
  },
];

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
      <LineChart
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
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
