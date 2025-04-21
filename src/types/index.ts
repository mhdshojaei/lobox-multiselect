export type Option = {
  label: string;
  value: string;
};

export interface MultiSelectProps {
  options: Option[];
  onChange: (selected: Option[]) => void;
}
