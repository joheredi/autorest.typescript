import type { CodeableConcept, Extendible, Observation, Period, Resource } from "./src/models/fhir/r4/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types *//**
 * A patient record, including their clinical information and data.
 */
export interface PatientRecord {
  /**
   * A given identifier for the patient. Has to be unique across all patients in a single request.
   */
  id: string;
  /**
   * Patient structured information, including demographics and known structured clinical information.
   */
  info?: PatientInfo;
  /**
   * Patient encounters/visits.
   */
  encounters?: (Encounter)[];
  /**
   * Patient unstructured clinical data, given as documents.
   */
  patientDocuments?: (PatientDocument)[];
}
/**
 * Patient structured information, including demographics and known structured clinical information.
 */
export interface PatientInfo {
  /**
   * The patient's sex.
   */
  sex?: PatientInfoSex;
  /**
   * The patient's date of birth.
   */
  birthDate?: Date;
  /**
   * Known clinical information for the patient, structured.
   */
  clinicalInfo?: (Resource)[];
}
/**
 * The patient's sex.
 */
export type PatientInfoSex = "female" | "male" | "unspecified";/**
 * The patient's sex.
 */
export enum KnownPatientInfoSex {
  /**
   * female
   */
  Female = "female",
  /**
   * male
   */
  Male = "male",
  /**
   * unspecified
   */
  Unspecified = "unspecified",
}
export type ArrayString = Array<string>;
export type ArrayEncounter = Array<Encounter>;
/**
 * visit/encounter information
 */
export interface Encounter {
  /**
   * The id of the visit.
   */
  id: string;
  /**
   * Time period of the visit.
   * In case of admission, use timePeriod.start to indicate the admission time and timePeriod.end to indicate the discharge time.
   */
  period?: TimePeriod;
  /**
   * The class of the encounter.
   */
  class_?: EncounterClass;
}
/**
 * A duration of time during which an event is happening
 */
export interface TimePeriod {
  /**
   * Starting time with inclusive boundary
   */
  start?: Date;
  /**
   * End time with inclusive boundary, if not ongoing
   */
  end?: Date;
}
/**
 * Known values codes that can be used to indicate the class of encounter (TODO://Based on FHIR value set--http://....).
 */
export type EncounterClass = "inpatient" | "ambulatory" | "observation" | "emergency" | "virtual" | "healthHome";/**
 * Known values codes that can be used to indicate the class of encounter (TODO://Based on FHIR value set--http://....).
 */
export enum KnownEncounterClass {
  /**
   * A patient encounter where a patient is admitted by a hospital or equivalent facility, assigned to a location where patients generally stay at least overnight and provided with room, board, and continuous nursing service.
   */
  InPatient = "inpatient",
  /**
   * The term ambulatory usually implies that the patient has come to the location and is not assigned to a bed. Sometimes referred to as an outpatient encounter.
   */
  Ambulatory = "ambulatory",
  /**
   * An encounter where the patient usually will start in different encounter, such as one in the emergency department but then transition to this type of encounter because they require a significant period of treatment and monitoring to determine whether or not their condition warrants an inpatient admission or discharge.
   */
  Observation = "observation",
  /**
   * A patient encounter that takes place at a dedicated healthcare service delivery location where the patient receives immediate evaluation and treatment, provided until the patient can be discharged or responsibility for the patient's care is transferred elsewhere (for example, the patient could be admitted as an inpatient or transferred to another facility.
   */
  Emergency = "emergency",
  /**
   * A patient encounter where the patient is not physically present for the encounter, such as in a telehealth encounter, phone call, or electronic communication.
   */
  Virtual = "virtual",
  /**
   * Healthcare encounter that takes place in the residence of the patient or a designee
   */
  HealthHome = "healthHome",
}
export type ArrayPatientDocument = Array<PatientDocument>;
/**
 * A clinical document related to a patient. Document here is in the wide sense - not just a text document (note).
 */
