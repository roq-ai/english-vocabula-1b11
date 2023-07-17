import * as yup from 'yup';

export const guestUserValidationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  poll_id: yup.string().nullable(),
});
