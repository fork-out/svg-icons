export type Platform = "core" | "zoom";

export type AttrsType = {
  width?: number;
  height?: number;
  fill?: string;
  viewBox?: string;
};

export type IconType = {
  name: string;
  type: Platform;
  attrs: { [x: string]: AttrsType };
  svg: string;
  tags: string[];
};

export type FilterAndQuery = {
  filter?: string[];
  query?: string;
  search?: (q: string) => void;
};
