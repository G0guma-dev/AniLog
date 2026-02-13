export default function Footer() {
  const name = process.env.NEXT_PUBLIC_MAKER_NAME ?? "YOUR_NAME";
  const email = process.env.NEXT_PUBLIC_MAKER_EMAIL ?? "YOUR_EMAIL";
  const insta = process.env.NEXT_PUBLIC_MAKER_INSTAGRAM ?? "#";

  return (
    <footer className="mt-12 border-t px-4 py-8 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>Made by {name}</div>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
          <a className="hover:underline" href={`mailto:${email}`}>{email}</a>
          <a className="hover:underline" href={insta} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