export interface PatientDocument {
  /**
   * The type of the patient document, such as 'note' (text document) or 'fhirBundle' (FHIR JSON document).
   */
  type: DocumentType;
  /**
   * The type of the clinical document.
   */
  clinicalType?: ClinicalDocumentType;
  /**
   * A given identifier for the document. Has to be unique across all documents for a single patient.
   */
  id: string;
  /**
   * A 2 letter ISO 639-1 representation of the language of the document.
   */
  language?: string;
  /**
   * The date and time when the document was created.
   */
  createdDateTime?: Date;
  /**
   * Document author(s)
   */
  authors?: (DocumentAuthor)[];
  /**
   * specialty type the document
   */
  specialtyType?: SpecialtyType;
  /**
   * Administrative metadata for the document.
   */
  administrativeMetadata?: DocumentAdministrativeMetadata;
  /**
   * The content of the patient document.
   */
  content: DocumentContent;
}
/**
 * The type of the patient document, such as 'note' (text document) or 'fhirBundle' (FHIR JSON document).
 */
export type DocumentType = "note" | "fhirBundle" | "dicom" | "genomicSequencing";/**
 * The type of the patient document, such as 'note' (text document) or 'fhirBundle' (FHIR JSON document).
 */
export enum KnownDocumentType {
  /**
   * note
   */
  Note = "note",
  /**
   * fhirBundle
   */
  FhirBundle = "fhirBundle",
  /**
   * dicom
   */
  Dicom = "dicom",
  /**
   * genomicSequencing
   */
  GenomicSequencing = "genomicSequencing",
}
/**
 * The type of the clinical document.
 */
export type ClinicalDocumentType = "consultation" | "dischargeSummary" | "historyAndPhysical" | "radiologyReport" | "procedure" | "progress" | "laboratory" | "pathologyReport";/**
 * The type of the clinical document.
 */
export enum KnownClinicalDocumentType {
  /**
   * consultation
   */
  Consultation = "consultation",
  /**
   * dischargeSummary
   */
  DischargeSummary = "dischargeSummary",
  /**
   * historyAndPhysical
   */
  HistoryAndPhysical = "historyAndPhysical",
  /**
   * radiologyReport
   */
  RadiologyReport = "radiologyReport",
  /**
   * procedure
   */
  Procedure = "procedure",
  /**
   * progress
   */
  Progress = "progress",
  /**
   * laboratory
   */
  Laboratory = "laboratory",
  /**
   * pathologyReport
   */
  PathologyReport = "pathologyReport",
}
export type ArrayDocumentAuthor = Array<DocumentAuthor>;
/**
 * Document author
 */
export interface DocumentAuthor {
  /**
   * author id
   */
  id?: string;
  /**
   * Text representation of the full name
   */
  fullName?: string;
}
/**
 * Known values codes that can be used to indicate the type of the Specialty.
 */
export type SpecialtyType = "pathology" | "radiology";/**
 * Known values codes that can be used to indicate the type of the Specialty.
 */
export enum KnownSpecialtyType {
  /**
   * pathology
   */
  Pathology = "pathology",
  /**
   * radiology
   */
  Radiology = "radiology",
}
/**
 * Document administrative metadata
 */
export interface DocumentAdministrativeMetadata {
  /**
   * List of procedure information associated with the document.
   */
  orderedProcedures?: (OrderedProcedure)[];
  /**
   * Reference to the encounter associated with the document.
   */
  encounterId?: string;
}
export type ArrayOrderedProcedure = Array<OrderedProcedure>;
/**
 * Procedure information
 */
export interface OrderedProcedure extends Extendible {
  /**
   * Procedure code
   */
  code?: CodeableConcept;
  /**
   * Procedure description
   */
  description?: string;
}
/**
 * The content of the patient document.
 */
export interface DocumentContent {
  /**
   * The type of the content's source.
   * In case the source type is 'inline', the content is given as a string (for instance, text).
   * In case the source type is 'reference', the content is given as a URI.
   */
  sourceType: DocumentContentSourceType;
  /**
   * The content of the document, given either inline (as a string) or as a reference (URI).
   */
  value: string;
}
/**
 * The type of the content's source.
 * In case the source type is 'inline', the content is given as a string (for instance, text).
 * In case the source type is 'reference', the content is given as a URI.
 */
export type DocumentContentSourceType = "inline" | "reference";/**
 * The type of the content's source.
 * In case the source type is 'inline', the content is given as a string (for instance, text).
 * In case the source type is 'reference', the content is given as a URI.
 */
export enum KnownDocumentContentSourceType {
  /**
   * The content is given as a string (for instance, text).
   */
  Inline = "inline",
  /**
   * The content is given as a URI.
   */
  Reference = "reference",
}
/**
 * Configuration affecting the Radiology Insights model's inference.
 */
