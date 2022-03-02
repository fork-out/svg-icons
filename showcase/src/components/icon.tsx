import { Transition } from "@headlessui/react";
import Alert from "@reach/alert";
import camelcase from "camelcase";
import clsx from "clsx";
import { memo, useState, useEffect, Fragment, useMemo } from "react";

import { IconType } from "../types";
import { copyIcon } from "../utils/icons.utils";
import { Toast } from "./toast";

export const Icon = memo(({ icon }: { icon: IconType }) => {
  const [state, setState] = useState<"idle" | "copied" | "active">("idle");

  const pascalCasedIconName = useMemo(() => {
    return `<Icon${camelcase(icon.name, { pascalCase: true })} />`;
  }, [icon.name]);

  const copy = () => {
    if (state === "copied") return;
    copyIcon(pascalCasedIconName).then(() => {
      setState("copied");
    });
  };

  const activate = () => {
    if (state === "idle") {
      setState("active");
    }
  };

  const deactivate = () => {
    if (state === "active") {
      setState("idle");
    }
  };

  useEffect(() => {
    if (state === "copied") {
      const handler = window.setTimeout(() => {
        setState("idle");
      }, 2000);
      return () => {
        window.clearTimeout(handler);
      };
    }
  }, [state]);

  return (
    <li
      className={clsx("relative flex flex-col-reverse", {
        group: state === "active"
      })}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={activate}
    >
      <h3 id={`${icon.name}-name`}>
        {icon.name}
        {icon.tags.includes("new") && (
          <small
            className={clsx(
              "absolute top-px right-px mt-1 mr-1 rounded-full text-xs leading-5 font-medium px-2 pointer-events-none bg-yellow-100 text-orange-700 transition-opacity",
              {
                "opacity-0 duration-100": state === "active",
                "duration-200": state !== "active"
              }
            )}
          >
            <span className="sr-only">(</span>New
            <span className="sr-only">)</span>
          </small>
        )}
      </h3>
      <div className="relative mb-3 h-24">
        <button
          type="button"
          onBlur={() => {
            window.setTimeout(() => {
              deactivate();
            }, 0);
          }}
          id={`${icon.name}-btn`}
          aria-label={icon.name}
          aria-haspopup="true"
          aria-controls={`${icon.name}-${icon.type}`}
          aria-expanded={state === "active" ? true : undefined}
          className="absolute inset-0 w-full flex items-center justify-center rounded-lg border border-gray-200 cursor-auto"
        >
          <span
            className={clsx("transform transition-transform", {
              "-translate-y-3 duration-200 ease-out": state === "copied",
              "duration-500 ease-in-out": state !== "copied"
            })}
          >
            <img {...icon.attrs} alt={icon.name} src={icon.svg} />
          </span>
        </button>
        <Transition
          as={Fragment}
          show={state === "copied"}
          enter="transition-opacity duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300 ease-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Alert className="absolute bottom-1 left-0 right-0 pointer-events-none text-center font-medium pb-4 text-blue-700">
            Copied<span className="sr-only"> {icon.name}</span>!
          </Alert>
        </Transition>

        <Transition
          as={Fragment}
          show={state === "active"}
          enter="transition-opacity duration-100 ease-in-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200 ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            id={`${icon.name}-${icon.type}`}
            role="menu"
            aria-labelledby={`${icon.name}-${icon.type}-btn`}
            tabIndex={-1}
            className={clsx("absolute inset-0 z-10 p-1", {
              "pointer-events-none": state !== "active"
            })}
          >
            <div
              id={`${icon.name}-${icon.type}-jsx`}
              tabIndex={-1}
              role="menuitem"
              className={clsx(
                "relative mt-11 cursor-pointer leading-[42px] font-medium bg-blue-200 rounded-md text-blue-700 transition-colors duration-150 outline-none bg-opacity-75"
              )}
              onClick={() => copy()}
            >
              Copy Icon
            </div>
          </div>
        </Transition>
      </div>
      <Transition
        as={Fragment}
        show={state === "copied"}
        enter="transition-opacity duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <span className="fix bottom-1 left-0 right-0 pointer-events-none">
          <Toast iconName={pascalCasedIconName} />
        </span>
      </Transition>
    </li>
  );
});
