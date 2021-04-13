import { AllSchemaTypes } from "@azure-tools/codemodel";
import { MapperType } from "@azure/core-http";
export declare enum MapperTypes {
    Base64Url = "Base64Url",
    Boolean = "Boolean",
    ByteArray = "ByteArray",
    Date = "Date",
    DateTime = "DateTime",
    DateTimeRfc1123 = "DateTimeRfc1123",
    Enum = "Enum",
    Object = "Object",
    Stream = "Stream",
    String = "String",
    TimeSpan = "TimeSpan",
    UnixTime = "UnixTime",
    Uuid = "Uuid",
    Number = "Number",
    Sequence = "Sequence",
    any = "any"
}
/**
 * Gets the string representation of a value to be used during code generation
 * @param value value to get
 * @param valueType Types of the value
 * @param quotedStrings whether or not we should enclose value in quotes
 */
export declare function getStringForValue(value: any, valueType: AllSchemaTypes | MapperTypes | string, quotedStrings?: boolean, mapperType?: MapperType): string;
//# sourceMappingURL=valueHelpers.d.ts.map