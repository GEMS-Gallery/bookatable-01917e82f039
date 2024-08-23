import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

interface Reservation {
  id: number;
  restaurantId: number;
  date: string;
  time: string;
  guests: number;
}

interface ReservationListProps {
  reservations: Reservation[];
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        My Reservations
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reservation ID</TableCell>
              <TableCell>Restaurant ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Guests</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReservationList;
