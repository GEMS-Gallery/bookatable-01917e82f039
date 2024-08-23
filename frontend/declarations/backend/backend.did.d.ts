import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Reservation {
  'id' : bigint,
  'date' : string,
  'time' : string,
  'restaurantId' : bigint,
  'guests' : bigint,
}
export interface Restaurant {
  'id' : bigint,
  'name' : string,
  'cuisine' : string,
  'location' : string,
}
export type Result = { 'ok' : bigint } |
  { 'err' : string };
export interface _SERVICE {
  'checkAvailability' : ActorMethod<[bigint, string, string], boolean>,
  'getReservations' : ActorMethod<[], Array<Reservation>>,
  'getRestaurants' : ActorMethod<[], Array<Restaurant>>,
  'makeReservation' : ActorMethod<[bigint, string, string, bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
