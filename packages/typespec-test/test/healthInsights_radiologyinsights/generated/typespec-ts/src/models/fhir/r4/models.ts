/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */export type ArrayResource = Array<Resource>;
/**
 * Resource is the ancestor of DomainResource from which most resources are derived. Bundle, Parameters, and Binary extend Resource directly.
 * Based on [FHIR Resource](https://www.hl7.org/fhir/r4/resource.html
 */
export interface Resource {
  /**
   * The type of resource
   */
  resourceType: string;
  /**
   * Resource Id
   */
  id?: string;
  /**
   * Metadata about the resource
   */
  meta?: Meta;
  /**
   * A set of rules under which this content was created
   */
  implicitRules?: string;
  /**
   * Language of the resource content
   */
  language?: string;/**
   * Additional properties
   */
  additionalProperties?: Record<string, any>
}
/**
 * Metadata about a resource
 * Based on [FHIR Meta](https://www.hl7.org/fhir/R4/resource.html#Meta)
 */
export interface Meta {
  /**
   * The version specific identifier, as it appears in the version portion of the URL. This value changes when the resource is created, updated, or deleted.
   */
  versionId?: string;
  /**
   * When the resource last changed - e.g. when the version changed.
   */
  lastUpdated?: string;
  /**
   * A uri that identifies the source system of the resource. This provides a minimal amount of Provenance information that can be used to track or differentiate the source of information in the resource. The source may identify another FHIR server, document, message, database, etc.
   */
  source?: string;
  /**
   * A list of profiles (references to [StructureDefinition](https://www.hl7.org/fhir/structuredefinition.html) resources) that this resource claims to conform to. The URL is a reference to [StructureDefinition.url](https://www.hl7.org/fhir/structuredefinition-definitions.html#StructureDefinition.url).
   */
  profile?: (string)[];
  /**
   * Security labels applied to this resource. These tags connect specific resources to the overall security policy and infrastructure.
   */
  security?: (Coding)[];
  /**
   * Tags applied to this resource. Tags are intended to be used to identify and relate resources to process and workflow, and applications are not required to consider the tags when interpreting the meaning of a resource.
   */
  tag?: (Coding)[];
}
export type ArrayCoding = Array<Coding>;
/**
 * A Coding is a representation of a defined concept using a symbol from a defined "code system".
 * Based on [FHIR Coding](https://www.hl7.org/fhir/R4/datatypes.html#Coding)
 */
export interface Coding extends Element {
  /**
   * Identity of the terminology system
   */
  system?: string;
  /**
   * Version of the system - if relevant
   */
  version?: string;
  /**
   * Symbol in syntax defined by the system
   */
  code?: string;
  /**
   * Representation defined by the system
   */
  display?: string;
}
/**
 * Concept - reference to a terminology or just text
 * Based on [FHIR CodeableConcept](https://www.hl7.org/fhir/R4/datatypes.html#CodeableConcept)
 */
export interface CodeableConcept extends Element {
  /**
   * Code defined by a terminology system
   */
  coding?: (Coding)[];
  /**
   * Plain text representation of the concept
   */
  text?: string;
}
/**
 * The base definition for all elements contained inside a resource.
 * Based on [FHIR Element](https://www.hl7.org/fhir/R4/element.html)
 */
export interface Element {
  /**
   * Unique id for inter-element referencing
   */
  id?: string;
  /**
   * Additional Content defined by implementations
   */
  extension?: (Extension)[];
}
export type ArrayExtension = Array<Extension>;
/**
 * Base for all elements
 * Based on [FHIR Element](https://www.hl7.org/fhir/datatypes.html#Element)
 */
