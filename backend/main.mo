import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Iter "mo:base/Iter";

actor {
  type Restaurant = {
    id: Nat;
    name: Text;
    cuisine: Text;
    location: Text;
  };

  type Reservation = {
    id: Nat;
    restaurantId: Nat;
    date: Text;
    time: Text;
    guests: Nat;
    status: Text;
    specialRequests: ?Text;
  };

  stable var nextRestaurantId: Nat = 0;
  stable var nextReservationId: Nat = 0;

  let restaurants = HashMap.HashMap<Nat, Restaurant>(10, Nat.equal, Nat.hash);
  let reservations = HashMap.HashMap<Nat, Reservation>(10, Nat.equal, Nat.hash);

  // Initialize with some sample restaurants
  private func addSampleRestaurants() {
    let sampleRestaurants = [
      { id = nextRestaurantId; name = "Pasta Paradise"; cuisine = "Italian"; location = "Downtown" },
      { id = nextRestaurantId + 1; name = "Sushi Sensation"; cuisine = "Japanese"; location = "Uptown" },
      { id = nextRestaurantId + 2; name = "Burger Bliss"; cuisine = "American"; location = "Midtown" },
    ];

    for (restaurant in sampleRestaurants.vals()) {
      restaurants.put(restaurant.id, restaurant);
      nextRestaurantId += 1;
    };
  };

  addSampleRestaurants();

  public query func getRestaurants() : async [Restaurant] {
    return Array.map<(Nat, Restaurant), Restaurant>(Iter.toArray(restaurants.entries()), func((_, r)) = r);
  };

  public shared func makeReservation(restaurantId: Nat, date: Text, time: Text, guests: Nat, specialRequests: ?Text) : async Result.Result<Nat, Text> {
    switch (restaurants.get(restaurantId)) {
      case (null) {
        return #err("Restaurant not found");
      };
      case (?_) {
        let reservationId = nextReservationId;
        let reservation: Reservation = {
          id = reservationId;
          restaurantId = restaurantId;
          date = date;
          time = time;
          guests = guests;
          status = "Confirmed";
          specialRequests = specialRequests;
        };
        reservations.put(reservationId, reservation);
        nextReservationId += 1;
        return #ok(reservationId);
      };
    };
  };

  public query func getReservations() : async [Reservation] {
    return Array.map<(Nat, Reservation), Reservation>(Iter.toArray(reservations.entries()), func((_, r)) = r);
  };

  public shared func updateReservation(reservationId: Nat, date: Text, time: Text, guests: Nat, specialRequests: ?Text) : async Result.Result<(), Text> {
    switch (reservations.get(reservationId)) {
      case (null) {
        return #err("Reservation not found");
      };
      case (?reservation) {
        let updatedReservation: Reservation = {
          id = reservation.id;
          restaurantId = reservation.restaurantId;
          date = date;
          time = time;
          guests = guests;
          status = reservation.status;
          specialRequests = specialRequests;
        };
        reservations.put(reservationId, updatedReservation);
        return #ok();
      };
    };
  };

  public shared func cancelReservation(reservationId: Nat) : async Result.Result<(), Text> {
    switch (reservations.get(reservationId)) {
      case (null) {
        return #err("Reservation not found");
      };
      case (?reservation) {
        let cancelledReservation: Reservation = {
          id = reservation.id;
          restaurantId = reservation.restaurantId;
          date = reservation.date;
          time = reservation.time;
          guests = reservation.guests;
          status = "Cancelled";
          specialRequests = reservation.specialRequests;
        };
        reservations.put(reservationId, cancelledReservation);
        return #ok();
      };
    };
  };

  public query func checkAvailability(restaurantId: Nat, date: Text, time: Text) : async Bool {
    // For simplicity, we'll just check if the restaurant exists and if there are less than 5 reservations for that time
    switch (restaurants.get(restaurantId)) {
      case (null) { return false; };
      case (?_) {
        let reservationsForTime = Array.filter<Reservation>(Array.map<(Nat, Reservation), Reservation>(Iter.toArray(reservations.entries()), func((_, r)) = r), func(r) {
          r.restaurantId == restaurantId and r.date == date and r.time == time and r.status == "Confirmed"
        });
        return reservationsForTime.size() < 5;
      };
    };
  };
}
