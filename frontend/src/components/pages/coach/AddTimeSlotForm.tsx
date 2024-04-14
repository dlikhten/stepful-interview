import { FormikInput } from 'components/forms/FormikInput';
import { SubmitButtonField } from 'components/forms/SubmitButtonField';
import { useSubmit } from 'concerns/form-behaviors';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { CreateCoachTimeSlotForm, CreateCoachTimeSlotFormAttributes } from 'models/forms/CreateCoachTimeSlotForm';
import { useMemo } from 'react';

type Props = {
  onSuccess: () => void;
};

export function AddTimeSlotForm({ onSuccess }: Props) {
  const initialValues: CreateCoachTimeSlotFormAttributes = useMemo(() => {
    return {
      timeSlotStart: new Date().toISOString(),
    };
  }, []);

  const onSubmit = useSubmit<CreateCoachTimeSlotFormAttributes, CreateCoachTimeSlotForm>({
    onSuccess,
    recordClass: CreateCoachTimeSlotForm,
    transformValues: (values) => {
      return {
        // ensure the timezone is the current user's timezone when submitting. html datetime-local doesn't specify a tz offset
        timeSlotStart: dayjs.tz(values.timeSlotStart, dayjs.tz.guess()).toISOString()
      }
    }
  });

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        {/* TODO: make this input limited to future only */}
        <FormikInput name="timeSlotStart" type="datetime-local" label="Start time" />
        <SubmitButtonField>Create</SubmitButtonField>
      </Form>
    </Formik>
  );
}