export interface Extension extends Element {
  /**
   * Source of the definition for the extension code - a logical name or a URL.
   */
  url: string;
  /**
   * Value as Quantity
   */
  valueQuantity?: Quantity;
  /**
   * Value as CodeableConcept
   */
  valueCodeableConcept?: CodeableConcept;
  /**
   * Value as string
   */
  valueString?: string;
  /**
   * Value as boolean
   */
  valueBoolean?: boolean;
  /**
   * Value as integer
   */
  valueInteger?: number;
  /**
   * Value as Range.
   */
  valueRange?: Range;
  /**
   * Value as Ratio.
   */
  valueRatio?: Ratio;
  /**
   * Value as SampledData.
   */
  valueSampledData?: SampledData;
  /**
   * Value as time (hh:mm:ss)
   */
  valueTime?: string;
  /**
   * Value as dateTime.
   */
  valueDateTime?: string;
  /**
   * Value as Period.
   */
  valuePeriod?: Period;
  /**
   * Value as reference.
   */
  valueReference?: Reference;
}
/**
 * A measured or measurable amount
 * Based on [FHIR Quantity](https://www.hl7.org/fhir/R4/datatypes.html#Quantity)
 */
export interface Quantity extends Element {
  /**
   * Numerical value (with implicit precision)
   */
  value?: number;
  /**
   * < | <= | >= | > - how to understand the value
   */
  comparator?: string;
  /**
   * Unit representation
   */
  unit?: string;
  /**
   * System that defines coded unit form
   */
  system?: string;
  /**
   * Coded form of the unit
   */
  code?: string;
}
/**
 * A set of ordered Quantities defined by a low and high limit
 * Based on [FHIR Range](https://www.hl7.org/fhir/R4/datatypes.html#Range)
 */
export interface Range extends Element {
  /**
   * Low limit
   */
  low?: Quantity;
  /**
   * High limit
   */
  high?: Quantity;
}
/**
 * A ratio of two Quantity values - a numerator and a denominator
 * Based on [FHIR Ratio](https://www.hl7.org/fhir/R4/datatypes.html#Ratio)
 */
export interface Ratio extends Element {
  /**
   * Numerator value
   */
  numerator?: Quantity;
  /**
   * Denominator value
   */
  denominator?: Quantity;
}
/**
 * A series of measurements taken by a device
 * Based on [FHIR SampledData](https://www.hl7.org/fhir/R4/datatypes.html#SampledData)
 */
export interface SampledData extends Element {
  /**
   * Zero value and units
   */
  origin: Quantity;
  /**
   * Number of milliseconds between samples
   */
  period: number;
  /**
   * Multiply data by this before adding to origin
   */
  factor?: number;
  /**
   * Lower limit of detection
   */
  lowerLimit?: number;
  /**
   * Upper limit of detection
   */
  upperLimit?: number;
  /**
   * Number of sample points at each time point
   */
  dimensions: number;
  /**
   * Decimal values with spaces, or "E" | "U" | "L"
   */
  data?: string;
}
/**
 * A time period defined by a start and end date and optionally time
 * Based on [FHIR Period](https://www.hl7.org/fhir/R4/datatypes.html#Period)
 */
export interface Period extends Element {
  /**
   * Starting time with inclusive boundary
   */
  start?: string;
  /**
   * End time with inclusive boundary, if not ongoing
   */
  end?: string;
}
/**
 * A reference from one resource to another
 * Based on [FHIR Reference](https://www.hl7.org/fhir/R4/references.html)
 */
export interface Reference extends Element {
  /**
   * Literal reference, Relative, internal or absolute URL
   */
  reference?: string;
  /**
   * Type the reference refers to (e.g. "Patient")
   */
  type?: string;
  /**
   * Logical reference, when literal reference is not known
   */
  identifier?: Identifier;
  /**
   * Text alternative for the resource
   */
  display?: string;
}
/**
 * An identifier intended for computation
 * Based on [FHIR Identifier](https://www.hl7.org/fhir/R4/identifier.html)
 */
export interface Identifier extends Element {
  /**
   * usual | official | temp | secondary | old (If known)
   */
  use?: string;
  /**
   * Description of identifier
   */
  type?: CodeableConcept;
  /**
   * The namespace for the identifier value
   */
  system?: string;
  /**
   * The value that is unique
   */
  value?: string;
  /**
   * Time period when id is/was valid for use
   */
  period?: Period;
  /**
   * Organization that issued id (may be just text)
   */
  assigner?: Reference;
}
/**
 * FHIR extendible element
 */
