export function processImages(inputString: string): string {
  const imageRegex = /(<img\s+[^>]*src="[^"]+"[^>]*>)/g; // Match individual <img> tags
  const parts = inputString.split(imageRegex); // Split input by <img> tags
  let result = "";
  let batch: any = [];

  parts.forEach((part) => {
    if (imageRegex.test(part)) {
      // If the part matches an <img>, add it to the batch
      batch.push(
        part.replace(
          /<img\s+/,
          `<img style="max-width: 70%; height: auto; display: block;" `
        )
      );
    } else {
      // If it's not an <img>, process the batch and append the part
      if (batch.length <= 1) {
        result += `
          <div style="display: flex; justify-content: space-between; gap: 10px; margin-bottom: 10px;">
            ${batch.join("")}
          </div>
        `;
      } else {
        result += batch.join(""); // Add single or leftover <img> tags without wrapping
      }
      batch = []; // Clear the batch
      result += part; // Add the non-<img> content
    }
  });

  // If any leftover images remain, add them without wrapping
  if (batch.length > 0) {
    result += batch.join("");
  }

  return result;
}
