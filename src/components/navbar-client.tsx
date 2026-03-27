"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import NavbarLinks, { type NavbarLink } from "@/components/navbar-links";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

type NavbarClientProps = {
  links: NavbarLink[];
  isAuthenticated: boolean;
  dashboardHref: string;
};

function Hamburger({ hamburgerOpen }: { hamburgerOpen: boolean }) {
  return (
    <div className="w-8 h-8 flex flex-col justify-around flex-nowrap">
      <div
        className={`w-8 h-1 rounded-lg bg-foreground duration-normal ${
          hamburgerOpen ? "rotate-45 translate-y-2.75" : "rotate-0"
        }`}
      ></div>
      <div
        className={`w-8 h-1 rounded-lg bg-foreground duration-normal ${
          hamburgerOpen ? "rotate-90 opacity-0" : "opacity-100"
        }`}
      ></div>
      <div
        className={`w-8 h-1 rounded-lg bg-foreground duration-normal ${
          hamburgerOpen ? "-rotate-45 -translate-y-2.75" : "rotate-0"
        }`}
      ></div>
    </div>
  );
}

export default function NavbarClient({
  links,
  isAuthenticated,
  dashboardHref,
}: NavbarClientProps) {
  const router = useRouter();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", hamburgerOpen);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [hamburgerOpen]);

  const closeMenus = () => {
    setHamburgerOpen(false);
    setSearchOpen(false);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setSearchOpen(false);
  };

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
    closeMenus();
  };

  return (
    <>
      <div className="hidden lg:flex items-center gap-8 flex-1 ml-8">
        <nav>
          <NavbarLinks links={links} />
        </nav>

        <form
          onSubmit={handleSearch}
          className="flex items-center bg-input/20 border border-input rounded-md px-3 py-2 w-64 mx-4 focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-all"
        >
          <input
            type="text"
            placeholder="Search treks, lessons, FAQs..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="bg-transparent text-foreground placeholder:text-muted-foreground outline-hidden flex-1 text-sm disabled:opacity-50"
          />
          <button
            type="submit"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <FiSearch className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <ThemeToggle />
        {!isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href={dashboardHref}>
              <Button>Dashboard</Button>
            </Link>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              Logout
            </Button>
          </div>
        )}
      </div>

      <div className="lg:hidden flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={() => setSearchOpen((current) => !current)}
          className="z-20 p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {searchOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiSearch className="w-6 h-6" />
          )}
        </button>
        <button
          className="z-20 p-2"
          onClick={() => setHamburgerOpen((current) => !current)}
        >
          <Hamburger hamburgerOpen={hamburgerOpen} />
        </button>
      </div>

      {searchOpen && (
        <div className="lg:hidden border-t border-border p-4 bg-background">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-input/20 border border-input rounded-md px-3 py-2 w-full focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-all"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              autoFocus
              className="bg-transparent text-foreground placeholder:text-muted-foreground outline-hidden flex-1 text-sm"
            />
            <button
              type="submit"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FiSearch className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <nav
        className={`lg:hidden fixed h-[calc(100vh-64px)] w-full top-16 left-0 bg-background/95 backdrop-blur-md border-t border-border transition-all duration-normal overflow-y-auto ${
          hamburgerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="p-6 flex flex-col gap-6">
          <NavbarLinks links={links} mobile onNavigate={closeMenus} />

          <div className="w-full h-px bg-border"></div>

          {!isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={closeMenus} className="w-full">
                <Button variant="outline" className="w-full" size="lg">
                  Login
                </Button>
              </Link>
              <Link href="/signup" onClick={closeMenus} className="w-full">
                <Button className="w-full" size="lg">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href={dashboardHref}
                onClick={closeMenus}
                className="w-full"
              >
                <Button className="w-full" size="lg">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="destructive"
                className="w-full"
                size="lg"
                onClick={handleSignOut}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
