import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import RestaurantList from './components/RestaurantList';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import { backend } from 'declarations/backend';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchRestaurants();
    fetchReservations();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const result = await backend.getRestaurants();
      setRestaurants(result);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const fetchReservations = async () => {
    try {
      const result = await backend.getReservations();
      setReservations(result);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Restaurant Booking App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Restaurants
          </Button>
          <Button color="inherit" component={Link} to="/reservations">
            My Reservations
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<RestaurantList restaurants={restaurants} />} />
          <Route path="/book/:id" element={<ReservationForm restaurants={restaurants} onReservationMade={fetchReservations} />} />
          <Route path="/reservations" element={<ReservationList reservations={reservations} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
