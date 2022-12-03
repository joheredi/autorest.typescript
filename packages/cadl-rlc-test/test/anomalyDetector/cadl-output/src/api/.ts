import { Client } from "@azure-rest/core-client";

export function detectUnivariateEntireSeries(context: Client) {
    /** 
     * body DetectRequest
    */
}

export function detectUnivariateLastPoint(context: Client) {
    /** 
     * body DetectRequest
    */
}

export function detectUnivariateChangePoint(context: Client) {
    /** 
     * body ChangePointDetectRequest
    */
}

export function getBatchDetectionResult(context: Client, resultId: string) {
    /** 
    
    */
}

export function createAndTrainMultivariateModel(context: Client) {
    /** 
     * body ModelInfo
    */
}

export function listMultivariateModels(context: Client) {
    /** 
     * query "skip"

     * query "top"
    */
}

export function deleteMultivariateModel(context: Client, modelId: string) {
    /** 
    
    */
}

export function getMultivariateModel(context: Client, modelId: string) {
    /** 
    
    */
}

export function detectMultivariateBatchAnomaly(context: Client, modelId: string) {
    /** 
     * body DetectionRequest
    */
}

export function detectMultivariateLastAnomaly(context: Client, modelId: string) {
    /** 
     * body LastDetectionRequest
    */
}
