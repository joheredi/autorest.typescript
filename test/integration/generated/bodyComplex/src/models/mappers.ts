/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const Basic: coreHttp.CompositeMapper = {
  serializedName: "Basic",
  type: {
    name: "Composite",
    className: "Basic",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "Number"
        }
      },
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      color: {
        serializedName: "color",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ErrorModel: coreHttp.CompositeMapper = {
  serializedName: "Error",
  type: {
    name: "Composite",
    className: "ErrorModel",
    modelProperties: {
      status: {
        serializedName: "status",
        type: {
          name: "Number"
        }
      },
      message: {
        serializedName: "message",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const IntWrapper: coreHttp.CompositeMapper = {
  serializedName: "IntWrapper",
  type: {
    name: "Composite",
    className: "IntWrapper",
    modelProperties: {
      field1: {
        serializedName: "field1",
        type: {
          name: "Number"
        }
      },
      field2: {
        serializedName: "field2",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LongWrapper: coreHttp.CompositeMapper = {
  serializedName: "LongWrapper",
  type: {
    name: "Composite",
    className: "LongWrapper",
    modelProperties: {
      field1: {
        serializedName: "field1",
        type: {
          name: "Number"
        }
      },
      field2: {
        serializedName: "field2",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const FloatWrapper: coreHttp.CompositeMapper = {
  serializedName: "FloatWrapper",
  type: {
    name: "Composite",
    className: "FloatWrapper",
    modelProperties: {
      field1: {
        serializedName: "field1",
        type: {
          name: "Number"
        }
      },
      field2: {
        serializedName: "field2",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const DoubleWrapper: coreHttp.CompositeMapper = {
  serializedName: "DoubleWrapper",
  type: {
    name: "Composite",
    className: "DoubleWrapper",
    modelProperties: {
      field1: {
        serializedName: "field1",
        type: {
          name: "Number"
        }
      },
      field56ZerosAfterTheDotAndNegativeZeroBeforeDotAndThisIsALongFieldNameOnPurpose: {
        serializedName:
          "field_56_zeros_after_the_dot_and_negative_zero_before_dot_and_this_is_a_long_field_name_on_purpose",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const BooleanWrapper: coreHttp.CompositeMapper = {
  serializedName: "BooleanWrapper",
  type: {
    name: "Composite",
    className: "BooleanWrapper",
    modelProperties: {
      fieldTrue: {
        serializedName: "field_true",
        type: {
          name: "Boolean"
        }
      },
      fieldFalse: {
        serializedName: "field_false",
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const StringWrapper: coreHttp.CompositeMapper = {
  serializedName: "StringWrapper",
  type: {
    name: "Composite",
    className: "StringWrapper",
    modelProperties: {
      field: {
        serializedName: "field",
        type: {
          name: "String"
        }
      },
      empty: {
        serializedName: "empty",
        type: {
          name: "String"
        }
      },
      null: {
        serializedName: "null",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DateWrapper: coreHttp.CompositeMapper = {
  serializedName: "DateWrapper",
  type: {
    name: "Composite",
    className: "DateWrapper",
    modelProperties: {
      field: {
        serializedName: "field",
        type: {
          name: "Date"
        }
      },
      leap: {
        serializedName: "leap",
        type: {
          name: "Date"
        }
      }
    }
  }
};

export const DatetimeWrapper: coreHttp.CompositeMapper = {
  serializedName: "DatetimeWrapper",
  type: {
    name: "Composite",
    className: "DatetimeWrapper",
    modelProperties: {
      field: {
        serializedName: "field",
        type: {
          name: "DateTime"
        }
      },
      now: {
        serializedName: "now",
        type: {
          name: "DateTime"
        }
      }
    }
  }
};

export const Datetimerfc1123Wrapper: coreHttp.CompositeMapper = {
  serializedName: "Datetimerfc1123Wrapper",
  type: {
    name: "Composite",
    className: "Datetimerfc1123Wrapper",
    modelProperties: {
      field: {
        serializedName: "field",
        type: {
          name: "DateTimeRfc1123"
        }
      },
      now: {
        serializedName: "now",
        type: {
          name: "DateTimeRfc1123"
        }
      }
    }
  }
};

export const DurationWrapper: coreHttp.CompositeMapper = {
  serializedName: "DurationWrapper",
  type: {
    name: "Composite",
    className: "DurationWrapper",
    modelProperties: {
      field: {
        serializedName: "field",
        type: {
          name: "TimeSpan"
        }
      }
    }
  }
};

export const ByteWrapper: coreHttp.CompositeMapper = {
  serializedName: "ByteWrapper",
  type: {
    name: "Composite",
    className: "ByteWrapper",
    modelProperties: {
      field: {
        serializedName: "field",
        type: {
          name: "ByteArray"
        }
      }
    }
  }
};

export const ArrayWrapper: coreHttp.CompositeMapper = {
  serializedName: "ArrayWrapper",
  type: {
    name: "Composite",
    className: "ArrayWrapper",
    modelProperties: {
      array: {
        serializedName: "array",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "ArrayWrapperArrayItem"
          }
        }
      }
    }
  }
};

export const DictionaryWrapper: coreHttp.CompositeMapper = {
  serializedName: "DictionaryWrapper",
  type: {
    name: "Composite",
    className: "DictionaryWrapper",
    modelProperties: {
      defaultProgram: {
        serializedName: "defaultProgram",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "String" }
        }
      }
    }
  }
};

export const Pet: coreHttp.CompositeMapper = {
  serializedName: "Pet",
  type: {
    name: "Composite",
    className: "Pet",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "Number"
        }
      },
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Cat: coreHttp.CompositeMapper = {
  serializedName: "Cat",
  type: {
    name: "Composite",
    className: "Cat",
    modelProperties: {
      ...Pet.type.modelProperties,
      color: {
        serializedName: "color",
        type: {
          name: "String"
        }
      },
      hates: {
        serializedName: "hates",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Dog" } }
        }
      }
    }
  }
};

export const Dog: coreHttp.CompositeMapper = {
  serializedName: "Dog",
  type: {
    name: "Composite",
    className: "Dog",
    modelProperties: {
      ...Pet.type.modelProperties,
      food: {
        serializedName: "food",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Siamese: coreHttp.CompositeMapper = {
  serializedName: "Siamese",
  type: {
    name: "Composite",
    className: "Siamese",
    modelProperties: {
      ...Cat.type.modelProperties,
      breed: {
        serializedName: "breed",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Fish: coreHttp.CompositeMapper = {
  serializedName: "Fish",
  type: {
    name: "Composite",
    className: "Fish",
    uberParent: "Fish",
    polymorphicDiscriminator: {
      serializedName: "fishtype",
      clientName: "fishtype"
    },
    modelProperties: {
      fishtype: {
        serializedName: "fishtype",
        required: true,
        type: {
          name: "String"
        }
      },
      species: {
        serializedName: "species",
        type: {
          name: "String"
        }
      },
      length: {
        serializedName: "length",
        required: true,
        type: {
          name: "Number"
        }
      },
      siblings: {
        serializedName: "siblings",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Fish" } }
        }
      }
    }
  }
};

export const DotFish: coreHttp.CompositeMapper = {
  serializedName: "DotFish",
  type: {
    name: "Composite",
    className: "DotFish",
    uberParent: "DotFish",
    polymorphicDiscriminator: {
      serializedName: "fish\\.type",
      clientName: "fish\\.type"
    },
    modelProperties: {
      fishType: {
        serializedName: "fish\\.type",
        required: true,
        type: {
          name: "String"
        }
      },
      species: {
        serializedName: "species",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DotFishMarket: coreHttp.CompositeMapper = {
  serializedName: "DotFishMarket",
  type: {
    name: "Composite",
    className: "DotFishMarket",
    modelProperties: {
      sampleSalmon: {
        serializedName: "sampleSalmon",
        type: {
          name: "Composite",
          className: "DotSalmon"
        }
      },
      salmons: {
        serializedName: "salmons",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "DotSalmon" } }
        }
      },
      sampleFish: {
        serializedName: "sampleFish",
        type: {
          name: "Composite",
          className: "DotFish"
        }
      },
      fishes: {
        serializedName: "fishes",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "DotFish" } }
        }
      }
    }
  }
};

export const DotSalmon: coreHttp.CompositeMapper = {
  serializedName: "DotSalmon",
  type: {
    name: "Composite",
    className: "DotSalmon",
    uberParent: "DotFish",
    polymorphicDiscriminator: DotFish.type.polymorphicDiscriminator,
    modelProperties: {
      ...DotFish.type.modelProperties,
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      iswild: {
        serializedName: "iswild",
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const Salmon: coreHttp.CompositeMapper = {
  serializedName: "salmon",
  type: {
    name: "Composite",
    className: "Salmon",
    uberParent: "Fish",
    polymorphicDiscriminator: {
      serializedName: "fishtype",
      clientName: "fishtype"
    },
    modelProperties: {
      ...Fish.type.modelProperties,
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      iswild: {
        serializedName: "iswild",
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const ReadonlyObj: coreHttp.CompositeMapper = {
  serializedName: "ReadonlyObj",
  type: {
    name: "Composite",
    className: "ReadonlyObj",
    modelProperties: {
      id: {
        serializedName: "id",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      size: {
        serializedName: "size",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const MyBaseType: coreHttp.CompositeMapper = {
  serializedName: "MyBaseType",
  type: {
    name: "Composite",
    className: "MyBaseType",
    uberParent: "MyBaseType",
    polymorphicDiscriminator: {
      serializedName: "kind",
      clientName: "kind"
    },
    modelProperties: {
      kind: {
        defaultValue: "Kind1",
        serializedName: "kind",
        isConstant: true,
        type: {
          name: "String"
        }
      },
      propB1: {
        serializedName: "propB1",
        type: {
          name: "String"
        }
      },
      propBH1: {
        serializedName: "helper.propBH1",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SmartSalmon: coreHttp.CompositeMapper = {
  serializedName: "smart_salmon",
  type: {
    name: "Composite",
    className: "SmartSalmon",
    uberParent: "Fish",
    additionalProperties: { type: { name: "Object" } },
    polymorphicDiscriminator: Fish.type.polymorphicDiscriminator,
    modelProperties: {
      ...Salmon.type.modelProperties,
      collegeDegree: {
        serializedName: "college_degree",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Shark: coreHttp.CompositeMapper = {
  serializedName: "shark",
  type: {
    name: "Composite",
    className: "Shark",
    uberParent: "Fish",
    polymorphicDiscriminator: {
      serializedName: "fishtype",
      clientName: "fishtype"
    },
    modelProperties: {
      ...Fish.type.modelProperties,
      age: {
        serializedName: "age",
        type: {
          name: "Number"
        }
      },
      birthday: {
        serializedName: "birthday",
        required: true,
        type: {
          name: "DateTime"
        }
      }
    }
  }
};

export const Sawshark: coreHttp.CompositeMapper = {
  serializedName: "sawshark",
  type: {
    name: "Composite",
    className: "Sawshark",
    uberParent: "Fish",
    polymorphicDiscriminator: Fish.type.polymorphicDiscriminator,
    modelProperties: {
      ...Shark.type.modelProperties,
      picture: {
        serializedName: "picture",
        type: {
          name: "ByteArray"
        }
      }
    }
  }
};

export const Goblinshark: coreHttp.CompositeMapper = {
  serializedName: "goblin",
  type: {
    name: "Composite",
    className: "Goblinshark",
    uberParent: "Fish",
    polymorphicDiscriminator: Fish.type.polymorphicDiscriminator,
    modelProperties: {
      ...Shark.type.modelProperties,
      jawsize: {
        serializedName: "jawsize",
        type: {
          name: "Number"
        }
      },
      color: {
        defaultValue: "gray",
        serializedName: "color",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Cookiecuttershark: coreHttp.CompositeMapper = {
  serializedName: "cookiecuttershark",
  type: {
    name: "Composite",
    className: "Cookiecuttershark",
    uberParent: "Fish",
    polymorphicDiscriminator: Fish.type.polymorphicDiscriminator,
    modelProperties: {
      ...Shark.type.modelProperties
    }
  }
};

export const MyDerivedType: coreHttp.CompositeMapper = {
  serializedName: "Kind1",
  type: {
    name: "Composite",
    className: "MyDerivedType",
    uberParent: "MyBaseType",
    polymorphicDiscriminator: MyBaseType.type.polymorphicDiscriminator,
    modelProperties: {
      ...MyBaseType.type.modelProperties,
      propD1: {
        serializedName: "propD1",
        type: {
          name: "String"
        }
      }
    }
  }
};

export let discriminators = {
  Fish: Fish,
  DotFish: DotFish,
  "DotFish.DotSalmon": DotSalmon,
  "Fish.salmon": Salmon,
  MyBaseType: MyBaseType,
  "Fish.smart_salmon": SmartSalmon,
  "Fish.shark": Shark,
  "Fish.sawshark": Sawshark,
  "Fish.goblin": Goblinshark,
  "Fish.cookiecuttershark": Cookiecuttershark,
  "MyBaseType.Kind1": MyDerivedType
};
