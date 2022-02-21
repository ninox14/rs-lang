export interface IElementProps {
  className?: string;
}

export interface IButtonProps extends IElementProps {
  text?: string;
  url?: string;
  tabIndex?: number;
  onClick?: () => void;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
