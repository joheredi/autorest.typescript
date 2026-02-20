import {
  createNamedContext,
  useContext,
  type ComponentContext
} from "@alloy-js/core";
import { Children } from "@alloy-js/core";
import { SdkContext } from "../../../utils/interfaces.js";
import { ModularEmitterOptions } from "../../interfaces.js";

// ── SdkContext ──────────────────────────────────────────────────────────

export interface SdkContextValue {
  sdkContext: SdkContext;
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
  children?: Children;
}

/**
 * Provides TCGC SdkContext and ModularEmitterOptions to the Alloy component tree.
 * Wrap your entire output in this provider.
 */
export function SdkContextProvider(props: SdkContextProviderProps) {
  return (
    <SdkContextAlloy.Provider value={{ sdkContext: props.sdkContext }}>
      <EmitterOptionsContext.Provider value={props.emitterOptions}>
        {props.children}
      </EmitterOptionsContext.Provider>
    </SdkContextAlloy.Provider>
  );
}
