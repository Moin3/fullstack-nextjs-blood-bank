import * as Yup from 'yup'


export const LoginSchema=Yup.object().shape({
    role: Yup.string().required('Role is required'),
    email: Yup.string().email('Invalid email address').required('Please enter your Email'),
    password:Yup.string().min(6, 'Must be atleast 6 character').required('Please enter your Password'),
})


export const RegistrationSchema = Yup.object().shape({
    role: Yup.string().required('Role is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    name: Yup.string().test('conditional-validation', 'Name is required', function (value) {
      const role = this.parent.role;
      return (role === 'admin' || role === 'donar') ? !!value : true;
    }),
    organisationName: Yup.string().test('conditional-validation', 'Organisation Name is required', function (value) {
      const role = this.parent.role;
      return (role === 'organisation') ? !!value : true;
    }),
    hospitalName: Yup.string().test('conditional-validation', 'Hospital Name is required', function (value) {
      const role = this.parent.role;
      return (role === 'hospital') ? !!value : true;
    }),
    website: Yup.string(),
    address: Yup.string().required('Please enter your Address'),
    phone: Yup.string().required('Please enter your Phone'),
  });
  


