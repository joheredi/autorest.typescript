// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  ApplicationDataListResponse,
  ErrorResponse,
  ApplicationData,
  CascadeDeleteJob,
  AttachmentListResponse,
  Attachment,
  BoundaryListResponse,
  Boundary,
  BoundaryOverlapResponse,
  CropListResponse,
  Crop,
  CropVarietyListResponse,
  CropVariety,
  FarmerListResponse,
  Farmer,
  FarmOperationDataIngestionJob,
  FarmListResponse,
  Farm,
  FieldListResponse,
  Field,
  HarvestDataListResponse,
  HarvestData,
  ImageProcessingRasterizeJob,
  OAuthProviderListResponse,
  OAuthProvider,
  OAuthProviderCascadeDeleteJob,
  OAuthTokenListResponse,
  PlantingDataListResponse,
  PlantingData,
  SceneListResponse,
  SatelliteDataIngestionJob,
  SeasonalFieldListResponse,
  SeasonalField,
  SeasonListResponse,
  Season,
  TillageDataListResponse,
  TillageData,
  WeatherDataListResponse,
  WeatherDataIngestionJob,
  WeatherDataDeleteJob
} from "./models";

/**
 * Get a paginated list of application data resources for a given farmer and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface ApplicationDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataListResponse;
}

/**
 * Get a paginated list of application data resources for a given farmer and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface ApplicationDataListByFarmerIddefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of application data resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface ApplicationDataList200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataListResponse;
}

/**
 * Get a paginated list of application data resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface ApplicationDataListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a specified application data resource for a given farmer.
 *
 *
 */
export interface ApplicationDataGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationData;
}

/**
 * Get a specified application data resource for a given farmer.
 *
 *
 */
export interface ApplicationDataGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create or update an application data resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface ApplicationDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ApplicationData;
}

/**
 * Create or update an application data resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface ApplicationDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ApplicationData;
}

/**
 * Create or update an application data resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface ApplicationDataCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Delete a specified application data resource for a given farmer.
 *
 *
 */
export interface ApplicationDataDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/**
 * Delete a specified application data resource for a given farmer.
 *
 *
 */
export interface ApplicationDataDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of a cascade delete job for application data resource.
 *
 *
 */
export interface ApplicationDataGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/**
 * Get details of a cascade delete job for application data resource.
 *
 *
 */
export interface ApplicationDataGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create cascade delete job for application data resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface ApplicationDataCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/**
 * Create cascade delete job for application data resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface ApplicationDataCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of attachment resources for a given farmer and search criteria.
 *
 *
 */
export interface AttachmentsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: AttachmentListResponse;
}

/**
 * Get a paginated list of attachment resources for a given farmer and search criteria.
 *
 *
 */
export interface AttachmentsListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a specified attachment resource for a given farmer.
 *
 *
 */
export interface AttachmentsGet200Response extends HttpResponse {
  status: "200";
  body: Attachment;
}

/**
 * Get a specified attachment resource for a given farmer.
 *
 *
 */
export interface AttachmentsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create or update an attachment resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface AttachmentsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Attachment;
}

/**
 * Create or update an attachment resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface AttachmentsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Attachment;
}

/**
 * Create or update an attachment resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface AttachmentsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Delete a specified attachment resource for a given farmer.
 *
 *
 */
export interface AttachmentsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/**
 * Delete a specified attachment resource for a given farmer.
 *
 *
 */
export interface AttachmentsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Return attachment as a file stream for a given input filePath.
 *
 *
 */
export interface AttachmentsDownload200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Return attachment as a file stream for a given input filePath.
 *
 *
 */
export interface AttachmentsDownloaddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of boundary resources for a given farmer and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface BoundariesListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: BoundaryListResponse;
}

/**
 * Get a paginated list of boundary resources for a given farmer and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface BoundariesListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Search for boundaries of a farmer intersecting with a given geometry.
 * This API is expected to be used when users want to find boundaries that intersect with a given geometry. Otherwise, this is functionally same as 'List by Farmer Id' API for boundaries.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface BoundariesSearchByFarmerId200Response extends HttpResponse {
  status: "200";
  body: BoundaryListResponse;
}

/**
 * Search for boundaries of a farmer intersecting with a given geometry.
 * This API is expected to be used when users want to find boundaries that intersect with a given geometry. Otherwise, this is functionally same as 'List by Farmer Id' API for boundaries.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface BoundariesSearchByFarmerIddefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of boundary resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface BoundariesList200Response extends HttpResponse {
  status: "200";
  body: BoundaryListResponse;
}

/**
 * Get a paginated list of boundary resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface BoundariesListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Search for boundaries across all the farmers intersecting with a given geometry.
 * This API is expected to be used when users want to find boundaries that intersect with a given geometry. Otherwise, this is functionally same as 'List' API for boundaries.
 *
 *
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘Search by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface BoundariesSearch200Response extends HttpResponse {
  status: "200";
  body: BoundaryListResponse;
}

/**
 * Search for boundaries across all the farmers intersecting with a given geometry.
 * This API is expected to be used when users want to find boundaries that intersect with a given geometry. Otherwise, this is functionally same as 'List' API for boundaries.
 *
 *
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘Search by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface BoundariesSearchdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of cascade delete job for a specified boundary.
 *
 *
 */
