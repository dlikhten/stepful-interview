import { FormikHelpers } from 'formik';
import { identity, mergeWith } from 'lodash-es';
import { ApplicationRecord } from 'models/ApplicationRecord';
import { useCallback, useMemo } from 'react';
import { SpraypaintBase } from 'spraypaint';
import { ValidationErrors } from 'spraypaint/lib-esm/validation-errors';
import { KeyedMutator } from 'swr';

type Constructor<T> = new (...args: any[]) => T;

type useSubmitProps<
  FormAttributes extends Record<string, any>,
  RecordClass extends ApplicationRecord & RecordAttributes,
  RecordAttributes extends Record<string, any> = FormAttributes
> = {
  onSuccess?: (form: RecordClass) => void | Promise<void>;
  mutate?: KeyedMutator<any>;
  form?: RecordClass | null | undefined;
  recordClass?: Constructor<RecordClass>;
  transformValues?: (values: FormAttributes) => RecordAttributes;
};

/**
 * Build the submission for a standard formik form
 *
 * Key thing to note
 *
 * For simple forms that just mirror a record, the `FormAttributes` are usually the `RecordAttributes`. This is also
 * the use case for `useLoadFormInitialValues` directly loading the needed form and spitting out the initial values.
 *
 * It is possible for the two to not be one and the same for complex use cases. In this case you must provide a
 * `transformValues` function to transform `FormAttributes` into `RecordAttributes`.
 */
export function useSubmit<
  FormAttributes extends Record<string, any>,
  RecordClass extends ApplicationRecord & RecordAttributes,
  RecordAttributes extends Record<string, any> = FormAttributes
>({
  onSuccess,
  mutate,
  form,
  recordClass,
  transformValues = identity,
}: useSubmitProps<FormAttributes, RecordClass, RecordAttributes>) {
  return useCallback(
    async (values: FormAttributes, { setSubmitting, setErrors }: FormikHelpers<FormAttributes>) => {
      if (!form && !recordClass) {
        throw new Error('form cannot be unloaded and not permit creation');
      }
      setSubmitting(true);
      const toSave = form || new recordClass!();
      toSave.attributes = transformValues(values);
      try {
        const success = await toSave.save();
        if (success) {
          if (mutate) {
            await mutate(undefined, { revalidate: false });
          }
          if (onSuccess) {
            await onSuccess(toSave);
          }
        } else {
          const transformedErrors = jsonApiErrorToFormikError(toSave.errors);
          setErrors(transformedErrors);
        }
      } catch (e) {}
      setSubmitting(false);
    },
    [form, mutate, onSuccess, recordClass, transformValues]
  );
}

export function jsonApiErrorToFormikError<T extends SpraypaintBase>(errors: ValidationErrors<T>) {
  const result: any = {};
  for (const errorsKey in errors) {
    result[errorsKey] = errors[errorsKey]!.fullMessage;
  }
  return result;
}

export function mergeFormWithInitialValues<X, Y>(initialValues: X, formValues: Y): X & Y {
  return mergeWith(initialValues, formValues, (objValue, formValue) => {
    return formValue != null ? formValue : objValue;
  });
}

type useLoadFormInitialValuesProps<T> = {
  blankInitialValues: T;
  fetcher: (id?: string) => { data: any; isLoading: boolean; mutate: KeyedMutator<any> };
  id?: string;
};

export function useLoadFormInitialValues<T>({ blankInitialValues, fetcher, id }: useLoadFormInitialValuesProps<T>) {
  const { data: record, isLoading, mutate } = fetcher(id);
  const form = record?.data;

  const initialValues: T = useMemo(() => {
    if (id) {
      return form ? mergeFormWithInitialValues(blankInitialValues, form.attributes as T) : blankInitialValues;
    } else {
      return blankInitialValues;
    }
  }, [blankInitialValues, form, id]);

  return { form, isLoading, mutate, initialValues };
}
