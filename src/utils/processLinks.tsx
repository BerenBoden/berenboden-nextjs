export function processLinks(inputString: string): string {
  const urlRegex = /(https:\/\/[^\s<]+)/g; // Match links without stopping for HTML tags

  return inputString.replace(urlRegex, (url) => {
    // Ignore links that contain "imgix"
    if (url.includes("imgix")) {
      return url;
    }

    // Process other links
    return `<a href="${url}" style="color: blue; text-decoration: underline;" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
}
