"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    //localStorage.clear();
    router.push("/form");
  };

  return (
    // <button className="btn btn-logout" onClick={handleLogout}>
    //   <svg
    //     width="13"
    //     height="13"
    //     viewBox="0 0 24 24"
    //     fill="none"
    //     stroke="currentColor"
    //     strokeWidth="2"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   >
    //     <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    //     <polyline points="16 17 21 12 16 7" />
    //     <line x1="21" y1="12" x2="9" y2="12" />
    //   </svg>
    //   Logout
    // </button>
    <button href='/form' className="btn btn-create"  onClick={handleLogout}>
    <svg
      width="13" height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
    Create
  </button>
  );
}