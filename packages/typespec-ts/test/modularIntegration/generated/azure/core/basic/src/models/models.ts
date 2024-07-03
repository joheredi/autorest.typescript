// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
  deserializeArray,
} from "../helpers/serializerHelpers.js";
import {
  FirstItemOutput,
  SecondItemOutput,
  UserListResultsOutput,
  UserOrderOutput,
  UserOutput,
} from "../rest/outputModels.js";
import {
  User as UserRest,
  UserOrder as UserOrderRest,
  ListItemInputBody as ListItemInputBodyRest,
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

function _deserializeUser(input: UserOutput): User {
  return {
    id: passthroughDeserializer(input["id"]),
    name: passthroughDeserializer(input["name"]),
    orders: deserializeArray(input["orders"], deserializeUserOrder),
    etag: passthroughDeserializer(input["etag"]),
  };
}

export const deserializeUser = withNullChecks(_deserializeUser);

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

function _deserializeUserOrder(input: UserOrderOutput): UserOrder {
  return {
    id: passthroughDeserializer(input["id"]),
    userId: passthroughDeserializer(input["userId"]),
    detail: passthroughDeserializer(input["detail"]),
  };
}

export const deserializeUserOrder = withNullChecks(_deserializeUserOrder);

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

function _deserializeUserListResults(
  input: UserListResultsOutput,
): UserListResults {
  return {
    items: deserializeArray(input["items"], deserializeUser),
    nextLink: passthroughDeserializer(input["nextLink"]),
  };
}

export const deserializeUserListResults = withNullChecks(
  _deserializeUserListResults,
);

/** First item. */
export interface FirstItem {
  /** The id of the item. */
  readonly id: number;
}

function _deserializeFirstItem(input: FirstItemOutput): FirstItem {
  return {
    id: passthroughDeserializer(input["id"]),
  };
}

export const deserializeFirstItem = withNullChecks(_deserializeFirstItem);

/** Second item. */
export interface SecondItem {
  /** The name of the item. */
  readonly name: string;
}

function _deserializeSecondItem(input: SecondItemOutput): SecondItem {
  return {
    name: passthroughDeserializer(input["name"]),
  };
}

export const deserializeSecondItem = withNullChecks(_deserializeSecondItem);

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
