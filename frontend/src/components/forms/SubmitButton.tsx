import { Button, ButtonAttributes } from 'components/forms/Button';
import { useFormikContext } from 'formik';

export function SubmitButton({ children, disabled, ...rest }: ButtonAttributes) {
  const { isSubmitting, isValidating } = useFormikContext();

  return (
    <Button type="submit" disabled={disabled || isSubmitting || isValidating} {...rest}>
      {children}
    </Button>
  );
}
