import React , {useState, useEffect} from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

export const ReportChart = (props) => {
  const [report, setReport] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('jwt');
        let myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${token}`);
        const option = {
            method: 'GET',
            headers: myHeaders,
        }
      const result = await fetch(`${process.env.REACT_APP_API_LINK}/chart`,option)
      const json = await result.json();
      setReport(json.data);
      // console.log(report)
        // console.log(data)
        // console.log(result)
    }
    fetchData();
    }, []);
  return (
  	<Card >
      <CardHeader title='Jumlah Laporan' />
      <CardContent>
      <ResponsiveContainer width={'100%'} height={300}>
    		<BarChart  data={report} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Fasyankes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Tahun" fill="#82ca9d" />
          <Bar dataKey="Semester" fill="#61af64" />
          <Bar dataKey="Total" fill="#8884d8" />
  			</BarChart>
     </ResponsiveContainer>
      </CardContent>
    </Card> 
  );
}