export interface BoundariesGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/**
 * Get details of cascade delete job for a specified boundary.
 *
 *
 */
export interface BoundariesGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create a cascade delete job for a specified boundary.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface BoundariesCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/**
 * Create a cascade delete job for a specified boundary.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface BoundariesCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a specified boundary resource for a given farmer.
 *
 *
 */
export interface BoundariesGet200Response extends HttpResponse {
  status: "200";
  body: Boundary;
}

/**
 * Get a specified boundary resource for a given farmer.
 *
 *
 */
export interface BoundariesGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create or update a boundary resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface BoundariesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Boundary;
}

/**
 * Create or update a boundary resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface BoundariesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Boundary;
}

/**
 * Create or update a boundary resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface BoundariesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Delete a specified boundary resource for a given farmer. It can only be deleted if it has no linked attachments, satellite or weather data.
 *
 *
 */
export interface BoundariesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/**
 * Delete a specified boundary resource for a given farmer. It can only be deleted if it has no linked attachments, satellite or weather data.
 *
 *
 */
export interface BoundariesDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get overlapping (intersecting) acreage between two boundaries.
 *
 *
 */
export interface BoundariesGetOverlap200Response extends HttpResponse {
  status: "200";
  body: BoundaryOverlapResponse;
}

/**
 * Get overlapping (intersecting) acreage between two boundaries.
 *
 *
 */
export interface BoundariesGetOverlapdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of crop resources.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface CropsList200Response extends HttpResponse {
  status: "200";
  body: CropListResponse;
}

/**
 * Get a paginated list of crop resources.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface CropsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a specified crop resource.
 *
 *
 */
export interface CropsGet200Response extends HttpResponse {
  status: "200";
  body: Crop;
}

/**
 * Get a specified crop resource.
 *
 *
 */
export interface CropsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create or update a crop resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface CropsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Crop;
}

/**
 * Create or update a crop resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface CropsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Crop;
}

/**
 * Create or update a crop resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface CropsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Delete a specified crop resource.
 *
 *
 */
export interface CropsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/**
 * Delete a specified crop resource.
 *
 *
 */
export interface CropsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of crop variety resources for a given crop and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface CropVarietiesListByCropId200Response extends HttpResponse {
  status: "200";
  body: CropVarietyListResponse;
}

/**
 * Get a paginated list of crop variety resources for a given crop and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface CropVarietiesListByCropIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of crop variety resources across all the crops for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the crop Id is available, it is strongly recommended to use **‘List by Crop Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface CropVarietiesList200Response extends HttpResponse {
  status: "200";
  body: CropVarietyListResponse;
}

/**
 * Get a paginated list of crop variety resources across all the crops for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the crop Id is available, it is strongly recommended to use **‘List by Crop Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface CropVarietiesListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a specified crop variety resource for a given crop.
 *
 *
 */
export interface CropVarietiesGet200Response extends HttpResponse {
  status: "200";
  body: CropVariety;
}

/**
 * Get a specified crop variety resource for a given crop.
 *
 *
 */
export interface CropVarietiesGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create or update a crop variety resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface CropVarietiesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: CropVariety;
}

/**
 * Create or update a crop variety resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface CropVarietiesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: CropVariety;
}

/**
 * Create or update a crop variety resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface CropVarietiesCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Delete a specified crop variety resource for a given crop.
 *
 *
 */
export interface CropVarietiesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/**
 * Delete a specified crop variety resource for a given crop.
 *
 *
 */
export interface CropVarietiesDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of farmer resources for a given search criteria.
 *
 *
 */
export interface FarmersList200Response extends HttpResponse {
  status: "200";
  body: FarmerListResponse;
}

/**
 * Get a paginated list of farmer resources for a given search criteria.
 *
 *
 */
