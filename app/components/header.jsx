"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const navigation = [
    // { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    // { name: "Services", href: "/services" },
    { name: "Ventures", href: "/ventures" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setIsScrolled(window.scrollY > 20);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <header className=" bg-gradient-to-br from-gray-50 to-purple-50shadow-sm mt-4">
      <nav
        className="mx-auto max-w-7xl border border-gray-400
             bg-black/20 backdrop-blur-3xl
             rounded-[10px] px-4 sm:px-6 lg:px-8 shadow-lg"
        aria-label="Top"
      >
        <div className="flex h-16 items-center justify-between">
          <div className="container mx-auto px-6">
            <div className="flex h-20 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center group shrink-0">
                <div className="relative h-10 w-48 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="/logo.png"
                    alt="Connected"
                    className="object-cover"
                  />
                </div>
              </Link>

              {/* Combined Nav, Icon Divider, and CTA for Desktop */}
              <div className="hidden lg:flex items-center space-x-6">
                <nav className="flex items-center">
                  {[
                    { href: "/about", label: "About" },
                    { href: "/ventures", label: "Ventures" },
                    { href: "/blog", label: "Blog" },
                    { href: "/careers", label: "Careers" },
                    { href: "/contact", label: "Contact" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="font-satoshi relative px-3 py-2 text-md font-semibold text-pink-600 hover:text-primary transition-all duration-300 group"
                    >
                      {item.label}
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                  ))}
                </nav>

                {/* Vertical Line Separator */}
                {/* <div className="w-1 h-10 bg-gradient-to-r from-primary to-secondary rounded-full" /> */}

                {/* CTA Button */}
                {/* <Button
              asChild
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button> */}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden relative w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-300"
                onClick={toggleMenu}
              >
                <div className="relative w-6 h-6">
                  <span
                    className={cn(
                      "absolute block h-0.5 w-6 bg-gray-700 transition-all duration-300",
                      isMenuOpen ? "top-3 rotate-45" : "top-1"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute block h-0.5 w-6 bg-gray-700 transition-all duration-300",
                      isMenuOpen ? "opacity-0" : "top-3"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute block h-0.5 w-6 bg-gray-700 transition-all duration-300",
                      isMenuOpen ? "top-3 -rotate-45" : "top-5"
                    )}
                  />
                </div>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {/* <div className="hidden lg:flex lg:items-end lg:space-x-6">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2"
                  >
                    <User className="h-5 w-5" />
                    <span>{user.name || user.email || user.username}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div> */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    isActive(link.href)
                      ? "bg-gray-100 text-primary"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <div className="px-3 py-2 text-base font-medium text-gray-500">
                    Signed in as {user.name || user.email || user.username}
                  </div>
                  <Link
                    href="/profile"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
