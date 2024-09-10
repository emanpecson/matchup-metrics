import { ThemeToggle } from './button/ThemeToggle';

export default function Header() {
  return (
    <div className="w-full absolute top-0 border flex justify-center">
      <div className="w-full flex h-24 justify-between place-items-center px-10 max-w-[100rem]">
        <h1 className="text-xl font-semibold">{process.env.APP_TITLE ?? 'NBA Fantasy Optimizer'}</h1>

        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