export interface RadiologyInsightsModelConfiguration {
  /**
   * An indication whether the model should produce verbose output.
   */
  verbose?: boolean;
  /**
   * An indication whether the model's output should include evidence for the inferences.
   */
  includeEvidence?: boolean;
  /**
   * A list of inference types to be inferred for the current request.
   * This could be used if only part of the Radiology Insights inferences are required.
   * If this list is omitted or empty, the model will return all the inference types.
   */
  inferenceTypes?: (RadiologyInsightsInferenceType)[];
  /**
   * The options for the Radiology Insights Inferences
   */
  inferenceOptions?: RadiologyInsightsInferenceOptions;
  /**
   * Local for the model to use. If not specified, the model will use the default locale
   */
  locale?: string;
}
export type ArrayRadiologyInsightsInferenceType = Array<RadiologyInsightsInferenceType>;
/**
 * A Radiology Insights inference types.
 */
export type RadiologyInsightsInferenceType = "ageMismatch" | "lateralityDiscrepancy" | "sexMismatch" | "completeOrderDiscrepancy" | "limitedOrderDiscrepancy" | "finding" | "criticalResult" | "followupRecommendation" | "followupCommunication" | "radiologyProcedure";/**
 * A Radiology Insights inference types.
 */
export enum KnownRadiologyInsightsInferenceType {
  /**
   * Age mismatch inference type
   */
  AgeMismatch = "ageMismatch",
  /**
   * Laterality discrepancy inference type
   */
  LateralityDiscrepancy = "lateralityDiscrepancy",
  /**
   * Sex mismatch inference type
   */
  SexMismatch = "sexMismatch",
  /**
   * Complete order discrepancy inference type
   */
  CompleteOrderDiscrepancy = "completeOrderDiscrepancy",
  /**
   * Limited order discrepancy inference type
   */
  LimitedOrderDiscrepancy = "limitedOrderDiscrepancy",
  /**
   * Finding inference type
   */
  Finding = "finding",
  /**
   * Critical finding inference type
   */
  CriticalResult = "criticalResult",
  /**
   * Recommendation inference type
   */
  FollowupRecommendation = "followupRecommendation",
  /**
   * Followup Communication inference type
   */
  FollowupCommunication = "followupCommunication",
  /**
   * Radiology Procedure inference type
   */
  RadiologyProcedure = "radiologyProcedure",
}
/**
 * The options for the Radiology Insights Inferences
 */
export interface RadiologyInsightsInferenceOptions {
  /**
   * Followup Recommendation Options
   */
  followupRecommendation?: FollowupRecommendationOptions;
  /**
   * Finding Options
   */
  finding?: FindingOptions;
}
/**
 * Followup Recommendation Options
 */
export interface FollowupRecommendationOptions {
  /**
   * Include/Exclude followup recommendations with no specific radiologic modality, default is false.
   */
  includeRecommendationsWithNoSpecifiedModality?: boolean;
  /**
   * Include/Exclude followup recommendations in references to a guideline or article, default is false.
   */
  includeRecommendationsInReferences?: boolean;
  /**
   * Provide a single focused sentence as evidence for the recommendation, default is false.
   */
  provideFocusedSentenceEvidence?: boolean;
}
/**
 * Finding Options
 */
export interface FindingOptions {
  /**
   * Provide a single focused sentence as evidence for the finding, default is false.
   */
  provideFocusedSentenceEvidence?: boolean;
}
export type ArrayPatientRecord = Array<PatientRecord>;
/**
 * The inference results for the Radiology Insights request.
 */
export interface RadiologyInsightsInferenceResult {
  /**
   * Results for the patients given in the request.
   */
  patientResults: (RadiologyInsightsPatientResult)[];
  /**
   * The version of the model used for inference, expressed as the model date.
   */
  modelVersion: string;
}
export type ArrayRadiologyInsightsPatientResult = Array<RadiologyInsightsPatientResult>;
/**
 * The results of the model's work for a single patient.
 */
export interface RadiologyInsightsPatientResult {
  /**
   * The identifier given for the patient in the request.
   */
  patientId: string;
  /**
   * The model's inferences for the given patient.
   */
  inferences: (RadiologyInsightsInferenceUnion)[];
}
export type ArrayRadiologyInsightsInferenceUnion = Array<RadiologyInsightsInferenceUnion>;
/**
 * An inference made by the Radiology Insights model regarding a patient.
 *   - AgeMismatch
 *   - SexMismatch
 *   - LateralityDiscrepancy
 *   - CompleteOrderDiscrepancy
 *   - LimitedOrderDiscrepancy
 *   - Finding
 *   - CriticalResult
 *   - FollowupRecommendation
 *   - RadiologyProcedure
 *   - FollowupCommunication
 */