export interface Extendible {
  /**
   * Additional Content defined by implementations
   */
  extension?: (Extension)[];
}
export type ArrayCodeableConcept = Array<CodeableConcept>;
/**
 * Detailed information about observations
 * Based on [FHIR Observation](https://www.hl7.org/fhir/R4/observation.html)
 */
export interface Observation extends DomainResourceUnion {
  /**
   * resourceType
   */
  resourceType: "Observation";
  /**
   * Business Identifier for observation
   */
  identifier?: (Identifier)[];
  /**
   * registered | preliminary | final | amended +
   */
  status: ObservationStatusCodeType;
  /**
   * Classification of  type of observation
   */
  category?: (CodeableConcept)[];
  /**
   * Type of observation (code / type)
   */
  code: CodeableConcept;
  /**
   * Who and/or what the observation is about
   */
  subject?: Reference;
  /**
   * Healthcare event during which this observation is made
   */
  encounter?: Reference;
  /**
   * Clinically relevant time/time-period for observation
   */
  effectiveDateTime?: string;
  /**
   * Clinically relevant time/time-period for observation
   */
  effectivePeriod?: Period;
  /**
   * Clinically relevant time/time-period for observation
   */
  effectiveInstant?: string;
  /**
   * Date/Time this version was made available
   */
  issued?: string;
  /**
   * Actual result
   */
  valueQuantity?: Quantity;
  /**
   * Actual result
   */
  valueCodeableConcept?: CodeableConcept;
  /**
   * Actual result
   */
  valueString?: string;
  /**
   * Actual result
   */
  valueBoolean?: boolean;
  /**
   * Actual result
   */
  valueInteger?: number;
  /**
   * Actual result
   */
  valueRange?: Range;
  /**
   * Actual result
   */
  valueRatio?: Ratio;
  /**
   * Actual result
   */
  valueSampledData?: SampledData;
  /**
   * Actual result
   */
  valueTime?: string;
  /**
   * Actual result
   */
  valueDateTime?: string;
  /**
   * Actual result
   */
  valuePeriod?: Period;
  /**
   * Why the result is missing
   */
  dataAbsentReason?: CodeableConcept;
  /**
   * High, low, normal, etc.
   */
  interpretation?: (CodeableConcept)[];
  /**
   * Comments about the observation
   */
  note?: (Annotation)[];
  /**
   * Observed body part
   */
  bodySite?: CodeableConcept;
  /**
   * How it was done
   */
  method?: CodeableConcept;
  /**
   * Provides guide for interpretation
   */
  referenceRange?: (ObservationReferenceRange)[];
  /**
   * Related resource that belongs to the Observation group
   */
  hasMember?: (Reference)[];
  /**
   * Related measurements the observation is made from
   */
  derivedFrom?: (Reference)[];
  /**
   * Component results
   */
  component?: (ObservationComponent)[];
}
export type ArrayIdentifier = Array<Identifier>;
/**
 * Observation Status
 * Based on [FHIR ObservationStatus](https://www.hl7.org/fhir/R4/valueset-observation-status.html)
 */
export type ObservationStatusCodeType = "registered" | "preliminary" | "final" | "amended" | "corrected" | "cancelled" | "entered-in-error" | "unknown";/**
 * Observation Status
 * Based on [FHIR ObservationStatus](https://www.hl7.org/fhir/R4/valueset-observation-status.html)
 */
export enum KnownObservationStatusCodeType {
  /**
   * The existence of the observation is registered, but there is no result yet available.
   */
  Registered = "registered",
  /**
   * This is an initial or interim observation: data may be incomplete or unverified.
   */
  Preliminary = "preliminary",
  /**
   * The observation is complete and verified by an authorized person.
   */
  Final = "final",
  /**
   * Subsequent to being Final, the observation has been modified subsequent.  This includes updates/new information and corrections.
   */
  Amended = "amended",
  /**
   * Subsequent to being Final, the observation has been modified to correct an error in the test result.
   */
  Corrected = "corrected",
  /**
   * The observation is unavailable because the measurement was not started or not completed (also sometimes called "aborted").
   */
  Cancelled = "cancelled",
  /**
   * The observation has been withdrawn following previous final release.
   */
  EnteredInError = "entered-in-error",
  /**
   * The observation status is unknown.  Note that "unknown" is a value of last resort and every attempt should be made to provide a meaningful value other than "unknown".
   */
  Unknown = "unknown",
}
export type ArrayAnnotation = Array<Annotation>;
/**
 * A text note which also  contains information about who made the statement and when
 * Based on [FHIR Annotation](https://www.hl7.org/fhir/R4/datatypes.html#Annotation)
 */
