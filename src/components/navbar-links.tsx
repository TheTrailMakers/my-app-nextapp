"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavbarLink = {
  name: string;
  href: string;
};

type NavbarLinksProps = {
  links: NavbarLink[];
  mobile?: boolean;
  onNavigate?: () => void;
};

export default function NavbarLinks({
  links,
  mobile = false,
  onNavigate,
}: NavbarLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={mobile ? "flex flex-col gap-4" : "flex items-center gap-6"}>
      {links.map(({ name, href }) => {
        const isActive = pathname === href;

        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              className={
                mobile
                  ? `block text-lg font-medium transition-colors duration-normal ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  : `text-sm font-medium transition-colors duration-normal ${
                      isActive
                        ? "text-primary border-b-2 border-primary pb-1"
                        : "text-muted-foreground hover:text-foreground"
                    }`
              }
            >
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
