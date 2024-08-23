import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Reservation {
  'id' : bigint,
  'status' : string,
  'date' : string,
  'specialRequests' : [] | [string],
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
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : string };
export interface _SERVICE {
  'cancelReservation' : ActorMethod<[bigint], Result>,
  'checkAvailability' : ActorMethod<[bigint, string, string], boolean>,
  'getReservations' : ActorMethod<[], Array<Reservation>>,
  'getRestaurants' : ActorMethod<[], Array<Restaurant>>,
  'makeReservation' : ActorMethod<
    [bigint, string, string, bigint, [] | [string]],
    Result_1
  >,
  'updateReservation' : ActorMethod<
    [bigint, string, string, bigint, [] | [string]],
    Result
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