export interface RadiologyInsightsInference extends Extendible {
  /**
   * Discriminator property for RadiologyInsightsInference.
   */
  kind: RadiologyInsightsInferenceType;
}/**
 * Alias for RadiologyInsightsInferenceUnion
 */
export type RadiologyInsightsInferenceUnion = AgeMismatchInference | SexMismatchInference | LateralityDiscrepancyInference | CompleteOrderDiscrepancyInference | LimitedOrderDiscrepancyInference | FindingInference | CriticalResultInference | RadiologyProcedureInference | FollowupRecommendationInference | FollowupCommunicationInference | RadiologyInsightsInferenceUnion;
/**
 * Age mismatch returns when there is a conflict between an age that mentioned in the clinical note and the age of the patient.
 * The age of the patient is calculated by the date of birth that is set in the patient information along with the time of the service that is being documented.
 * EvidenceExtension with DocumentReference evidence may be added to this inference as an extension.
 */
export interface AgeMismatchInference extends RadiologyInsightsInferenceUnion {
  /**
   * The type of the inference.
   */
  kind: "ageMismatch";
}
/**
 * Sex mismatch returns when there is a conflict between the patient references (female/male, he/she/his/her), documented clinical procedures, or documented body parts to the patient Sex that mentioned in the patient info.
 */
export interface SexMismatchInference extends RadiologyInsightsInferenceUnion {
  /**
   * The type of the inference.
   */
  kind: "sexMismatch";
  /**
   * sex indication
   */
  sexIndication: CodeableConcept;
}
/**
 * Laterality discrepancy, returns in 3 different cases:
 * OrderLateralityMismatch: there is a discrepancy between the text and the procedure/order related to the clinical document.
 * TextLateralityContradiction: there is a contradiction within the text of the clinical document.
 * TextLateralityMissing: laterality is missing/not mentioned in the clinical document.
 */
export interface LateralityDiscrepancyInference extends RadiologyInsightsInferenceUnion {
  /**
   * The type of the inference.
   */
  kind: "lateralityDiscrepancy";
  /**
   * laterality indication
   */
  lateralityIndication?: CodeableConcept;
  /**
   * mismatch type
   */
  discrepancyType: LateralityDiscrepancyType;
}
/**
 * Laterality discrepancy type
 */
export type LateralityDiscrepancyType = "orderLateralityMismatch" | "textLateralityContradiction" | "textLateralityMissing";/**
 * Laterality discrepancy type
 */
export enum KnownLateralityDiscrepancyType {
  /**
   * Mismatch between order and text
   */
  OrderLateralityMismatch = "orderLateralityMismatch",
  /**
   * Contradiction in text
   */
  TextLateralityContradiction = "textLateralityContradiction",
  /**
   * Missing laterality in text
   */
  TextLateralityMissing = "textLateralityMissing",
}
/**
 * Completed Order mismatch
 * A complete order requires that all the body parts listed in the order will be document (some body parts requires measurements).
 * This inference is relevant only for ultrasound procedure/order of type US ABDOMEN, US RETROPERITONEAL, US PELVIS, or US BREAST.
 * This inference returns when there is a missing body part or a missing measurement of a body part that is required by the order.
 */
export interface CompleteOrderDiscrepancyInference extends RadiologyInsightsInferenceUnion {
  /**
   * The type of the inference.
   */
  kind: "completeOrderDiscrepancy";
  /**
   * Order Type.
   */
  orderType: CodeableConcept;
  /**
   * List of missing body parts required by a complete order.
   */
  missingBodyParts?: (CodeableConcept)[];
  /**
   * List of missing body parts that require measurement by a complete order.
   */
  missingBodyPartMeasurements?: (CodeableConcept)[];
}
/**
 * Limited Order mismatch
 * A limited order requires that not all the body parts listed in the order will be document.
 * This inference is relevant only for ultrasound procedure/order of type US ABDOMEN, US RETROPERITONEAL, US PELVIS, or US BREAST.
 * This inference returns when all body parts and measurement of a body part required by the order, mentioned in the text.
 */
