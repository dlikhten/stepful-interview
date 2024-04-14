import { FormikInput } from 'components/forms/FormikInput';
import { FormikSelect, SelectOption } from 'components/forms/FormikSelect';
import { SubmitButtonField } from 'components/forms/SubmitButtonField';
import { useSubmit } from 'concerns/form-behaviors';
import { Form, Formik } from 'formik';
import { PostSessionNotesFormAttributes, PostSessionNotesFormRecord } from 'models/forms/PostSessionNotesFormRecord';
import { SessionRecord } from 'models/SessionRecord';
import { useMemo } from 'react';

type Props = {
  session: SessionRecord;
  onSuccess: () => void;
};

const SATISFACTION_OPTIONS: SelectOption[] = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
];

const INITIAL_VALUES: PostSessionNotesFormAttributes = {
  sessionId: '',
  satisfactionRating: '',
  notes: '',
};

export function AnnotateSessionForm({ session, onSuccess }: Props) {
  const initialValues = useMemo((): PostSessionNotesFormAttributes => {
    return {
      sessionId: session.id!,
      satisfactionRating: `${session.satisfactionRating}`,
      notes: session.notes || '',
    };
  }, [session]);

  const onSubmit = useSubmit<PostSessionNotesFormAttributes, PostSessionNotesFormRecord>({
    onSuccess,
    recordClass: PostSessionNotesFormRecord,
  });

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <FormikSelect name="satisfactionRating" options={SATISFACTION_OPTIONS} label="Satisfaction" />
        <FormikInput name="notes" label="Notes" />
        <SubmitButtonField>Create</SubmitButtonField>
      </Form>
    </Formik>
  );
}
