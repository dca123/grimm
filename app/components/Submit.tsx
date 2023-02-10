import { useIsSubmitting } from "remix-validated-form";

export const Submit = ({
  children,
}: {
  children: (isSubmitting: boolean) => React.ReactElement;
}) => {
  const isSubmitting = useIsSubmitting();
  return children(isSubmitting);
};
