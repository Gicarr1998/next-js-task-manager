import { logout } from "./actions";
import SubmitButton from "./SubmitButton";
import Link from "next/link";

type NavbarProps = {
  email: string;
};

export default function Navbar({ email }: NavbarProps) {
  return (
    <nav className="border-b border-slate-200 bg-[#fbfaf8]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-3 text-lg font-semibold tracking-tight"><span className="grid size-9 place-items-center rounded-xl bg-[#1e2933] text-sm font-bold text-white">T</span>Taskflow</Link>

        <div className="flex items-center gap-4">
          <span className="hidden rounded-full bg-[#eef4ef] px-3 py-1.5 text-sm text-[#52735e] sm:block">{email}</span>

          <form action={logout}>
            <SubmitButton
              pendingText="Logging out..."
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Logout
            </SubmitButton>
          </form>
        </div>
      </div>
    </nav>
  );
}
