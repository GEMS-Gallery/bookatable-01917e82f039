import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box } from '@mui/material';
import { backend } from 'declarations/backend';

interface Reservation {
  id: number;
  restaurantId: number;
  date: string;
  time: string;
  guests: number;
  status: string;
  specialRequests: string | null;
}

interface ReservationListProps {
  reservations: Reservation[];
  onReservationUpdate: () => void;
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations, onReservationUpdate }) => {
  const handleCancel = async (id: number) => {
    try {
      const result = await backend.cancelReservation(BigInt(id));
      if ('ok' in result) {
        alert('Booking cancelled successfully!');
        onReservationUpdate();
      } else {
        alert('Failed to cancel booking: ' + result.err);
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('An error occurred while cancelling the booking.');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>Restaurant ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Special Requests</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{Number(reservation.id)}</TableCell>
                <TableCell>{Number(reservation.restaurantId)}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.time}</TableCell>
                <TableCell>{Number(reservation.guests)}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>{reservation.specialRequests || 'None'}</TableCell>
                <TableCell>
                  {reservation.status === 'Confirmed' && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleCancel(reservation.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReservationList;
