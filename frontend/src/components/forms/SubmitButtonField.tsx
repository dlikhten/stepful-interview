import { FieldContainer } from 'components/forms/FieldContainer';
import { ButtonAttributes } from 'components/forms/Button';
import { SubmitButton } from 'components/forms/SubmitButton';

export function SubmitButtonField({ children, ...rest }: ButtonAttributes) {
  return (
    <FieldContainer>
      <SubmitButton type="submit" {...rest}>
        {children}
      </SubmitButton>
    </FieldContainer>
  );
}
