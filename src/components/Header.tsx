import { ThemeToggle } from './button/ThemeToggle';

export default function Header() {
  return (
    <div className="">
      <div className="w-full flex h-24 justify-between border place-items-center px-10 absolute top-0">
        <h1 className="text-xl font-semibold">{process.env.APP_TITLE ?? 'NBA Fantasy Optimizer'}</h1>

        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
