import Link from "next/link";

export default function Footer() {
  const pageName = "< Cooking Devs />";

  return (
    <>
      <div className="bg-red-700 p-10 text-white text-lg  flex space-x-10 items-center justify-between">
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
      <div className="bg-red-700 p-7 text-white text-lg flex space-x-10 justify-center">
        <p className="text-sm justify-center pl-10 pt-1 pr-10">
          Copyright © {new Date().getFullYear()} {pageName} Pty. Ltd. | All
          rights reserved
        </p>
      </div>
    </>
  );
}