export interface FarmersListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a specified farmer resource.
 *
 *
 */
export interface FarmersGet200Response extends HttpResponse {
  status: "200";
  body: Farmer;
}

/**
 * Get a specified farmer resource.
 *
 *
 */
export interface FarmersGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create or update a farmer resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface FarmersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Farmer;
}

/**
 * Create or update a farmer resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface FarmersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Farmer;
}

/**
 * Create or update a farmer resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface FarmersCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Delete a specified farmer resource. It can only be deleted if it has no linked attachments or farms.
 *
 *
 */
export interface FarmersDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/**
 * Delete a specified farmer resource. It can only be deleted if it has no linked attachments or farms.
 *
 *
 */
export interface FarmersDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of a cascade delete job for a specified farmer.
 *
 *
 */
export interface FarmersGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/**
 * Get details of a cascade delete job for a specified farmer.
 *
 *
 */
export interface FarmersGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create a cascade delete job for a specified farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface FarmersCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/**
 * Create a cascade delete job for a specified farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface FarmersCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create a farm operation data ingestion job.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface FarmOperationsCreateDataIngestionJob202Response
  extends HttpResponse {
  status: "202";
  body: FarmOperationDataIngestionJob;
}

/**
 * Create a farm operation data ingestion job.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface FarmOperationsCreateDataIngestionJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of a farm operation data ingestion job.
 *
 *
 */
export interface FarmOperationsGetDataIngestionJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: FarmOperationDataIngestionJob;
}

/**
 * Get details of a farm operation data ingestion job.
 *
 *
 */
export interface FarmOperationsGetDataIngestionJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of farm resources for a given farmer and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface FarmsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: FarmListResponse;
}

/**
 * Get a paginated list of farm resources for a given farmer and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface FarmsListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of farm resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface FarmsList200Response extends HttpResponse {
  status: "200";
  body: FarmListResponse;
}

/**
 * Get a paginated list of farm resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface FarmsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a specified farm resource for a given farmer.
 *
 *
 */
export interface FarmsGet200Response extends HttpResponse {
  status: "200";
  body: Farm;
}

/**
 * Get a specified farm resource for a given farmer.
 *
 *
 */
export interface FarmsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create or update a farm resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface FarmsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Farm;
}

/**
 * Create or update a farm resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface FarmsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Farm;
}

/**
 * Create or update a farm resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface FarmsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Delete a specified farm resource for a given farmer. It can only be deleted if it has no linked attachments, fields or seasonal fields.
 *
 *
 */
export interface FarmsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/**
 * Delete a specified farm resource for a given farmer. It can only be deleted if it has no linked attachments, fields or seasonal fields.
 *
 *
 */
export interface FarmsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of cascade delete job for a specified farm.
 *
 *
 */
export interface FarmsGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/**
 * Get details of cascade delete job for a specified farm.
 *
 *
 */
export interface FarmsGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create a cascade delete job for a specified farm.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface FarmsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/**
 * Create a cascade delete job for a specified farm.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface FarmsCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of field resources for a given farmer and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface FieldsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: FieldListResponse;
}

/**
 * Get a paginated list of field resources for a given farmer and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface FieldsListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of field resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface FieldsList200Response extends HttpResponse {
  status: "200";
  body: FieldListResponse;
}

/**
 * Get a paginated list of field resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface FieldsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a specified field resource for a given farmer.
 *
 *
 */
export interface FieldsGet200Response extends HttpResponse {
  status: "200";
  body: Field;
}

/**
 * Get a specified field resource for a given farmer.
 *
 *
 */
export interface FieldsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create or update a field resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface FieldsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Field;
}

/**
 * Create or update a field resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface FieldsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Field;
}

/**
 * Create or update a field resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface FieldsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Delete a specified field resource for a given farmer. It can only be deleted if it has no linked attachments, boundaries or seasonal fields.
 *
 *
 */
export interface FieldsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/**
 * Delete a specified field resource for a given farmer. It can only be deleted if it has no linked attachments, boundaries or seasonal fields.
 *
 *
 */
export interface FieldsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of cascade delete job for a specified field.
 *
 *
 */
export interface FieldsGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/**
 * Get details of cascade delete job for a specified field.
 *
 *
 */
