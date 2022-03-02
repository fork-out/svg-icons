import { tags } from "../data/tags";
import { AttrsType, Platform } from "../types";

export function importIcons(
  files: Record<string, { [key: string]: any }>,
  type: Platform,
  attrs: AttrsType
) {
  const icons = Object.keys(files);
  return icons.map((file: string) => {
    const name = file.replace("./optimized/", "").replace(/\.svg$/, "");
    return {
      name,
      tags: tags[name] || [],
      type,
      svg: files[file].default,
      attrs
    };
  });
}

export function copyIcon(icon: string) {
  return navigator.clipboard.writeText(icon);
}