export interface LimitedOrderDiscrepancyInference extends RadiologyInsightsInferenceUnion {
  /**
   * The type of the inference.
   */
  kind: "limitedOrderDiscrepancy";
  /**
   * Order Type.
   */
  orderType: CodeableConcept;
  /**
   * Complete list of body parts found in the document.
   */
  presentBodyParts?: (CodeableConcept)[];
  /**
   * Complete list of body parts that require measurement by a complete order.
   */
  presentBodyPartMeasurements?: (CodeableConcept)[];
}
/**
 * Finding Inference
 * Clinical Finding can be an observation or condition that is mentioned in the clinical document.
 */
export interface FindingInference extends RadiologyInsightsInferenceUnion {
  /**
   * The type of the inference.
   */
  kind: "finding";
  /**
   * The finding data
   */
  finding: Observation;
}
/**
 * Identifies and highlights potential Critical Findings found in a clinical document.
 */
export interface CriticalResultInference extends RadiologyInsightsInferenceUnion {
  /**
   * The type of the inference.
   */
  kind: "criticalResult";
  /**
   * Critical Result
   */
  result: CriticalResult;
}
/**
 * Critical Result
 */
export interface CriticalResult {
  /**
   * description of the critical result
   */
  description: string;
  /**
   * finding inference
   */
  finding?: Observation;
}
/**
 * Procedures found in the document text or associated with the document administrative metadata.
 */
export interface RadiologyProcedureInference extends RadiologyInsightsInferenceUnion {
  /**
   * The type of the inference.
   */
  kind: "radiologyProcedure";
  /**
   * The LOINC codes for the procedure.
   */
  procedureCodes?: (CodeableConcept)[];
  /**
   * Imaging procedure.
   */
  imagingProcedures: (ImagingProcedure)[];
  /**
   * The related procedure information from the document administration information or as extracted from the document.
   */
  orderedProcedure: OrderedProcedure;
}
export type ArrayImagingProcedure = Array<ImagingProcedure>;
/**
 * Order Procedure - is this always a radiology procedure?
 */
export interface ImagingProcedure {
  /**
   * The procedure modality
   */
  modality: CodeableConcept;
  /**
   * The procedure anatomy
   */
  anatomy: CodeableConcept;
  /**
   * The procedure laterality
   */
  laterality?: CodeableConcept;
  /**
   * The procedure contrast
   */
  contrast?: RadiologyCodeWithTypes;
  /**
   * The procedure view
   */
  view?: RadiologyCodeWithTypes;
}
/**
 * Code with types
 */
export interface RadiologyCodeWithTypes {
  /**
   * Code
   */
  code: CodeableConcept;
  /**
   * Collection of types
   */
  types: (CodeableConcept)[];
}
/**
 * Recommendation Inference
 */
export interface FollowupRecommendationInference extends RadiologyInsightsInferenceUnion {
  /**
   * The type of the inference.
   */
  kind: "followupRecommendation";
  /**
   * Clinically relevant time/time-period for recommendation
   */
  effectiveDateTime?: string;
  /**
   * Clinically relevant time/time-period for recommendation
   */
  effectivePeriod?: Period;
  /**
   * Findings related to this recommendation.
   */
  findings?: (RecommendationFinding)[];
  /**
   * Indicate that the sentence with the recommendation holds a conditional statement.
   * Examples of conditional phrases: If the patient remains clinically symptomatic, Unless otherwise indicated clinically in the interim.
   */
  isConditional: boolean;
  /**
   * Indicate that the sentence with the recommendation holds an optional statement.
   * Examples of Optional phrases: 'If there is suspicion for a fracture, recommend a dedicated x-ray of the right clavicle.
   * Consider F/U exam in 6-12 months if patient has severe primary hyperparathyroidism, is being treated with high dose steroids or in any medical condition where rapid and severe loss of bone mass could occur.
   * If the patient is high risk, follow-up CT thorax is recommended in 12 months to ensure stability.
   */
  isOption: boolean;
  /**
   * Recommendation is a guideline section describing all the recommendations for the follow-up of a particular finding.
   */
  isGuideline: boolean;
  /**
   * Ambiguous, vague, or imprecise language, that can be considered a Hedging Statement within the sentence of the recommendation.
   * Examples of hedging: 'can be considered', 'may be further evaluated', 'correlate clinically', 'as clinically indicated'.
   */
  isHedging: boolean;
  /**
   * Recommended procedure.
   */
  recommendedProcedure: ProcedureRecommendationUnion;
}
export type ArrayRecommendationFinding = Array<RecommendationFinding>;
/**
 * Recommendation Finding - finding reference for recommendation
 */
