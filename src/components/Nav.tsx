"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/">cover generator</Link>
      <Link href="/applications">Applications</Link>
    </nav>
  );
}
