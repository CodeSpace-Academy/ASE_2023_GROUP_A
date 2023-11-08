import Link from "next/link";

export default function Footer() {
  const pageName = "< Cooking Devs />";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-500 bottom-0 left-0 right-0 z-10 py-6">
      <div className="text-lg flex flex-wrap space-x-0 space-y-4 md:space-y-0 md:space-x-10 items-center justify-center mb-4 md:mb-0">
        <Link
          target="_blank"
          href="https://www.privacypolicies.com/live/f3493839-9aed-4582-8b43-74340eb8295f"
        >
          Privacy Policy
        </Link>

        <Link target="_blank" href="https://www.mars.com/cookies-english">
          Cookie Policy
        </Link>

        <Link target="_blank" href="https://www.mars.com/legal">
          Terms of Use
        </Link>

        <Link target="_blank" href="https://www.mars.com/accessibility">
          Accessibility
        </Link>

        <Link href="#cookie-settings">Cookie Settings</Link>
      </div>
      <p className="text-sm text-center mb-0 pt-2">
        Copyright © {currentYear} {pageName} Pty Ltd | All rights reserved
      </p>
    </footer>
  );
}
