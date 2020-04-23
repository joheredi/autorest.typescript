/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const OperationList: coreHttp.CompositeMapper = {
  serializedName: "OperationList",
  type: {
    name: "Composite",
    className: "OperationList",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Operation" } }
        }
      }
    }
  }
};

export const Operation: coreHttp.CompositeMapper = {
  serializedName: "Operation",
  type: {
    name: "Composite",
    className: "Operation",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      origin: {
        serializedName: "origin",
        type: {
          name: "String"
        }
      },
      display: {
        serializedName: "display",
        type: {
          name: "Composite",
          className: "OperationDisplayDefinition"
        }
      }
    }
  }
};

export const OperationDisplayDefinition: coreHttp.CompositeMapper = {
  serializedName: "OperationDisplayDefinition",
  type: {
    name: "Composite",
    className: "OperationDisplayDefinition",
    modelProperties: {
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      operation: {
        serializedName: "operation",
        type: {
          name: "String"
        }
      },
      provider: {
        serializedName: "provider",
        type: {
          name: "String"
        }
      },
      resource: {
        serializedName: "resource",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const GalleryItemList: coreHttp.CompositeMapper = {
  serializedName: "GalleryItemList",
  type: {
    name: "Composite",
    className: "GalleryItemList",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "GalleryItem" } }
        }
      }
    }
  }
};

export const Resource: coreHttp.CompositeMapper = {
  serializedName: "Resource",
  type: {
    name: "Composite",
    className: "Resource",
    modelProperties: {
      id: {
        serializedName: "id",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      location: {
        serializedName: "location",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      tags: {
        serializedName: "tags",
        readOnly: true,
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "String" }
        }
      }
    }
  }
};

export const GalleryItem: coreHttp.CompositeMapper = {
  serializedName: "GalleryItem",
  type: {
    name: "Composite",
    className: "GalleryItem",
    modelProperties: {
      ...Resource.type.modelProperties,
      identity: {
        serializedName: "properties.identity",
        type: {
          name: "String"
        }
      },
      publisher: {
        serializedName: "properties.publisher",
        type: {
          name: "String"
        }
      },
      publisherDisplayName: {
        serializedName: "properties.publisherDisplayName",
        type: {
          name: "String"
        }
      },
      itemName: {
        serializedName: "properties.itemName",
        type: {
          name: "String"
        }
      },
      itemDisplayName: {
        serializedName: "properties.itemDisplayName",
        type: {
          name: "String"
        }
      },
      version: {
        serializedName: "properties.version",
        type: {
          name: "String"
        }
      },
      summary: {
        serializedName: "properties.summary",
        type: {
          name: "String"
        }
      },
      longSummary: {
        serializedName: "properties.longSummary",
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "properties.description",
        type: {
          name: "String"
        }
      },
      uiDefinitionUri: {
        serializedName: "properties.uiDefinitionUri",
        type: {
          name: "String"
        }
      },
      createdTime: {
        serializedName: "properties.createdTime",
        type: {
          name: "DateTime"
        }
      },
      changedTime: {
        serializedName: "properties.changedTime",
        type: {
          name: "DateTime"
        }
      },
      marketingMaterial: {
        serializedName: "marketingMaterial",
        type: {
          name: "Composite",
          className: "MarketingMaterial"
        }
      },
      itemType: {
        serializedName: "properties.itemType",
        type: {
          name: "String"
        }
      },
      categoryIds: {
        serializedName: "properties.categoryIds",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "GalleryItemPropertiesCategoryIdsItem"
          }
        }
      },
      screenshotUris: {
        serializedName: "properties.screenshotUris",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "GalleryItemPropertiesScreenshotUrisItem"
          }
        }
      },
      links: {
        serializedName: "properties.links",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "LinkProperties" } }
        }
      },
      filters: {
        serializedName: "properties.filters",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Filter" } }
        }
      },
      iconFileUris: {
        serializedName: "iconFileUris",
        type: {
          name: "Composite",
          className: "GalleryItemPropertiesIconFileUris"
        }
      },
      artifacts: {
        serializedName: "properties.artifacts",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Artifact" } }
        }
      },
      metadata: {
        serializedName: "metadata",
        type: {
          name: "Composite",
          className: "OpenProperty"
        }
      },
      properties: {
        serializedName: "properties.properties",
        readOnly: true,
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "String" }
        }
      },
      images: {
        serializedName: "properties.images",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "ImageGroup" } }
        }
      },
      products: {
        serializedName: "properties.products",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Product" } }
        }
      },
      resourceGroupName: {
        serializedName: "properties.resourceGroupName",
        type: {
          name: "String"
        }
      },
      definitionTemplates: {
        serializedName: "definitionTemplates",
        type: {
          name: "Composite",
          className: "DefinitionTemplates"
        }
      },
      additionalProperties: {
        serializedName: "properties.additionalProperties",
        readOnly: true,
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "String" }
        }
      }
    }
  }
};

