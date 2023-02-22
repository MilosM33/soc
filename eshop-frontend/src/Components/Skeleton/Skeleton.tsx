export default function Skeleton({
  className,
  children,
}: {
  className?: string;
  children?: any;
}) {
  return (
    <div className={"skeleton rounded text-transparent " + className}>
      <div>dasda</div>
    </div>
  );
}
