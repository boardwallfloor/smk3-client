import React , {useState, useEffect} from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

export const ReportChart = (props) => {
  const [report, setReport] = useState([])
  // console.log(report)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://192.168.100.62:9000/chart`)
      const json = await result.json();
      setReport(json.data);
      console.log(report)
        // console.log(data)
        // console.log(result)
    }
    fetchData();
    }, []);
  return (
  	<Card >
      <CardHeader title='Laporan per Tahun' />
      <CardContent>
      <ResponsiveContainer width={'100%'} height={300}>
    		<BarChart  data={report} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Fasyankes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Tahun" fill="#82ca9d" />
          <Bar dataKey="Semester" fill="#82ca9d" />
          <Bar dataKey="Total" fill="#8884d8" />
  			</BarChart>
     </ResponsiveContainer>
      </CardContent>
    </Card> 
  );
}

