export interface IElementProps {
  className?: string;
}

export interface IButtonProps extends IElementProps {
  text?: string;
  url?: string;
  onClick?: () => void;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
