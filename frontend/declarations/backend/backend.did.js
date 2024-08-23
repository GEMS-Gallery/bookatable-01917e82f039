export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Reservation = IDL.Record({
    'id' : IDL.Nat,
    'status' : IDL.Text,
    'date' : IDL.Text,
    'specialRequests' : IDL.Opt(IDL.Text),
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
  const Result_1 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  return IDL.Service({
    'cancelReservation' : IDL.Func([IDL.Nat], [Result], []),
    'checkAvailability' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text],
        [IDL.Bool],
        ['query'],
      ),
    'getReservations' : IDL.Func([], [IDL.Vec(Reservation)], ['query']),
    'getRestaurants' : IDL.Func([], [IDL.Vec(Restaurant)], ['query']),
    'makeReservation' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Nat, IDL.Opt(IDL.Text)],
        [Result_1],
        [],
      ),
    'updateReservation' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Nat, IDL.Opt(IDL.Text)],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
