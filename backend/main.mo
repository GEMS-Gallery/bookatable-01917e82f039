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

  public shared func makeReservation(restaurantId: Nat, date: Text, time: Text, guests: Nat) : async Result.Result<Nat, Text> {
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

  public query func checkAvailability(restaurantId: Nat, date: Text, time: Text) : async Bool {
    // For simplicity, we'll just check if the restaurant exists
    // In a real application, you'd check against actual availability data
    switch (restaurants.get(restaurantId)) {
      case (null) { return false; };
      case (?_) { return true; };
    };
  };
}
