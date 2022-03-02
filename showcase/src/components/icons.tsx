import { useState, useEffect } from "react";

import { IconType } from "../types";
import { Icon } from "./icon";

export function Icons({
  icons,
  className = "",
  filter
}: {
  icons: IconType[];
  className?: string;
  filter?: string[];
}) {
  const [renderAll, setRenderAll] = useState(false);

  useEffect(() => {
    setRenderAll(true);
  }, []);

  const filteredIcons = filter
    ? icons
        .filter(icon => filter.indexOf(icon.name) !== -1)
        .sort((a, b) => filter.indexOf(a.name) - filter.indexOf(b.name))
    : icons;

  return (
    <ul
      className={`grid gap-8 text-center text-xs leading-4 ${className}`}
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(132px, 1fr))" }}
    >
      {filteredIcons.slice(0, renderAll ? undefined : 38).map(icon => (
        <Icon key={icon.name} icon={icon} />
      ))}
    </ul>
  );
}