export const MarketingMaterial: coreHttp.CompositeMapper = {
  serializedName: "MarketingMaterial",
  type: {
    name: "Composite",
    className: "MarketingMaterial",
    modelProperties: {
      path: {
        serializedName: "path",
        type: {
          name: "String"
        }
      },
      learnUri: {
        serializedName: "learnUri",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const LinkProperties: coreHttp.CompositeMapper = {
  serializedName: "LinkProperties",
  type: {
    name: "Composite",
    className: "LinkProperties",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "String"
        }
      },
      displayName: {
        serializedName: "displayName",
        type: {
          name: "String"
        }
      },
      uri: {
        serializedName: "uri",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Filter: coreHttp.CompositeMapper = {
  serializedName: "Filter",
  type: {
    name: "Composite",
    className: "Filter",
    modelProperties: {
      type: {
        serializedName: "type",
        type: {
          name: "String"
        }
      },
      value: {
        serializedName: "value",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const GalleryItemPropertiesIconFileUris: coreHttp.CompositeMapper = {
  serializedName: "GalleryItemPropertiesIconFileUris",
  type: {
    name: "Composite",
    className: "GalleryItemPropertiesIconFileUris",
    modelProperties: {
      small: {
        serializedName: "small",
        type: {
          name: "String"
        }
      },
      medium: {
        serializedName: "medium",
        type: {
          name: "String"
        }
      },
      large: {
        serializedName: "large",
        type: {
          name: "String"
        }
      },
      wide: {
        serializedName: "wide",
        type: {
          name: "String"
        }
      },
      hero: {
        serializedName: "hero",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Artifact: coreHttp.CompositeMapper = {
  serializedName: "Artifact",
  type: {
    name: "Composite",
    className: "Artifact",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      uri: {
        serializedName: "uri",
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const OpenProperty: coreHttp.CompositeMapper = {
  serializedName: "OpenProperty",
  type: {
    name: "Composite",
    className: "OpenProperty",
    modelProperties: {
      properties: {
        serializedName: "properties",
        readOnly: true,
        type: {
          name: "Dictionary",
          value: { type: { name: "any" }, serializedName: "any" }
        }
      }
    }
  }
};

export const ImageGroup: coreHttp.CompositeMapper = {
  serializedName: "ImageGroup",
  type: {
    name: "Composite",
    className: "ImageGroup",
    modelProperties: {
      context: {
        serializedName: "context",
        type: {
          name: "String"
        }
      },
      items: {
        serializedName: "items",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Image" } }
        }
      }
    }
  }
};

export const Image: coreHttp.CompositeMapper = {
  serializedName: "Image",
  type: {
    name: "Composite",
    className: "Image",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "String"
        }
      },
      uri: {
        serializedName: "uri",
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Product: coreHttp.CompositeMapper = {
  serializedName: "Product",
  type: {
    name: "Composite",
    className: "Product",
    modelProperties: {
      displayName: {
        serializedName: "displayName",
        type: {
          name: "String"
        }
      },
      publisherDisplayName: {
        serializedName: "publisherDisplayName",
        type: {
          name: "String"
        }
      },
      pricingDetailsUri: {
        serializedName: "pricingDetailsUri",
        type: {
          name: "String"
        }
      },
      offerDetails: {
        serializedName: "offerDetails",
        type: {
          name: "Composite",
          className: "OfferDetails"
        }
      },
      legalTerms: {
        serializedName: "legalTerms",
        type: {
          name: "String"
        }
      },
      privacyPolicy: {
        serializedName: "privacyPolicy",
        type: {
          name: "String"
        }
      },
      legalTermsUri: {
        serializedName: "legalTermsUri",
        type: {
          name: "String"
        }
      },
      privacyPolicyUri: {
        serializedName: "privacyPolicyUri",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const OfferDetails: coreHttp.CompositeMapper = {
  serializedName: "OfferDetails",
  type: {
    name: "Composite",
    className: "OfferDetails",
    modelProperties: {
      publisherId: {
        serializedName: "publisherId",
        type: {
          name: "String"
        }
      },
      offerId: {
        serializedName: "offerId",
        type: {
          name: "String"
        }
      },
      plans: {
        serializedName: "plans",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Plan" } }
        }
      }
    }
  }
};

export const Plan: coreHttp.CompositeMapper = {
  serializedName: "Plan",
  type: {
    name: "Composite",
    className: "Plan",
    modelProperties: {
      planId: {
        serializedName: "planId",
        type: {
          name: "String"
        }
      },
      displayName: {
        serializedName: "displayName",
        type: {
          name: "String"
        }
      },
      summary: {
        serializedName: "summary",
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DefinitionTemplates: coreHttp.CompositeMapper = {
  serializedName: "DefinitionTemplates",
  type: {
    name: "Composite",
    className: "DefinitionTemplates",
    modelProperties: {
      uiDefinitionFileUri: {
        serializedName: "uiDefinitionFileUri",
        type: {
          name: "String"
        }
      },
      defaultDeploymentTemplateId: {
        serializedName: "defaultDeploymentTemplateId",
        type: {
          name: "String"
        }
      },
      deploymentTemplateFileUris: {
        serializedName: "deploymentTemplateFileUris",
        readOnly: true,
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "String" }
        }
      },
      deploymentFragmentFileUris: {
        serializedName: "deploymentFragmentFileUris",
        readOnly: true,
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "String" }
        }
      }
    }
  }
};

export const GalleryItemUriPayload: coreHttp.CompositeMapper = {
  serializedName: "GalleryItemUriPayload",
  type: {
    name: "Composite",
    className: "GalleryItemUriPayload",
    modelProperties: {
      galleryItemUri: {
        serializedName: "galleryItemUri",
        type: {
          name: "String"
        }
      }
    }
  }
};
