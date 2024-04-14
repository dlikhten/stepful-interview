import { FormikSelect, SelectOption } from 'components/forms/FormikSelect';
import { FormRow } from 'components/forms/FormRow';
import { SubmitButton } from 'components/forms/SubmitButton';
import { SubmitButtonField } from 'components/forms/SubmitButtonField';
import { useSubmit } from 'concerns/form-behaviors';
import { Form, Formik } from 'formik';
import { first } from 'lodash-es';
import { ReserveSessionForm, ReserveSessionFormAttributes } from 'models/forms/ReserveSessionForm';
import { TimeSlotRecord } from 'models/TimeSlotRecord';
import { useMemo } from 'react';

type Props = {
  timeSlot: TimeSlotRecord;
  onSuccess: () => void;
};

export function ReserveSlotForm({ timeSlot, onSuccess }: Props) {
  const initialValues: ReserveSessionFormAttributes = useMemo(():ReserveSessionFormAttributes  => {
    return {
      coachTimeSlotId: first(timeSlot.coachTimeSlots)?.id || ''
    }
  }, [timeSlot])

  const onSubmit = useSubmit<ReserveSessionFormAttributes, ReserveSessionForm>({
    onSuccess,
    recordClass: ReserveSessionForm
  })

  const coachOptions: SelectOption[] = useMemo<SelectOption[]>(() =>
    timeSlot.coachTimeSlots.map((coachTimeSlot): SelectOption => ({
      value: coachTimeSlot.id!,
      label: coachTimeSlot.coach.name
    }))
  , [timeSlot])

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        {coachOptions.length === 1 ? (
          <div>{first(timeSlot.coachTimeSlots)?.coach?.name}</div>
        ) : (
          <FormikSelect key={1} name="coachTimeSlotId" options={coachOptions} disabled={coachOptions.length === 1} />
        )}

        <SubmitButtonField key={2}>Reserve</SubmitButtonField>
      </Form>
    </Formik>
  )
}
ReserveSlotForm.dependencyGraph = {
  timeSlot: "coach_time_slots.coach",
};
