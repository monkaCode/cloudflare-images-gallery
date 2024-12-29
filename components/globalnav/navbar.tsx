import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand
} from "@nextui-org/navbar";
import NextLink from "next/link";

import { ThemeSwitch } from "./theme-switch";

export const Navbar = ({
  title,
  icon,
  link,
}: {
  title: string;
  icon?: React.ReactNode | string;
  link?: string;
}) => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href={link ?? '/'}>
            {icon && (typeof icon === 'string' ? (<img src={icon} alt={`${title} logo`} />) : (icon))}
            <p className="font-bold text-inherit">{title}</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </NextUINavbar>
  );
};
