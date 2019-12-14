/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const Basic: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      id: {
        type: {
          name: "Number"
        },
        serializedName: "id"
      },
      name: {
        type: {
          name: "String"
        },
        serializedName: "name"
      },
      color: {
        type: {
          name: "Enum",
          allowedValues: ["cyan", "Magenta", "YELLOW", "blacK"]
        },
        serializedName: "color"
      }
    }
  },
  serializedName: "basic"
};

export const ErrorModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      status: {
        type: {
          name: "Number"
        },
        serializedName: "status"
      },
      message: {
        type: {
          name: "String"
        },
        serializedName: "message"
      }
    }
  },
  serializedName: "Error"
};

export const IntWrapper: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      field1: {
        type: {
          name: "Number"
        },
        serializedName: "field1"
      },
      field2: {
        type: {
          name: "Number"
        },
        serializedName: "field2"
      }
    }
  },
  serializedName: "int-wrapper"
};

export const LongWrapper: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      field1: {
        type: {
          name: "Number"
        },
        serializedName: "field1"
      },
      field2: {
        type: {
          name: "Number"
        },
        serializedName: "field2"
      }
    }
  },
  serializedName: "long-wrapper"
};

export const FloatWrapper: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      field1: {
        type: {
          name: "Number"
        },
        serializedName: "field1"
      },
      field2: {
        type: {
          name: "Number"
        },
        serializedName: "field2"
      }
    }
  },
  serializedName: "float-wrapper"
};

export const DoubleWrapper: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      field1: {
        type: {
          name: "Number"
        },
        serializedName: "field1"
      },
      field56ZerosAfterTheDotAndNegativeZeroBeforeDotAndThisIsALongFieldNameOnPurpose: {
        type: {
          name: "Number"
        },
        serializedName:
          "field_56_zeros_after_the_dot_and_negative_zero_before_dot_and_this_is_a_long_field_name_on_purpose"
      }
    }
  },
  serializedName: "double-wrapper"
};

export const BooleanWrapper: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      fieldTrue: {
        type: {
          name: "Boolean"
        },
        serializedName: "field_true"
      },
      fieldFalse: {
        type: {
          name: "Boolean"
        },
        serializedName: "field_false"
      }
    }
  },
  serializedName: "boolean-wrapper"
};

export const StringWrapper: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      field: {
        type: {
          name: "String"
        },
        serializedName: "field"
      },
      empty: {
        type: {
          name: "String"
        },
        serializedName: "empty"
      },
      null: {
        type: {
          name: "String"
        },
        serializedName: "null"
      }
    }
  },
  serializedName: "string-wrapper"
};

export const DateWrapper: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      field: {
        type: {
          name: "Date"
        },
        serializedName: "field"
      },
      leap: {
        type: {
          name: "Date"
        },
        serializedName: "leap"
      }
    }
  },
  serializedName: "date-wrapper"
};

export const DatetimeWrapper: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      field: {
        type: {
          name: "DateTime"
        },
        serializedName: "field"
      },
      now: {
        type: {
          name: "DateTime"
        },
        serializedName: "now"
      }
    }
  },
  serializedName: "datetime-wrapper"
};

export const Datetimerfc1123Wrapper: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      field: {
        type: {
          name: "DateTimeRfc1123"
        },
        serializedName: "field"
      },
      now: {
        type: {
          name: "DateTimeRfc1123"
        },
        serializedName: "now"
      }
    }
  },
  serializedName: "datetimerfc1123-wrapper"
};

export const DurationWrapper: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      field: {
        type: {
          name: "TimeSpan"
        },
        serializedName: "field"
      }
    }
  },
  serializedName: "duration-wrapper"
};

export const ByteWrapper: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      field: {
        type: {
          name: "ByteArray"
        },
        serializedName: "field"
      }
    }
  },
  serializedName: "byte-wrapper"
};

export const ArrayWrapper: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      array: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            },
            serializedName: "array-wrapper-arrayItem"
          }
        },
        serializedName: "array"
      }
    }
  },
  serializedName: "array-wrapper"
};

export const DictionaryWrapper: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      defaultProgram: {
        type: {
          name: "Dictionary",
          value: {
            type: {
              name: "String"
            },
            serializedName: "string"
          }
        },
        serializedName: "defaultProgram"
      }
    }
  },
  serializedName: "dictionary-wrapper"
};

export const Pet: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      id: {
        type: {
          name: "Number"
        },
        serializedName: "id"
      },
      name: {
        type: {
          name: "String"
        },
        serializedName: "name"
      }
    }
  },
  serializedName: "pet"
};

