import React, { useState,  useEffect } from 'react';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
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
import data from './data/tickets.json';
const tickets = data?.tickets;
const carrierLogos = {
  "TK": "/logos/tk.png", 
  "S7": "/logos/s7.png", 
  "SU": "/logos/su.png", 
  "BA": "/logos/ba.png", 
};

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
  const [hoveredStop, setHoveredStop] = useState(null);
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
  // const handleFilterChange = (stopCount) => {
  //   setFilters((prevFilters) => ({
  //     stops: {
  //       ...prevFilters.stops,
  //       [stopCount]: !prevFilters.stops[stopCount],
  //     },
  //   }));
  // };

  const filteredTickets = tickets?.filter((ticket) => filters.stops[ticket.stops]);
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

    const formatTicketDate = (dateString) => {
      const dateParts = dateString.split('.');
      const formattedDate = new Date(`20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
      return format(formattedDate, "d MMM yyyy, EEE", { locale: ru });
    };
  
    const handleOnlyClick = (stopCount) => {
      setFilters({
        stops: {
          0: false,
          1: false,
          2: false,
          3: false,
          [stopCount]: true,
        },
        only: stopCount, // Храним состояние "Только" для выбранного фильтра
      });
    };
    const handleFilterChange = (stopCount) => {
      setFilters((prevFilters) => {
        const updatedStops = {
          ...prevFilters.stops,
          [stopCount]: !prevFilters.stops[stopCount],
        };
        
        // Если пользователь изменил другой фильтр, сбрасываем "Только"
        return {
          stops: updatedStops,
          only: null,
        };
      });
    };


    const handleMouseEnter = (stopCount) => {
      if (filters.stops[stopCount]) {
        setHoveredStop(stopCount); // Показываем кнопку только если чекбокс активен
      }
    };
  
    const handleMouseLeave = () => {
      setHoveredStop(null); // Прячем кнопку при уходе мыши
    };
  
  return (
    <Box p={4}>
         <Typography variant="h6" gutterBottom>
      Валюта
      </Typography>
      <Tabs
        value={currency}
        onChange={handleCurrencyChange}
        aria-label="currency-tabs"
        indicatorColor="primary"
     
        textColor="inherit"
      
        sx={{
          '.MuiTab-root': {
            border: '1px solid gray',
            '&:hover': {
              backgroundColor: 'lightblue', 
            },
            '&.Mui-selected': {
              backgroundColor: 'blue', 
              color: 'white', 
            },
          },
        }}
      >
        <Tab label="RUB" value="RUB" />
        <Tab label="USD" value="USD" />
        <Tab label="EUR" value="EUR" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Количество пересадок
            </Typography>
            <Box>
        {[0, 1, 2, 3].map((stopCount) => (
          <Box key={stopCount} display="flex" alignItems="center" mb={1} 
          onMouseEnter={() => handleMouseEnter(stopCount)} // Добавляем обработчик ховера
          onMouseLeave={handleMouseLeave} // Убираем кнопку при уходе мыши
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.stops[stopCount]}
                  onChange={() => handleFilterChange(stopCount)}
                />
              }
              label={`${stopCount} пересад${stopCount === 1 ? "ка" : "ки"}`}
            />
            {filters.stops[stopCount] && hoveredStop === stopCount && ( 
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      onClick={() => handleOnlyClick(stopCount)}
                      style={{
                        marginLeft: '8px',
                        display: 'inline',
                      }}
                    >
                      Только
                    </Button>
                  )}
          </Box>
        ))}
      </Box>
          </Box>
        </Grid>
        <Grid item xs={9}>
          {filteredTickets.map((ticket, index) => (
            <Card key={index} style={{ marginBottom: '16px' }}>
              <CardContent>
                <Grid container spacing={3}>
                <Grid item xs={3}>
                  {carrierLogos[ticket.carrier] ? (
  <img
    src= {carrierLogos[ticket.carrier]}
    alt={ticket.carrier}
    style={{ width: '180px', height: 'auto' }}
  />
) : (
  <Typography>Логотип не найден для {ticket.carrier}</Typography>
)}
                   <Button variant="contained" sx={{backgroundColor: "orange", padding: "16px", width: "180px"}} >
                     Купить  <br/>
                                          за {convertPrice(ticket.price)} {currency}
                                     </Button>
                  </Grid>
             
                  <Grid item xs={3}>
                  <Typography>  {ticket.departure_time}
                 </Typography>
                    <Typography variant="h6">
                      {ticket.origin_name}
                    </Typography>
                    <Typography>
                   {formatTicketDate(ticket.departure_date)}
                    </Typography>
         
                  </Grid>
                
               <Grid item xs={3}>     <Typography>  
               Пересадок: {ticket.stops}</Typography>
               <img
    src= "/logos/arrow.jpg"
    alt="arrow"
    style={{ width: '120px', height: 'auto' }}
  />
               </Grid>
               <Grid item xs={3}>  <Typography> {ticket.arrival_time} </Typography>
                    <Typography variant="h6">
                     {ticket.destination_name}
                    </Typography>
           
                    <Typography>
                 {formatTicketDate(ticket.arrival_date)} 
                    </Typography></Grid>
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
