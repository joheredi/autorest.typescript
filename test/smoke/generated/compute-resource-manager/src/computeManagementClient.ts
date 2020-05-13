/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as operations from "./operations";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { ComputeManagementClientContext } from "./computeManagementClientContext";
import { ComputeManagementClientOptionalParams } from "./models";

class ComputeManagementClient extends ComputeManagementClientContext {
  /**
   * Initializes a new instance of the ComputeManagementClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId Subscription credentials which uniquely identify Microsoft Azure subscription.
   *                       The subscription ID forms part of the URI for every service call.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: ComputeManagementClientOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.operations = new operations.Operations(this);
    this.availabilitySets = new operations.AvailabilitySets(this);
    this.proximityPlacementGroups = new operations.ProximityPlacementGroups(
      this
    );
    this.dedicatedHostGroups = new operations.DedicatedHostGroups(this);
    this.dedicatedHosts = new operations.DedicatedHosts(this);
    this.sshPublicKeys = new operations.SshPublicKeys(this);
    this.virtualMachineExtensionImages = new operations.VirtualMachineExtensionImages(
      this
    );
    this.virtualMachineExtensions = new operations.VirtualMachineExtensions(
      this
    );
    this.virtualMachineImages = new operations.VirtualMachineImages(this);
    this.usage = new operations.Usage(this);
    this.virtualMachines = new operations.VirtualMachines(this);
    this.virtualMachineSizes = new operations.VirtualMachineSizes(this);
    this.images = new operations.Images(this);
    this.virtualMachineScaleSets = new operations.VirtualMachineScaleSets(this);
    this.virtualMachineScaleSetExtensions = new operations.VirtualMachineScaleSetExtensions(
      this
    );
    this.virtualMachineScaleSetRollingUpgrades = new operations.VirtualMachineScaleSetRollingUpgrades(
      this
    );
    this.virtualMachineScaleSetVMExtensions = new operations.VirtualMachineScaleSetVMExtensions(
      this
    );
    this.virtualMachineScaleSetVMs = new operations.VirtualMachineScaleSetVMs(
      this
    );
    this.logAnalytics = new operations.LogAnalytics(this);
    this.virtualMachineRunCommands = new operations.VirtualMachineRunCommands(
      this
    );
    this.resourceSkus = new operations.ResourceSkus(this);
    this.disks = new operations.Disks(this);
    this.snapshots = new operations.Snapshots(this);
    this.diskEncryptionSets = new operations.DiskEncryptionSets(this);
    this.galleries = new operations.Galleries(this);
    this.galleryImages = new operations.GalleryImages(this);
    this.galleryImageVersions = new operations.GalleryImageVersions(this);
    this.galleryApplications = new operations.GalleryApplications(this);
    this.galleryApplicationVersions = new operations.GalleryApplicationVersions(
      this
    );
    this.containerServices = new operations.ContainerServices(this);
  }

  operations: operations.Operations;
  availabilitySets: operations.AvailabilitySets;
  proximityPlacementGroups: operations.ProximityPlacementGroups;
  dedicatedHostGroups: operations.DedicatedHostGroups;
  dedicatedHosts: operations.DedicatedHosts;
  sshPublicKeys: operations.SshPublicKeys;
  virtualMachineExtensionImages: operations.VirtualMachineExtensionImages;
  virtualMachineExtensions: operations.VirtualMachineExtensions;
  virtualMachineImages: operations.VirtualMachineImages;
  usage: operations.Usage;
  virtualMachines: operations.VirtualMachines;
  virtualMachineSizes: operations.VirtualMachineSizes;
  images: operations.Images;
  virtualMachineScaleSets: operations.VirtualMachineScaleSets;
  virtualMachineScaleSetExtensions: operations.VirtualMachineScaleSetExtensions;
  virtualMachineScaleSetRollingUpgrades: operations.VirtualMachineScaleSetRollingUpgrades;
  virtualMachineScaleSetVMExtensions: operations.VirtualMachineScaleSetVMExtensions;
  virtualMachineScaleSetVMs: operations.VirtualMachineScaleSetVMs;
  logAnalytics: operations.LogAnalytics;
  virtualMachineRunCommands: operations.VirtualMachineRunCommands;
  resourceSkus: operations.ResourceSkus;
  disks: operations.Disks;
  snapshots: operations.Snapshots;
  diskEncryptionSets: operations.DiskEncryptionSets;
  galleries: operations.Galleries;
  galleryImages: operations.GalleryImages;
  galleryImageVersions: operations.GalleryImageVersions;
  galleryApplications: operations.GalleryApplications;
  galleryApplicationVersions: operations.GalleryApplicationVersions;
  containerServices: operations.ContainerServices;
}

// Operation Specifications

export {
  ComputeManagementClient,
  ComputeManagementClientContext,
  Models as ComputeManagementModels,
  Mappers as ComputeManagementMappers
};
export * from "./operations";
