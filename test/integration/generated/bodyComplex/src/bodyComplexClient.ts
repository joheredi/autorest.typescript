/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as operations from "./operations";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { BodyComplexClientContext } from "./bodyComplexClientContext";

class BodyComplexClient extends BodyComplexClientContext {
  basic: operations.Basic;
  primitive: operations.Primitive;
  array: operations.Array;
  dictionary: operations.Dictionary;
  inheritance: operations.Inheritance;
  polymorphism: operations.Polymorphism;
  polymorphicrecursive: operations.Polymorphicrecursive;
  readonlyproperty: operations.Readonlyproperty;
  flattencomplex: operations.Flattencomplex;

  /**
   * Initializes a new instance of the BodyComplexClient class.
   * @param options The parameter options
   */
  constructor(options?: any) {
    super(options);
    this.basic = new operations.Basic(this);
    this.primitive = new operations.Primitive(this);
    this.array = new operations.Array(this);
    this.dictionary = new operations.Dictionary(this);
    this.inheritance = new operations.Inheritance(this);
    this.polymorphism = new operations.Polymorphism(this);
    this.polymorphicrecursive = new operations.Polymorphicrecursive(this);
    this.readonlyproperty = new operations.Readonlyproperty(this);
    this.flattencomplex = new operations.Flattencomplex(this);
  }
}

// Operation Specifications

export {
  BodyComplexClient,
  BodyComplexClientContext,
  Models as BodyComplexModels,
  Mappers as BodyComplexMappers
};
export * from "./operations";