export interface FieldsGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create a cascade delete job for specified field.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface FieldsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/**
 * Create a cascade delete job for specified field.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface FieldsCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of harvest data resources for a given farmer and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface HarvestDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: HarvestDataListResponse;
}

/**
 * Get a paginated list of harvest data resources for a given farmer and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface HarvestDataListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of harvest data resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface HarvestDataList200Response extends HttpResponse {
  status: "200";
  body: HarvestDataListResponse;
}

/**
 * Get a paginated list of harvest data resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface HarvestDataListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a specified harvest data resource for a given farmer.
 *
 *
 */
export interface HarvestDataGet200Response extends HttpResponse {
  status: "200";
  body: HarvestData;
}

/**
 * Get a specified harvest data resource for a given farmer.
 *
 *
 */
export interface HarvestDataGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create or update harvest data resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface HarvestDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: HarvestData;
}

/**
 * Create or update harvest data resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface HarvestDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: HarvestData;
}

/**
 * Create or update harvest data resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface HarvestDataCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Delete a specified harvest data resource for a given farmer.
 *
 *
 */
export interface HarvestDataDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/**
 * Delete a specified harvest data resource for a given farmer.
 *
 *
 */
export interface HarvestDataDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of a cascade delete job for harvest data resource.
 *
 *
 */
export interface HarvestDataGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/**
 * Get details of a cascade delete job for harvest data resource.
 *
 *
 */
export interface HarvestDataGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create cascade delete job for harvest data resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface HarvestDataCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/**
 * Create cascade delete job for harvest data resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface HarvestDataCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create a job which converts shape files into raster images.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface ImageProcessingCreateRasterizeJob202Response
  extends HttpResponse {
  status: "202";
  body: ImageProcessingRasterizeJob;
}

/**
 * Create a job which converts shape files into raster images.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface ImageProcessingCreateRasterizeJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/**
 * Get details of rasterize job. Rasterize job converts shape files into raster images.
 *
 *
 */
export interface ImageProcessingGetRasterizeJob200Response
  extends HttpResponse {
  status: "200";
  body: ImageProcessingRasterizeJob;
}

/**
 * Get a paginated list of OAuth provider resources for a given search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface OAuthProvidersList200Response extends HttpResponse {
  status: "200";
  body: OAuthProviderListResponse;
}

/**
 * Get a paginated list of OAuth provider resources for a given search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface OAuthProvidersListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a specified OAuth provider resource.
 *
 *
 */
export interface OAuthProvidersGet200Response extends HttpResponse {
  status: "200";
  body: OAuthProvider;
}

/**
 * Get a specified OAuth provider resource.
 *
 *
 */
export interface OAuthProvidersGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create or update an OAuth provider resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface OAuthProvidersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: OAuthProvider;
}

/**
 * Create or update an OAuth provider resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface OAuthProvidersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: OAuthProvider;
}

/**
 * Create or update an OAuth provider resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface OAuthProvidersCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Delete a specified OAuth provider resource.
 *
 *
 */
export interface OAuthProvidersDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/**
 * Delete a specified OAuth provider resource.
 *
 *
 */
export interface OAuthProvidersDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of cascade delete job for an OAuth provider resource.
 *
 *
 */
export interface OAuthProvidersGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: OAuthProviderCascadeDeleteJob;
}

/**
 * Get details of cascade delete job for an OAuth provider resource.
 *
 *
 */
export interface OAuthProvidersGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create cascade delete job for an OAuth provider resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface OAuthProvidersCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: OAuthProviderCascadeDeleteJob;
}

/**
 * Create cascade delete job for an OAuth provider resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface OAuthProvidersCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a list of OAuthToken documents for a given search criteria.
 *
 *
 */
export interface OAuthTokensList200Response extends HttpResponse {
  status: "200";
  body: OAuthTokenListResponse;
}

/**
 * Get a list of OAuthToken documents for a given search criteria.
 *
 *
 */
export interface OAuthTokensListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get connection link needed in the OAuth flow.
 *
 *
 */
export interface OAuthTokensGetOAuthConnectionLink200Response
  extends HttpResponse {
  status: "200";
  body: string;
}

/**
 * Get connection link needed in the OAuth flow.
 *
 *
 */
export interface OAuthTokensGetOAuthConnectionLinkdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of OAuth token remove job.
 *
 *
 */
export interface OAuthTokensGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/**
 * Get details of OAuth token remove job.
 *
 *
 */
export interface OAuthTokensGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create job to remove OAuth token.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface OAuthTokensCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/**
 * Create job to remove OAuth token.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface OAuthTokensCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of planting data resources for a given farm and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface PlantingDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: PlantingDataListResponse;
}

/**
 * Get a paginated list of planting data resources for a given farm and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface PlantingDataListByFarmerIddefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of planting data resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface PlantingDataList200Response extends HttpResponse {
  status: "200";
  body: PlantingDataListResponse;
}

/**
 * Get a paginated list of planting data resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface PlantingDataListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a specified planting data resource for a given farmer.
 *
 *
 */
