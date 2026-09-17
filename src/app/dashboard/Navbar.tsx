import { logout } from "./actions";
import SubmitButton from "./SubmitButton";

type NavbarProps = {
  email: string;
};

export default function Navbar({ email }: NavbarProps) {
  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold">Task Manager</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-gray-500 sm:block">{email}</span>

          <form action={logout}>
            <SubmitButton
              pendingText="Logging out..."
              className="rounded border px-3 py-2 text-sm"
            >
              Logout
            </SubmitButton>
          </form>
        </div>
      </div>
    </nav>
  );
}
