import { ObjectSchema } from "@azure-tools/codemodel";
export declare type ObjectDetails = BasicObjectDetails | ComposedObjectDetails | PolymorphicObjectDetails;
export declare enum ObjectKind {
    Basic = 0,
    Extended = 1,
    Polymorphic = 2
}
/**
 * Details of a model, transformed from ObjectSchema.
 */
export interface BasicObjectDetails {
    name: string;
    description?: string;
    serializedName: string;
    properties: PropertyDetails[];
    kind: ObjectKind;
    children: ObjectDetails[];
    parents: ObjectDetails[];
    schema: ObjectSchema;
    hasAdditionalProperties: boolean;
}
/**
 * Type that represents an object which inherits
 */
export declare type ComposedObjectDetails = BasicObjectDetails & {
    /**
     * Parents from which the object inherits properties
     */
    parentNames: string[];
};
/**
 * Type for representing polymorphism of an Object
 */
export declare type PolymorphicObjectDetails = BasicObjectDetails & {
    /**
     * Polymorphic discriminator
     */
    discriminatorValues: {
        [key: string]: string[];
    };
    /**
     * This is the discriminator path to be used during serialization
     * which is composed of <ParentName>.<DiscriminatorValue>
     */
    discriminatorPath: string;
    /**
     * Name of the union type which represents
     * the polymorphic options
     */
    unionName: string;
};
/**
 * Details of a model's property, transformed from Property.
 */
export interface PropertyDetails {
    name: string;
    description?: string;
    defaultValue?: string;
    serializedName: string;
    type: string;
    required: boolean;
    readOnly: boolean;
    nullable: boolean;
    isConstant?: boolean;
    typeDetails: TypeDetails;
    isDiscriminator: boolean;
}
/**
 * Details of a property's type
 */
export interface TypeDetails {
    typeName: string;
    isConstant?: boolean;
    nullable?: boolean;
    defaultValue?: string;
    kind: PropertyKind;
    usedModels: string[];
}
/**
 * Details what the kind of property for handling
 */
export declare enum PropertyKind {
    Primitive = 0,
    Enum = 1,
    Composite = 2,
    Dictionary = 3
}
//# sourceMappingURL=modelDetails.d.ts.map