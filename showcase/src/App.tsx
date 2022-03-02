import { version } from "../../package.json";
import { Header } from "./components/header";
import { IconsContainer } from "./components/icons-container";
import { Search } from "./components/search";
import { IconType } from "./types";
import { importIcons } from "./utils/icons.utils";

const modules: Record<string, { [key: string]: any }> = import.meta.globEager("./optimized/*.svg");

export const allIcons: IconType[] = importIcons(modules, "core", {
  width: 32,
  height: 32,
  viewBox: "0 0 32 32",
  fill: "currentColor"
}) as IconType[];

export const App = () => {
  return (
    <div>
      <Header version={version} />
      <main className="bg-white">
        <Search />
        <div className="px-4 sm:px-6 lg:px-16">
          <IconsContainer />
        </div>
      </main>
    </div>
  );
};
