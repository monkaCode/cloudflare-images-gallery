import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
	NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";

import { ThemeSwitch } from "./theme-switch";
import {CloudIcon} from "@/components/globalnav/icons";

export const Navbar = ({
  title,
  icon,
  link,
}: {
  title: string;
  icon?: React.ReactNode | string; // Allow ReactNode or string (image source)
  link?: string;
}) => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href={link ?? '/'}>
            {icon ? (
              typeof icon === 'string' ? (
                <img src={icon} alt={`${title} logo`} />
              ) : (
                icon
              )
            ) : (
              <CloudIcon color={'orange'} />
            )}
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
