import {
  createNamedContext,
  useContext,
  type ComponentContext
} from "@alloy-js/core";
import { Children } from "@alloy-js/core";
import { SdkContext } from "../../../utils/interfaces.js";
import { ModularEmitterOptions } from "../../interfaces.js";
import { SdkTypeContext } from "../../../framework/hooks/sdkTypes.js";

// ── SdkContext ──────────────────────────────────────────────────────────

export interface SdkContextValue {
  sdkContext: SdkContext;
  sdkTypes?: SdkTypeContext;
}

export const SdkContextAlloy: ComponentContext<SdkContextValue> =
  createNamedContext<SdkContextValue>("SdkContext");

/**
 * Hook to access the TCGC SdkContext from within an Alloy component tree.
 */
export function useSdkContext(): SdkContext {
  const ctx = useContext(SdkContextAlloy);
  if (!ctx) {
    throw new Error(
      "SdkContext is not set. Wrap your component tree in <SdkContextProvider>."
    );
  }
  return ctx.sdkContext;
}

/**
 * Hook to access the SdkTypeContext (flatten properties, type maps) from within an Alloy component tree.
 */
export function useSdkTypes(): SdkTypeContext {
  const ctx = useContext(SdkContextAlloy);
  if (!ctx?.sdkTypes) {
    throw new Error(
      "SdkTypeContext is not set. Wrap your component tree in <SdkContextProvider> with sdkTypes."
    );
  }
  return ctx.sdkTypes;
}

// ── EmitterOptions ─────────────────────────────────────────────────────

export const EmitterOptionsContext: ComponentContext<ModularEmitterOptions> =
  createNamedContext<ModularEmitterOptions>("EmitterOptionsContext");

/**
 * Hook to access the ModularEmitterOptions from within an Alloy component tree.
 */
export function useEmitterOptions(): ModularEmitterOptions {
  const ctx = useContext(EmitterOptionsContext);
  if (!ctx) {
    throw new Error(
      "EmitterOptionsContext is not set. Wrap your component tree in <EmitterOptionsProvider>."
    );
  }
  return ctx;
}

// ── Provider component ─────────────────────────────────────────────────

export interface SdkContextProviderProps {
  sdkContext: SdkContext;
  emitterOptions: ModularEmitterOptions;
  sdkTypes?: SdkTypeContext;
  children?: Children;
}

/**
 * Provides TCGC SdkContext, SdkTypeContext, and ModularEmitterOptions
 * to the Alloy component tree. Wrap your entire output in this provider.
 */
export function SdkContextProvider(props: SdkContextProviderProps) {
  return (
    <SdkContextAlloy.Provider
      value={{ sdkContext: props.sdkContext, sdkTypes: props.sdkTypes }}
    >
      <EmitterOptionsContext.Provider value={props.emitterOptions}>
        {props.children}
      </EmitterOptionsContext.Provider>
    </SdkContextAlloy.Provider>
  );
}
