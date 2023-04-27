import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LangDrop({ onToggleLang }) {
  return (
    <Menu as="div" className="relative w-auto">
      <div>
        <Menu.Button>
          <ChevronDownIcon
            className="relative right-7 top-1 h-5 w-5"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <label
                onClick={() => onToggleLang("en")}
                className={
                  "block px-4 py-2 font-[yeezy-tstar-700] text-sm text-black hover:font-bold cursor-pointer"
                }
              >
                ENGLISH
              </label>
            </Menu.Item>
            <Menu.Item>
              <label
                onClick={() => onToggleLang("et")}
                className={
                  "block px-4 py-2 font-[yeezy-tstar-700] text-sm text-black hover:font-bold cursor-pointer"
                }
              >
                ESTONIAN
              </label>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
