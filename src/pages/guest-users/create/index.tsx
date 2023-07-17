import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createGuestUser } from 'apiSdk/guest-users';
import { Error } from 'components/error';
import { guestUserValidationSchema } from 'validationSchema/guest-users';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { PollInterface } from 'interfaces/poll';
import { getPolls } from 'apiSdk/polls';
import { GuestUserInterface } from 'interfaces/guest-user';

function GuestUserCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: GuestUserInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createGuestUser(values);
      resetForm();
      router.push('/guest-users');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<GuestUserInterface>({
    initialValues: {
      username: '',
      password: '',
      poll_id: (router.query.poll_id as string) ?? null,
    },
    validationSchema: guestUserValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Guest User
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="username" mb="4" isInvalid={!!formik.errors?.username}>
            <FormLabel>Username</FormLabel>
            <Input type="text" name="username" value={formik.values?.username} onChange={formik.handleChange} />
            {formik.errors.username && <FormErrorMessage>{formik.errors?.username}</FormErrorMessage>}
          </FormControl>
          <FormControl id="password" mb="4" isInvalid={!!formik.errors?.password}>
            <FormLabel>Password</FormLabel>
            <Input type="text" name="password" value={formik.values?.password} onChange={formik.handleChange} />
            {formik.errors.password && <FormErrorMessage>{formik.errors?.password}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<PollInterface>
            formik={formik}
            name={'poll_id'}
            label={'Select Poll'}
            placeholder={'Select Poll'}
            fetcher={getPolls}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.question}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'guest_user',
    operation: AccessOperationEnum.CREATE,
  }),
)(GuestUserCreatePage);
