import { FormikInput } from 'components/forms/FormikInput';
import { SubmitButtonField } from 'components/forms/SubmitButtonField';
import { useSubmit } from 'concerns/form-behaviors';
import { Form, Formik } from 'formik';
import { LoginFormAttributes, LoginFormRecord } from 'models/forms/LoginFormRecord';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentEmail } from 'store/reducers/login';
import { object, string } from 'yup';

const INITIAL_VALUES: LoginFormAttributes = { email: '' };
const VALIDATION = object({
  email: string().required(),
});

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const onSuccess = useCallback(
    (form: LoginFormRecord) => {
      dispatch(setCurrentEmail(form.email));

      router.push('/student');
    },
    [dispatch, router]
  );

  const onSubmit = useSubmit<LoginFormAttributes, LoginFormRecord, LoginFormAttributes>({
    onSuccess: onSuccess,
    recordClass: LoginFormRecord,
  });

  return (
    <div className="h-screen w-full p-4 flex flex-col">
      <div className="flex-grow">
        <Formik initialValues={INITIAL_VALUES} validationSchema={VALIDATION} onSubmit={onSubmit}>
          <Form className="flex flex-col w-full items-center pt-20">
            <FormikInput name="email" label="Email" />
            <SubmitButtonField>Login</SubmitButtonField>
          </Form>
        </Formik>
      </div>
      <div className="h-32 bg-blue-100 flex w-full items-center justify-center">
        <div className="text-sm">Copyright Dmitriy Likhten 2024</div>
      </div>
    </div>
  );
}
