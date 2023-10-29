interface Heading {
  name: string;
  current: boolean;
  children: Heading[];
  href: string;
  level?: number;
  parent?: Heading | null;
}

export function organizeHeadings(text: string): Heading[] {
  const lines = text.split("\n");
  let headings: Heading[] = [];
  let currentParent: any;
  let inCodeBlock = false;

  // Helper to remove extra keys from heading and its children
  const removeExtraKeys = (heading: Heading) => {
    delete heading.level;
    delete heading.parent;
    heading.children.forEach(removeExtraKeys);
  };

  // Helper to update heading list and current parent
  const updateHeadings = (hashes: number, heading: Heading) => {
    while (currentParent && hashes <= currentParent.level) {
      currentParent = currentParent.parent;
    }
    if (currentParent) {
      currentParent.children.push(heading);
    } else {
      headings.push(heading);
    }
    heading.level = hashes;
    heading.parent = currentParent;
    currentParent = heading;
  };

  // Loop through lines to identify and organize headings
  for (const line of lines) {
    if (line.trim() === "```") {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#+) (.+)$/);
    if (match) {
      const hashes = match[1].length;
      const heading: Heading = {
        name: match[2],
        current: false,
        href: "#",
        children: [],
      };

      if (!currentParent || hashes > currentParent.level) {
        updateHeadings(hashes, heading);
      } else {
        updateHeadings(hashes, heading);
      }
    }
  }

  // Clean up the final heading tree
  headings.forEach(removeExtraKeys);
  return headings;
}
