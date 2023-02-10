import { useField } from "remix-validated-form";

type MyInputProps = {
  name: string;
  children: (props: ReturnType<typeof useField>) => React.ReactElement;
};

export const Input = ({ name, children }: MyInputProps) => {
  const fieldProps = useField(name);
  return children(fieldProps);
};
