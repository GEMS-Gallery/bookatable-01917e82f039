import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';

interface Restaurant {
  id: number;
  name: string;
}

interface ReservationFormProps {
  restaurants: Restaurant[];
  onReservationMade: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ restaurants, onReservationMade }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm();

  const restaurant = restaurants.find(r => r.id === Number(id));

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const result = await backend.makeReservation(BigInt(id!), data.date, data.time, BigInt(data.guests));
      if ('ok' in result) {
        alert('Reservation made successfully!');
        onReservationMade();
        navigate('/reservations');
      } else {
        alert('Failed to make reservation: ' + result.err);
      }
    } catch (error) {
      console.error('Error making reservation:', error);
      alert('An error occurred while making the reservation.');
    } finally {
      setLoading(false);
    }
  };

  if (!restaurant) {
    return <Typography>Restaurant not found</Typography>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Book a Table at {restaurant.name}
      </Typography>
      <Controller
        name="date"
        control={control}
        defaultValue=""
        rules={{ required: 'Date is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errors.date}
            helperText={errors.date?.message as string}
          />
        )}
      />
      <Controller
        name="time"
        control={control}
        defaultValue=""
        rules={{ required: 'Time is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Time"
            type="time"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errors.time}
            helperText={errors.time?.message as string}
          />
        )}
      />
      <Controller
        name="guests"
        control={control}
        defaultValue=""
        rules={{ required: 'Number of guests is required', min: { value: 1, message: 'Minimum 1 guest' } }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Number of Guests"
            type="number"
            fullWidth
            margin="normal"
            error={!!errors.guests}
            helperText={errors.guests?.message as string}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Make Reservation'}
      </Button>
    </Box>
  );
};

export default ReservationForm;
