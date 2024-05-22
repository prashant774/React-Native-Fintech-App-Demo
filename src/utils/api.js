import axios from 'axios';

const api = axios.create({
  baseURL: 'https://real-time-finance-data.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'c0133b6e59msh3b01fda0834e328p15f375jsnfe614c208b49',
    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com',
  },
});

export const fetchStocks = async () => {
  try {
    const response = await api.get('/market-trends', {
      params: {trend_type: 'GAINERS'},
    });
    //console.log(response);
    return response.data;
  } catch (error) {
    //console.error('Error fetching stocks:', error);
    return [];
  }
};

export const searchStocks = async query => {
  //console.log(query,'query');
  try {
    const response = await api.get('/search', {params: {query}});
    //console.log(response.data,'response');
    return response.data;
  } catch (error) {
    //console.error('Error searching stocks:', error);
    return [];
  }
};
