"use client";
import Link from "next/link";
import React from "react";
import { TfiWrite } from "react-icons/tfi";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Expenses", href: "/expenses/list" },
  ];

  return (
    <nav className="border-b mb-5 px-5">
      <Container>
        <Flex gap={"6"} align={"center"} height={"60px"}>
        <Link href="/">
          <TfiWrite />
        </Link>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              className={classnames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </ul>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
