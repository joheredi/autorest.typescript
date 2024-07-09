// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
  deserializeArray,
} from "../helpers/serializerHelpers.js";
import {
  User as UserRest,
  UserOrder as UserOrderRest,
  ListItemInputBody as ListItemInputBodyRest,
  FirstItemOutput,
  SecondItemOutput,
  UserListResultsOutput,
  UserOrderOutput,
  UserOutput,
} from "../rest/index.js";

/** Details about a user. */
export interface User {
  /** The user's id. */
  readonly id: number;
  /** The user's name. */
  name: string;
  /** The user's order list */
  orders?: UserOrder[];
  /** The entity tag for this resource. */
  readonly etag: string;
}

export function userSerializer(item: User): UserRest {
  return {
    name: item["name"],
    orders:
      item["orders"] === undefined
        ? item["orders"]
        : item["orders"].map(userOrderSerializer),
  };
}

/** UserOrder for testing list with expand. */
export interface UserOrder {
  /** The user's id. */
  readonly id: number;
  /** The user's id. */
  userId: number;
  /** The user's order detail */
  detail: string;
}

export function userOrderSerializer(item: UserOrder): UserOrderRest {
  return {
    userId: item["userId"],
    detail: item["detail"],
  };
}

/** The body of the input. */
export interface ListItemInputBody {
  /** The name of the input. */
  inputName: string;
}

export function listItemInputBodySerializer(
  item: ListItemInputBody,
): ListItemInputBodyRest {
  return {
    inputName: item["inputName"],
  };
}

/** An extensible enum input parameter. */
export type ListItemInputExtensibleEnum = "First" | "Second";

export interface UserListResults {
  /** List of items. */
  items: User[];
  /** Link to fetch more items. */
  nextLink?: string;
}

/** First item. */
export interface FirstItem {
  /** The id of the item. */
  readonly id: number;
}

/** Second item. */
export interface SecondItem {
  /** The name of the item. */
  readonly name: string;
}

/** The version of the API. */
export type Versions = "2022-12-01-preview";

/** Paged collection of User items */
export interface PagedUser {
  /** The User items on this page */
  value: User[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Paged collection of FirstItem items */
export interface PagedFirstItem {
  /** The FirstItem items on this page */
  value: FirstItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Paged collection of SecondItem items */
export interface PagedSecondItem {
  /** The SecondItem items on this page */
  value: SecondItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

function _deserializeUser(input: UserOutput): User {
  return {
    id: passthroughDeserializer(input["id"]) as any,
    name: passthroughDeserializer(input["name"]) as any,
    orders: deserializeArray(input["orders"], deserializeUserOrder) as any,
    etag: passthroughDeserializer(input["etag"]) as any,
  } as any;
}

export const deserializeUser = withNullChecks(_deserializeUser);

function _deserializeUserOrder(input: UserOrderOutput): UserOrder {
  return {
    id: passthroughDeserializer(input["id"]) as any,
    userId: passthroughDeserializer(input["userId"]) as any,
    detail: passthroughDeserializer(input["detail"]) as any,
  } as any;
}

export const deserializeUserOrder = withNullChecks(_deserializeUserOrder);

function _deserializeUserListResults(
  input: UserListResultsOutput,
): UserListResults {
  return {
    items: deserializeArray(input["items"], deserializeUser) as any,
    nextLink: passthroughDeserializer(input["nextLink"]) as any,
  } as any;
}

export const deserializeUserListResults = withNullChecks(
  _deserializeUserListResults,
);

function _deserializeFirstItem(input: FirstItemOutput): FirstItem {
  return {
    id: passthroughDeserializer(input["id"]) as any,
  } as any;
}

export const deserializeFirstItem = withNullChecks(_deserializeFirstItem);

function _deserializeSecondItem(input: SecondItemOutput): SecondItem {
  return {
    name: passthroughDeserializer(input["name"]) as any,
  } as any;
}

export const deserializeSecondItem = withNullChecks(_deserializeSecondItem);
