import Link from "next/link";

export default function Footer() {
  const pageName = "< Cooking Devs />";

  return (
    <div className="bg-red-700 p-10 text-white h-screen mb-0 ">
      <div className="text-lg  flex space-x-10 items-center justify-between mb-auto">
        <Link target="_blank" href="https://www.privacypolicies.com/live/f3493839-9aed-4582-8b43-74340eb8295f">
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
        <p className="text-sm justify-center mb-0 flex pt-7">
          Copyright © {new Date().getFullYear()} {pageName} Pty Ltd | All
          rights reserved
        </p>
    </div>
  );
}
