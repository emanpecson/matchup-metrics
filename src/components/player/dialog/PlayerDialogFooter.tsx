export interface PlayerDialogFooterProps {
  footerHeight: string;
  primaryColor: string;
}

export default function PlayerDialogFooter(props: PlayerDialogFooterProps) {
  return (
    <div
      style={{ backgroundColor: props.primaryColor, height: props.footerHeight }}
      className="absolute bottom-0 left-0 rounded-b-2xl w-full"
    ></div>
  );
}