export interface PlantingDataGet200Response extends HttpResponse {
  status: "200";
  body: PlantingData;
}

/**
 * Get a specified planting data resource for a given farmer.
 *
 *
 */
export interface PlantingDataGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create or update a planting data resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface PlantingDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: PlantingData;
}

/**
 * Create or update a planting data resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface PlantingDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: PlantingData;
}

/**
 * Create or update a planting data resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface PlantingDataCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Delete a specified planting data resource under a particular farmer.
 *
 *
 */
export interface PlantingDataDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/**
 * Delete a specified planting data resource under a particular farmer.
 *
 *
 */
export interface PlantingDataDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of a cascade delete job for planting data resource.
 *
 *
 */
export interface PlantingDataGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/**
 * Get details of a cascade delete job for planting data resource.
 *
 *
 */
export interface PlantingDataGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create cascade delete job for planting data resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface PlantingDataCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/**
 * Create cascade delete job for planting data resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface PlantingDataCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of scene resources for a given search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 * 2. This API will retrieve scenes present in the FarmBeats datastore and does not ingest new data. Example: a user has ingested satellite data from 1st of Jan 2019 to 30th of June 2019. However, using the current API, the user has asked for data from 1st of Jan 2019 to 31st of December 2019. In such a case, only data for the first 6 months is returned to the user.
 *
 *
 */
export interface ScenesList200Response extends HttpResponse {
  status: "200";
  body: SceneListResponse;
}

/**
 * Get a paginated list of scene resources for a given search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 * 2. This API will retrieve scenes present in the FarmBeats datastore and does not ingest new data. Example: a user has ingested satellite data from 1st of Jan 2019 to 30th of June 2019. However, using the current API, the user has asked for data from 1st of Jan 2019 to 31st of December 2019. In such a case, only data for the first 6 months is returned to the user.
 *
 *
 */
export interface ScenesListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create a satellite data ingestion job.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface ScenesCreateSatelliteDataIngestionJob202Response
  extends HttpResponse {
  status: "202";
  body: SatelliteDataIngestionJob;
}

/**
 * Create a satellite data ingestion job.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface ScenesCreateSatelliteDataIngestionJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of a satellite data ingestion job.
 *
 *
 */
export interface ScenesGetSatelliteDataIngestionJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: SatelliteDataIngestionJob;
}

/**
 * Get details of a satellite data ingestion job.
 *
 *
 */
export interface ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Return scenes as a file stream for a given input filePath.
 *
 *
 */
export interface ScenesDownload200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Return scenes as a file stream for a given input filePath.
 *
 *
 */
export interface ScenesDownloaddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of seasonal field resources for a given farmer and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface SeasonalFieldsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldListResponse;
}

/**
 * Get a paginated list of seasonal field resources for a given farmer and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface SeasonalFieldsListByFarmerIddefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of seasonal field resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface SeasonalFieldsList200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldListResponse;
}

/**
 * Get a paginated list of seasonal field resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface SeasonalFieldsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a specified seasonal field resource for a given farmer.
 *
 *
 */
export interface SeasonalFieldsGet200Response extends HttpResponse {
  status: "200";
  body: SeasonalField;
}

/**
 * Get a specified seasonal field resource for a given farmer.
 *
 *
 */
export interface SeasonalFieldsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create or update a seasonal field resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface SeasonalFieldsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SeasonalField;
}

/**
 * Create or update a seasonal field resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface SeasonalFieldsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SeasonalField;
}

/**
 * Create or update a seasonal field resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface SeasonalFieldsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Delete a specified seasonal field resource for a given farmer. It can only be deleted if it has no linked attachments or boundaries.
 *
 *
 */
export interface SeasonalFieldsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/**
 * Delete a specified seasonal field resource for a given farmer. It can only be deleted if it has no linked attachments or boundaries.
 *
 *
 */
export interface SeasonalFieldsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of cascade delete job for a specified seasonal field.
 *
 *
 */
export interface SeasonalFieldsGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/**
 * Get details of cascade delete job for a specified seasonal field.
 *
 *
 */
