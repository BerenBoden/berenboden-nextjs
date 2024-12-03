import { JSDOM } from "jsdom";
import slugify from "slugify";

function createHeadingId(contentHTML: string): string {
  const dom = new JSDOM(contentHTML);
  const document = dom.window.document;

  const h3Elements = document.querySelectorAll("h3");

  h3Elements.forEach((h3: HTMLHeadingElement) => {
    const em = h3.querySelector("em");
    if (em) {
      const text = em.textContent || "";
      const slugifiedId = slugify(text, { lower: true, strict: true });
      h3.setAttribute("id", slugifiedId);
    }
  });

  return document.body.innerHTML; // Return the modified HTML string
}

export default createHeadingId;
