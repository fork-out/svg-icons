import { matchSorter } from "match-sorter";
import createStore, { SetState } from "zustand";

import { allIcons } from "../App";
import { FilterAndQuery } from "../types";

export const useStore = createStore((set: SetState<FilterAndQuery>) => ({
  query: "",
  filter: undefined,
  search: (query: string) => {
    set({
      query,
      filter: query
        ? (matchSorter(allIcons, query, { keys: ["name", "tags", "type"] }).map(
            x => x.name
          ) as string[])
        : undefined
    });
  }
}));