export const Cat: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      color: {
        type: {
          name: "String"
        },
        serializedName: "color"
      },
      hates: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Dog"
            }
          }
        },
        serializedName: "hates"
      }
    }
  },
  serializedName: "cat"
};

export const Dog: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      food: {
        type: {
          name: "String"
        },
        serializedName: "food"
      }
    }
  },
  serializedName: "dog"
};

export const Siamese: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      breed: {
        type: {
          name: "String"
        },
        serializedName: "breed"
      }
    }
  },
  serializedName: "siamese"
};

export const Fish: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      fishtype: {
        type: {
          name: "String"
        },
        serializedName: "fishtype",
        required: true
      },
      species: {
        type: {
          name: "String"
        },
        serializedName: "species"
      },
      length: {
        type: {
          name: "Number"
        },
        serializedName: "length",
        required: true
      },
      siblings: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Fish"
            }
          }
        },
        serializedName: "siblings"
      }
    }
  },
  serializedName: "Fish"
};

export const DotFish: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      fishType: {
        type: {
          name: "String"
        },
        serializedName: "fish.type",
        required: true
      },
      species: {
        type: {
          name: "String"
        },
        serializedName: "species"
      }
    }
  },
  serializedName: "DotFish"
};

export const DotFishMarket: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      sampleSalmon: {
        serializedName: "sampleSalmon",
        type: {
          name: "Composite",
          className: "DotSalmon"
        }
      },
      salmons: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "DotSalmon"
            }
          }
        },
        serializedName: "salmons"
      },
      sampleFish: {
        serializedName: "sampleFish",
        type: {
          name: "Composite",
          className: "DotFish"
        }
      },
      fishes: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "DotFish"
            }
          }
        },
        serializedName: "fishes"
      }
    }
  },
  serializedName: "DotFishMarket"
};

export const DotSalmon: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      location: {
        type: {
          name: "String"
        },
        serializedName: "location"
      },
      iswild: {
        type: {
          name: "Boolean"
        },
        serializedName: "iswild"
      }
    }
  },
  serializedName: "DotSalmon"
};

export const Salmon: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      location: {
        type: {
          name: "String"
        },
        serializedName: "location"
      },
      iswild: {
        type: {
          name: "Boolean"
        },
        serializedName: "iswild"
      }
    }
  },
  serializedName: "salmon"
};

export const ReadonlyObj: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      id: {
        type: {
          name: "String"
        },
        serializedName: "id"
      },
      size: {
        type: {
          name: "Number"
        },
        serializedName: "size"
      }
    }
  },
  serializedName: "readonly-obj"
};

export const MyBaseType: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      kind: {
        type: {
          name: "String"
        },
        serializedName: "kind",
        defaultValue: "Kind1",
        isConstant: true
      },
      propB1: {
        type: {
          name: "String"
        },
        serializedName: "propB1"
      },
      helper: {
        serializedName: "helper",
        type: {
          name: "Composite",
          className: "MyBaseHelperType"
        }
      }
    }
  },
  serializedName: "MyBaseType"
};

export const MyBaseHelperType: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      propBH1: {
        type: {
          name: "String"
        },
        serializedName: "propBH1"
      }
    }
  },
  serializedName: "MyBaseHelperType"
};

export const SmartSalmon: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      collegeDegree: {
        type: {
          name: "String"
        },
        serializedName: "college_degree"
      }
    }
  },
  serializedName: "smart_salmon"
};

export const Shark: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      age: {
        type: {
          name: "Number"
        },
        serializedName: "age"
      },
      birthday: {
        type: {
          name: "DateTime"
        },
        serializedName: "birthday",
        required: true
      }
    }
  },
  serializedName: "shark"
};

export const Sawshark: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      picture: {
        type: {
          name: "ByteArray"
        },
        serializedName: "picture"
      }
    }
  },
  serializedName: "sawshark"
};

export const Goblinshark: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      jawsize: {
        type: {
          name: "Number"
        },
        serializedName: "jawsize"
      },
      color: {
        type: {
          name: "Enum",
          allowedValues: ["pink", "gray", "brown"]
        },
        serializedName: "color",
        defaultValue: "gray"
      }
    }
  },
  serializedName: "goblinshark"
};

export const Cookiecuttershark: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {}
  },
  serializedName: "cookiecuttershark"
};

export const MyDerivedType: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    modelProperties: {
      propD1: {
        type: {
          name: "String"
        },
        serializedName: "propD1"
      }
    }
  },
  serializedName: "MyDerivedType"
};
