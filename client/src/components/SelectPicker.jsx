import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectPicker({
  name,
  options,
  placeholder,
  onValueChange,
}) {
  const renderOptions = options.map((option) => {
    return (
      <SelectItem value={option} key={option} className="capitalize">
        {option.replace(/_/g, " ")}
      </SelectItem>
    );
  });

  return (
    <Select name={name} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{renderOptions}</SelectContent>
    </Select>
  );
}
