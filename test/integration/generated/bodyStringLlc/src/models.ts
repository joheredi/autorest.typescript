export interface Error {
  /** */
  status?: number;
  /** */
  message?: string;
}

export interface RefColorConstant {
  /** Referenced Color Constant Description. */
  colorConstant: "green-color";
  /** Sample string. */
  field1?: string;
}

export type Colors = "red color" | "green-color" | "blue_color";
