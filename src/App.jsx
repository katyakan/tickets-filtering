import React, { useState,  useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab
} from '@mui/material';
import axios from 'axios';

const tickets = [{
  "origin": "VVO",
  "origin_name": "Владивосток",
  "destination": "TLV",
  "destination_name": "Тель-Авив",
  "departure_date": "12.05.18",
  "departure_time": "16:20",
  "arrival_date": "12.05.18",
  "arrival_time": "22:10",
  "carrier": "TK",
  "stops": 3,
  "price": 12400
}, {
  "origin": "VVO",
  "origin_name": "Владивосток",
  "destination": "TLV",
  "destination_name": "Тель-Авив",
  "departure_date": "12.05.18",
  "departure_time": "17:20",
  "arrival_date": "12.05.18",
  "arrival_time": "23:50",
  "carrier": "S7",
  "stops": 1,
  "price": 13100
}, {
  "origin": "VVO",
  "origin_name": "Владивосток",
  "destination": "TLV",
  "destination_name": "Тель-Авив",
  "departure_date": "12.05.18",
  "departure_time": "12:10",
  "arrival_date": "12.05.18",
  "arrival_time": "18:10",
  "carrier": "SU",
  "stops": 0,
  "price": 15300
}, {
  "origin": "VVO",
  "origin_name": "Владивосток",
  "destination": "TLV",
  "destination_name": "Тель-Авив",
  "departure_date": "12.05.18",
  "departure_time": "17:00",
  "arrival_date": "12.05.18",
  "arrival_time": "23:30",
  "carrier": "TK",
  "stops": 2,
  "price": 11000
}, {
  "origin": "VVO",
  "origin_name": "Владивосток",
  "destination": "TLV",
  "destination_name": "Тель-Авив",
  "departure_date": "12.05.18",
  "departure_time": "12:10",
  "arrival_date": "12.05.18",
  "arrival_time": "20:15",
  "carrier": "BA",
  "stops": 3,
  "price": 13400
}, {
  "origin": "VVO",
  "origin_name": "Владивосток",
  "destination": "TLV",
  "destination_name": "Тель-Авив",
  "departure_date": "12.05.18",
  "departure_time": "9:40",
  "arrival_date": "12.05.18",
  "arrival_time": "19:25",
  "carrier": "SU",
  "stops": 3,
  "price": 12450
}, {
  "origin": "VVO",
  "origin_name": "Владивосток",
  "destination": "TLV",
  "destination_name": "Тель-Авив",
  "departure_date": "12.05.18",
  "departure_time": "17:10",
  "arrival_date": "12.05.18",
  "arrival_time": "23:45",
  "carrier": "TK",
  "stops": 1,
  "price": 13600
}, 
{
  "origin": "VVO",
  "origin_name": "Владивосток",
  "destination": "UFA",
  "destination_name": "Уфа",
  "departure_date": "12.05.18",
  "departure_time": "15:15",
  "arrival_date": "12.05.18",
  "arrival_time": "17:45",
  "carrier": "TK",
  "stops": 1,
  "price": 33400
},
{
  "origin": "VVO",
  "origin_name": "Владивосток",
  "destination": "TLV",
  "destination_name": "Тель-Авив",
  "departure_date": "12.05.18",
  "departure_time": "6:10",
  "arrival_date": "12.05.18",
  "arrival_time": "15:25",
  "carrier": "TK",
  "stops": 0,
  "price": 14250
}, 
{
  "origin": "LRN",
  "origin_name": "Ларнака",
  "destination": "TLV",
  "destination_name": "Тель-Авив",
  "departure_date": "12.05.18",
  "departure_time": "12:50",
  "arrival_date": "12.05.18",
  "arrival_time": "14:30",
  "carrier": "SU",
  "stops": 1,
  "price": 7000
},
{
  "origin": "VVO",
  "origin_name": "Владивосток",
  "destination": "TLV",
  "destination_name": "Тель-Авив",
  "departure_date": "12.05.18",
  "departure_time": "16:50",
  "arrival_date": "12.05.18",
  "arrival_time": "23:35",
  "carrier": "SU",
  "stops": 1,
  "price": 16700
}, 
{
  "origin": "VVO",
  "origin_name": "Владивосток",
  "destination": "TLV",
  "destination_name": "Тель-Авив",
  "departure_date": "12.05.18",
  "departure_time": "6:10",
  "arrival_date": "12.05.18",
  "arrival_time": "16:15",
  "carrier": "S7",
  "stops": 0,
  "price": 17400
}];
// const exchangeRates = {
//   RUB: 1,
//   USD: 1 / 80, 
//   EUR: 1 / 90, 
// };


const App = () => {
  const [filters, setFilters] = useState({
    stops: {
      0: true,
      1: true,
      2: true,
      3: true,
    },
  });
  const [currency, setCurrency] = useState('RUB');
  const [rates, setRates] = useState({ USD: 1, EUR: 1 });
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
      
        const apiKey = '1ebe514910c886d303a4f32f';
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/RUB`
     
        );
        const { conversion_rates } = response.data;
        setRates({
          USD: conversion_rates?.USD,
          EUR: conversion_rates?.EUR,
        });
      } catch (error) {
        console.error('Ошибка при получении курсов валют:', error);
      }
    };

    fetchExchangeRates();
  }, []);
  const handleFilterChange = (stopCount) => {
    setFilters((prevFilters) => ({
      stops: {
        ...prevFilters.stops,
        [stopCount]: !prevFilters.stops[stopCount],
      },
    }));
  };

  const filteredTickets = tickets.filter((ticket) => filters.stops[ticket.stops]);
  const handleCurrencyChange = (event, newCurrency) => {
    setCurrency(newCurrency);
  };
  const convertPrice = (price) => {
    switch (currency) {
      case 'USD':
        return (price * rates.USD).toFixed(2);
      case 'EUR':
        return (price * rates.EUR).toFixed(2);
      default:
        return price; 
    }
  };
  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
      Валюта
      </Typography>
      <Tabs
        value={currency}
        onChange={handleCurrencyChange}
        aria-label="currency-tabs"
        indicatorColor="primary"
      >
        <Tab label="Рубли" value="RUB" />
        <Tab label="Доллары" value="USD" />
        <Tab label="Евро" value="EUR" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Количество пересадок
            </Typography>
            {[0, 1, 2, 3].map((stopCount) => (
              <FormControlLabel
                key={stopCount}
                control={
                  <Checkbox
                    checked={filters.stops[stopCount]}
                    onChange={() => handleFilterChange(stopCount)}
                  />
                }
                label={stopCount === 0 ? 'Без пересадок' : `${stopCount} пересадка(-и)`}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={9}>
          {filteredTickets.map((ticket, index) => (
            <Card key={index} style={{ marginBottom: '16px' }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      {ticket.origin_name} → {ticket.destination_name}
                    </Typography>
                    <Typography>
                      Вылет: {ticket.departure_date} {ticket.departure_time}
                    </Typography>
                    <Typography>
                      Прилет: {ticket.arrival_date} {ticket.arrival_time}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Перевозчик: {ticket.carrier}</Typography>
                    <Typography>Пересадок: {ticket.stops}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6" color="primary">
                    {convertPrice(ticket.price)} {currency}
                    </Typography>
                    <Button variant="contained" color="primary">
                      Купить
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
