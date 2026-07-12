export function decodeHtmlEntities(value: string): string {
  let decoded = value;

  for (let pass = 0; pass < 3; pass += 1) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = decoded;
    const next = textarea.value;
    if (next === decoded) break;
    decoded = next;
  }

  return decoded;
}

export function removeRepeatedText(value: string): string {
  const normalized = value.trim().replace(/\s+/g, " ");
  const words = normalized.split(" ");

  if (words.length % 2 === 0) {
    const middle = words.length / 2;
    const firstHalf = words.slice(0, middle).join(" ");
    const secondHalf = words.slice(middle).join(" ");
    if (firstHalf.localeCompare(secondHalf, undefined, { sensitivity: "base" }) === 0) {
      return firstHalf;
    }
  }

  return normalized;
}

export function normalizePersonName(value: string): string {
  const decoded = removeRepeatedText(decodeHtmlEntities(value));
  const commaIndex = decoded.indexOf(",");

  if (commaIndex < 0) {
    return decoded;
  }

  const surname = decoded.slice(0, commaIndex).trim();
  let givenNames = decoded.slice(commaIndex + 1).trim();

  if (!surname || !givenNames) {
    return decoded.replace(/\s*,\s*/g, " ").trim();
  }

  const repeatedSurname = new RegExp(`(?:^|\\s)${surname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
  if (repeatedSurname.test(givenNames)) {
    givenNames = givenNames.replace(repeatedSurname, "").trim();
  }

  return removeRepeatedText(`${givenNames} ${surname}`);
}
