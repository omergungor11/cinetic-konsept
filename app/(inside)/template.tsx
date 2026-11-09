export default function InsideTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="inside-route">{children}</div>;
}