export interface Annotation extends Element {
  /**
   * Individual responsible for the annotation
   */
  authorString?: string;
  /**
   * When the annotation was made
   */
  time?: string;
  /**
   * The annotation - text content (as markdown)
   */
  text: string;
}
export type ArrayObservationReferenceRange = Array<ObservationReferenceRange>;
/**
 * Provides guide for interpretation of component result
 * Based on [FHIR Observation.referenceRange](https://www.hl7.org/fhir/R4/observation.html)
 */
export interface ObservationReferenceRange {
  /**
   * Low Range, if relevant
   */
  low?: Quantity;
  /**
   * High Range, if relevant
   */
  high?: Quantity;
  /**
   * Reference range qualifier
   */
  type?: CodeableConcept;
  /**
   * Reference range population
   */
  appliesTo?: (CodeableConcept)[];
  /**
   * Applicable age range, if relevant
   */
  age?: Range;
  /**
   * Text based reference range in an observation
   */
  text?: string;
}
export type ArrayReference = Array<Reference>;
export type ArrayObservationComponent = Array<ObservationComponent>;
/**
 * Component results
 * Based on [FHIR Observation.component](https://www.hl7.org/fhir/R4/observation.html)
 */
export interface ObservationComponent extends Element {
  /**
   * Type of component observation (code / type)
   */
  code: CodeableConcept;
  /**
   * Value as Quantity
   */
  valueQuantity?: Quantity;
  /**
   * Value as CodeableConcept
   */
  valueCodeableConcept?: CodeableConcept;
  /**
   * Value as string
   */
  valueString?: string;
  /**
   * Value as boolean
   */
  valueBoolean?: boolean;
  /**
   * Value as integer
   */
  valueInteger?: number;
  /**
   * Value as Range.
   */
  valueRange?: Range;
  /**
   * Value as Ratio.
   */
  valueRatio?: Ratio;
  /**
   * Value as SampledData.
   */
  valueSampledData?: SampledData;
  /**
   * Value as time (hh:mm:ss)
   */
  valueTime?: string;
  /**
   * Value as dateTime.
   */
  valueDateTime?: string;
  /**
   * Value as Period.
   */
  valuePeriod?: Period;
  /**
   * Value as reference.
   */
  valueReference?: Reference;
  /**
   * Why the component result is missing
   */
  dataAbsentReason?: CodeableConcept;
  /**
   * High, low, normal, etc.
   */
  interpretation?: (CodeableConcept)[];
  /**
   * Provides guide for interpretation of component result
   */
  referenceRange?: (ObservationReferenceRange)[];
}
/**
 * A resource with narrative, extensions, and contained resources
 * Based on [FHIR DomainResource](https://www.hl7.org/fhir/domainresource.html)
 */
export interface DomainResource extends Resource {
  /**
   * Discriminator property for DomainResource.
   */
  resourceType: string;
  /**
   * Text summary of the resource, for human interpretation
   */
  text?: Narrative;
  /**
   * Contained, inline Resources
   */
  contained?: (Resource)[];
  /**
   * Additional Content defined by implementations
   */
  extension?: (Extension)[];
  /**
   * Extensions that cannot be ignored
   */
  modifierExtension?: (Extension)[];
}/**
 * Alias for DomainResourceUnion
 */
export type DomainResourceUnion = Observation | DomainResourceUnion;
/**
 * Any resource that is a [DomainResource](https://www.hl7.org/fhir/domainresource.html) may include a human-readable narrative that contains a summary of the resource and may be used to represent the content of the resource to a human.
 * Based on [FHIR Narrative](https://www.hl7.org/fhir/R4/narrative.html#Narrative)
 */
export interface Narrative extends Element {
  /**
   * generated, extensions, additional, empty
   */
  status: string;
  /**
   * xhtml
   */
  div: string;
}
