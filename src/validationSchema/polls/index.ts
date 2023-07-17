import * as yup from 'yup';

export const pollValidationSchema = yup.object().shape({
  question: yup.string().required(),
  options: yup.string().required(),
  correct_option: yup.string().required(),
  organization_id: yup.string().nullable(),
});
