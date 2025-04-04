export interface PlayerDialogFooterProps {
  footerHeight: string;
  primaryColor: string;
  FooterElement?: () => JSX.Element;
}

export default function PlayerDialogFooter(props: PlayerDialogFooterProps) {
  return (
    <div
      style={{ backgroundColor: props.primaryColor, height: props.footerHeight }}
      className="absolute bottom-0 left-0 rounded-b-2xl w-full"
    >
      {!!props.FooterElement && (
        <div className="w-full flex justify-end place-items-center px-3 h-full">
          <props.FooterElement />
        </div>
      )}
    </div>
  );
}
