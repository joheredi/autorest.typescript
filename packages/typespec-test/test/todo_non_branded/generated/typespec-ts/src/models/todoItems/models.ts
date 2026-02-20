import type { ApiError, TodoAttachment, TodoItem } from "./src/models/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types *//**
 * model interface _TodoPage
 */
export interface _TodoPage {
  /**
   * The items in the page
   */
  items: (TodoItem)[];
  /**
   * The number of items returned in this page
   */
  pageSize: number;
  /**
   * The total number of items
   */
  totalSize: number;
  /**
   * A link to the previous page, if it exists
   */
  prevLink?: string;
  /**
   * A link to the next page, if it exists
   */
  nextLink?: string;
}
/**
 * model interface InvalidTodoItem
 */
export interface InvalidTodoItem extends ApiError {}
/**
 * model interface NotFoundErrorResponse
 */
export interface NotFoundErrorResponse {
  code: "not-found";
}
/**
 * model interface TodoItemPatch
 */
export interface TodoItemPatch {
  /**
   * The item's title
   */
  title?: string;
  /**
   * User that the todo is assigned to
   */
  assignedTo?: (number) | null;
  /**
   * A longer description of the todo item in markdown format
   */
  description?: (string) | null;
  /**
   * The status of the todo item
   */
  status?: "NotStarted" | "InProgress" | "Completed";
}
/**
 * model interface _PageTodoAttachment
 */
export interface _PageTodoAttachment {
  items: (TodoAttachment)[];
}
