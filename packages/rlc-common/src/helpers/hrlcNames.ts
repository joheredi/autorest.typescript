export function getName(item: { name: string; clientName?: string }) {
  return item.clientName || item.name;
}

export function getSerializedName(item: { name: string; clientName?: string }) {
  return item.name;
}
