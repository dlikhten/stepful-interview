import { FieldContainer } from 'components/forms/FieldContainer';
import { Label } from 'components/forms/Label';
import { Field } from 'formik';
import { FieldAttributes } from 'formik/dist/Field';
import { map } from 'lodash-es';
import React from 'react';

export type SelectOption = {
  label: string;
  value: string;
};

interface FormikInputParams
  extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  name: string;
  label?: string;
  options: SelectOption[];
}

export function FormikSelect<FormDefinition>({ name, label, options, ...rest }: FormikInputParams) {
  return (
    <Field name={name}>
      {({ field, meta }: FieldAttributes<any>) => (
        <FieldContainer meta={meta}>
          <Label htmlFor={name}>{label}</Label>
          <div className="mt-2">
            <select id={name} {...rest} {...field}>
              {map(options, option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </FieldContainer>
      )}
    </Field>
  );
}
