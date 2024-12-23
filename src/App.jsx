import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

const tickets = [
  // JSON данные с билетов (из вашего примера)
  {
    origin: 'VVO',
    origin_name: 'Владивосток',
    destination: 'TLV',
    destination_name: 'Тель-Авив',
    departure_date: '12.05.18',
    departure_time: '16:20',
    arrival_date: '12.05.18',
    arrival_time: '22:10',
    carrier: 'TK',
    stops: 3,
    price: 12400,
  },
  // Остальные данные...
];

const App = () => {
  const [filters, setFilters] = useState({
    stops: {
      0: true,
      1: true,
      2: true,
      3: true,
    },
  });

  const handleFilterChange = (stopCount) => {
    setFilters((prevFilters) => ({
      stops: {
        ...prevFilters.stops,
        [stopCount]: !prevFilters.stops[stopCount],
      },
    }));
  };

  const filteredTickets = tickets.filter((ticket) => filters.stops[ticket.stops]);

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Поиск билетов
      </Typography>
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
                      {ticket.price} ₽
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