export interface RecommendationFinding extends Extendible {
  /**
   * finding inference
   */
  finding?: Observation;
  /**
   * critical finding inference
   */
  criticalFinding?: CriticalResult;
  /**
   * recommendation finding status
   */
  recommendationFindingStatus: RecommendationFindingStatusType;
}
/**
 * Recommendation finding status
 */
export type RecommendationFindingStatusType = "present" | "differential" | "ruleOut" | "conditional";/**
 * Recommendation finding status
 */
export enum KnownRecommendationFindingStatusType {
  /**
   * Present finding status
   */
  Present = "present",
  /**
   * Differential finding status
   */
  Differential = "differential",
  /**
   * Rule out finding status
   */
  RuleOut = "ruleOut",
  /**
   * Conditional finding status
   */
  Conditional = "conditional",
}
/**
 * Radiology Insights abstract procedure.
 */
export interface ProcedureRecommendation {
  /**
   * Discriminator property for ProcedureRecommendation.
   */
  kind: string;
}/**
 * Alias for ProcedureRecommendationUnion
 */
export type ProcedureRecommendationUnion = GenericProcedureRecommendation | ImagingProcedureRecommendation | ProcedureRecommendationUnion;
/**
 * Generic procedure information.
 */
export interface GenericProcedureRecommendation extends ProcedureRecommendationUnion {
  /**
   * The type of the procedure.
   */
  kind: "genericProcedureRecommendation";
  /**
   * The procedure modality
   */
  code: CodeableConcept;
  /**
   * The procedure description
   */
  description?: string;
}
/**
 * Radiology procedure.
 */
export interface ImagingProcedureRecommendation extends ProcedureRecommendationUnion {
  /**
   * The type of the procedure.
   */
  kind: "imagingProcedureRecommendation";
  /**
   * The LOINC codes for the procedure.
   */
  procedureCodes?: (CodeableConcept)[];
  /**
   * Imaging procedure.
   */
  imagingProcedures: (ImagingProcedure)[];
}
/**
 * Communication Inference
 */
export interface FollowupCommunicationInference extends RadiologyInsightsInferenceUnion {
  /**
   * The type of the inference.
   */
  kind: "followupCommunication";
  /**
   * The communication date/time.
   */
  dateTime?: (Date)[];
  /**
   * The recipient of the communication.
   */
  recipient?: (MedicalProfessionalType)[];
  /**
   * Communication was acknowledged
   */
  wasAcknowledged: boolean;
}
export type ArrayDate = Array<Date>;
export type ArrayMedicalProfessionalType = Array<MedicalProfessionalType>;
/**
 * Medical Professional Type
 */
export type MedicalProfessionalType = "unknown" | "doctor" | "nurse" | "midwife" | "physicianAssistant";/**
 * Medical Professional Type
 */
export enum KnownMedicalProfessionalType {
  /**
   * Unknown medical professional type
   */
  Unknown = "unknown",
  /**
   * Doctor medical professional type
   */
  Doctor = "doctor",
  /**
   * Nurse medical professional type
   */
  Nurse = "nurse",
  /**
   * Technician medical professional type
   */
  Midwife = "midwife",
  /**
   * Technician medical professional type
   */
  PhysicianAssistant = "physicianAssistant",
}
/**
 * Repeatability Result header options
 */
export type RepeatabilityResult = "accepted" | "rejected";/**
 * Repeatability Result header options
 */
export enum KnownRepeatabilityResult {
  /**
   * If the request was accepted and the server guarantees that the server state reflects a single execution of the operation.
   */
  Accepted = "accepted",
  /**
   * If the request was rejected because the combination of Repeatability-First-Sent and Repeatability-Request-ID were invalid
   * or because the Repeatability-First-Sent value was outside the range of values held by the server.
   */
  Rejected = "rejected",
}
/**
 * Known values of {@link ApiVersion} that the service accepts.
 */
export enum KnownApiVersion {
  /**
   * 2023-09-01-preview
   */
  V20230901Preview = "2023-09-01-preview",
}