export interface SeasonalFieldsGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create a cascade delete job for a specified seasonal field.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface SeasonalFieldsCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/**
 * Create a cascade delete job for a specified seasonal field.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface SeasonalFieldsCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of season resources.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface SeasonsList200Response extends HttpResponse {
  status: "200";
  body: SeasonListResponse;
}

/**
 * Get a paginated list of season resources.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface SeasonsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a specified season resource.
 *
 *
 */
export interface SeasonsGet200Response extends HttpResponse {
  status: "200";
  body: Season;
}

/**
 * Get a specified season resource.
 *
 *
 */
export interface SeasonsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create or update a season resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface SeasonsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Season;
}

/**
 * Create or update a season resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface SeasonsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Season;
}

/**
 * Create or update a season resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface SeasonsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Delete a specified season resource.
 *
 *
 */
export interface SeasonsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/**
 * Delete a specified season resource.
 *
 *
 */
export interface SeasonsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of tillage data resources for a given farmer and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface TillageDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: TillageDataListResponse;
}

/**
 * Get a paginated list of tillage data resources for a given farmer and search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface TillageDataListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of tillage data resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface TillageDataList200Response extends HttpResponse {
  status: "200";
  body: TillageDataListResponse;
}

/**
 * Get a paginated list of tillage data resources across all the farmers for a given search criteria.
 *
 * 
###### Note:
 * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
 * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 *
 *
 */
export interface TillageDataListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a specified tillage data resource for a given farmer.
 *
 *
 */
export interface TillageDataGet200Response extends HttpResponse {
  status: "200";
  body: TillageData;
}

/**
 * Get a specified tillage data resource for a given farmer.
 *
 *
 */
export interface TillageDataGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create or update a tillage data resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface TillageDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: TillageData;
}

/**
 * Create or update a tillage data resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface TillageDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: TillageData;
}

/**
 * Create or update a tillage data resource for a given farmer.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
 * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface TillageDataCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Delete a specified tillage data resource for a given farmer.
 *
 *
 */
export interface TillageDataDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/**
 * Delete a specified tillage data resource for a given farmer.
 *
 *
 */
export interface TillageDataDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of a cascade delete job for tillage data resource.
 *
 *
 */
export interface TillageDataGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/**
 * Get details of a cascade delete job for tillage data resource.
 *
 *
 */
export interface TillageDataGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create cascade delete job for tillage data resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface TillageDataCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/**
 * Create cascade delete job for tillage data resource.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 *
 *
 */
export interface TillageDataCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get a paginated list of weather data resources for a given search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 * 2. This API will retrieve weather data present in the FarmBeats datastore and does not ingest new data. Example: a user has ingested historical weather data from 1st of Jan 2019 to 30th of June 2019. However, using the current API, the user has asked for historical data from 1st of Jan 2019 to 31st of December 2019. In such a case, only data for the first 6 months is returned to the user.
 *
 *
 */
export interface WeatherList200Response extends HttpResponse {
  status: "200";
  body: WeatherDataListResponse;
}

/**
 * Get a paginated list of weather data resources for a given search criteria.
 *
 * 
###### Note: 
 * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
 * 2. This API will retrieve weather data present in the FarmBeats datastore and does not ingest new data. Example: a user has ingested historical weather data from 1st of Jan 2019 to 30th of June 2019. However, using the current API, the user has asked for historical data from 1st of Jan 2019 to 31st of December 2019. In such a case, only data for the first 6 months is returned to the user.
 *
 *
 */
export interface WeatherListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of a weather data ingestion job.
 *
 *
 */
export interface WeatherGetDataIngestionJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: WeatherDataIngestionJob;
}

/**
 * Get details of a weather data ingestion job.
 *
 *
 */
export interface WeatherGetDataIngestionJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create a weather data ingestion job.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface WeatherCreateDataIngestionJob202Response extends HttpResponse {
  status: "202";
  body: WeatherDataIngestionJob;
}

/**
 * Create a weather data ingestion job.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface WeatherCreateDataIngestionJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Get details of a weather data delete job.
 *
 *
 */
export interface WeatherGetDataDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: WeatherDataDeleteJob;
}

/**
 * Get details of a weather data delete job.
 *
 *
 */
export interface WeatherGetDataDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/**
 * Create a weather data delete job.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface WeatherCreateDataDeleteJob202Response extends HttpResponse {
  status: "202";
  body: WeatherDataDeleteJob;
}

/**
 * Create a weather data delete job.
 *
 * 
###### Note:
 * 
1. The **‘contentType’** in the request header should be **'application/json'**.
 * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
 * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
 *
 *
 */
export interface WeatherCreateDataDeleteJobdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}
