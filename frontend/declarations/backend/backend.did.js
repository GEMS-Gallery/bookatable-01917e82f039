export const idlFactory = ({ IDL }) => {
  const Reservation = IDL.Record({
    'id' : IDL.Nat,
    'date' : IDL.Text,
    'time' : IDL.Text,
    'restaurantId' : IDL.Nat,
    'guests' : IDL.Nat,
  });
  const Restaurant = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'cuisine' : IDL.Text,
    'location' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  return IDL.Service({
    'checkAvailability' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text],
        [IDL.Bool],
        ['query'],
      ),
    'getReservations' : IDL.Func([], [IDL.Vec(Reservation)], ['query']),
    'getRestaurants' : IDL.Func([], [IDL.Vec(Restaurant)], ['query']),
    'makeReservation' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Nat],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
