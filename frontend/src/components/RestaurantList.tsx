import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  location: string;
}

interface RestaurantListProps {
  restaurants: Restaurant[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  return (
    <Grid container spacing={3}>
      {restaurants.map((restaurant) => (
        <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={`https://loremflickr.com/320/240/restaurant?lock=${restaurant.id}`}
              alt={restaurant.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {restaurant.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cuisine: {restaurant.cuisine}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Location: {restaurant.location}
              </Typography>
              <Button
                component={Link}
                to={`/book/${restaurant.id}`}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RestaurantList;
