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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getPollById, updatePollById } from 'apiSdk/polls';
import { Error } from 'components/error';
import { pollValidationSchema } from 'validationSchema/polls';
import { PollInterface } from 'interfaces/poll';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';

function PollEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PollInterface>(
    () => (id ? `/polls/${id}` : null),
    () => getPollById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PollInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePollById(id, values);
      mutate(updated);
      resetForm();
      router.push('/polls');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PollInterface>({
    initialValues: data,
    validationSchema: pollValidationSchema,
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
            Edit Poll
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="question" mb="4" isInvalid={!!formik.errors?.question}>
              <FormLabel>Question</FormLabel>
              <Input type="text" name="question" value={formik.values?.question} onChange={formik.handleChange} />
              {formik.errors.question && <FormErrorMessage>{formik.errors?.question}</FormErrorMessage>}
            </FormControl>
            <FormControl id="options" mb="4" isInvalid={!!formik.errors?.options}>
              <FormLabel>Options</FormLabel>
              <Input type="text" name="options" value={formik.values?.options} onChange={formik.handleChange} />
              {formik.errors.options && <FormErrorMessage>{formik.errors?.options}</FormErrorMessage>}
            </FormControl>
            <FormControl id="correct_option" mb="4" isInvalid={!!formik.errors?.correct_option}>
              <FormLabel>Correct Option</FormLabel>
              <Input
                type="text"
                name="correct_option"
                value={formik.values?.correct_option}
                onChange={formik.handleChange}
              />
              {formik.errors.correct_option && <FormErrorMessage>{formik.errors?.correct_option}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<OrganizationInterface>
              formik={formik}
              name={'organization_id'}
              label={'Select Organization'}
              placeholder={'Select Organization'}
              fetcher={getOrganizations}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
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
    entity: 'poll',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PollEditPage);
