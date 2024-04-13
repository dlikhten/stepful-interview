import { FieldContainer } from 'components/forms/FieldContainer';
import { Input } from 'components/forms/Input';
import { Label } from 'components/forms/Label';
import { Field } from 'formik';
import { FieldAttributes } from 'formik/dist/Field';
import React from 'react';

interface FormikInputParams
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
  label?: string;
}

export function FormikInput<FormDefinition>({ name, label, ...rest }: FormikInputParams) {
  return (
    <Field name={name}>
      {({ field, meta }: FieldAttributes<any>) => (
        <FieldContainer meta={meta}>
          <Label htmlFor={name}>{label}</Label>
          <div className="mt-2">
            <Input id={name} name={name} inputTheme={meta.error ? 'error' : 'standard'} {...rest} {...field} />
          </div>
        </FieldContainer>
      )}
    </Field>
  );
}
