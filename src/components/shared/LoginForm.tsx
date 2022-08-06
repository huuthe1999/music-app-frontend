import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { Form, Formik } from "formik";
import { FC } from "react";
import FormikInput from "./FormikInput";
import * as Yup from "yup";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import { loginUserAction } from "@/store/actions/user.actions";
interface IinitialValues {
  email: string;
  password: string;
  rememberMe: boolean;
}
interface LoginFormProps {
  handleDirectRegistForm: Function;
  handleCloseModal: Function;
}
const LoginForm: FC<LoginFormProps> = ({
  handleDirectRegistForm,
  handleCloseModal,
}) => {
  const userStore = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("The email is required")
      .email("Invalid Email format"),
    password: Yup.string().required("The password is required"),
  });
  const initialValues: IinitialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const handleSubmit = async (
    values: IinitialValues,
    setErrors: Function,
    resetForm: Function
  ) => {
    dispatch(loginUserAction(values, setErrors, resetForm, handleCloseModal));
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setErrors, resetForm }) => {
        handleSubmit(values, setErrors, resetForm);
      }}
    >
      {() => (
        <Form>
          <div className="flex flex-row items-center justify-center lg:justify-start">
            <p className="text-md lg:text-lg mb-0 mr-4 text-white">Sign in</p>
          </div>
          {/* Email input */}
          <div className="mb-6 mt-10">
            <FormikInput
              placeholder="Email"
              name="email"
              className="form-control block w-full px-4 py-2 text-xs lg:text-sm font-normal text-primary bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:ring-high-light focus:ring-1 focus:outline-none"
            />
          </div>
          {/* Password input */}
          <div className="mb-6">
            <FormikInput
              type={"password"}
              placeholder="Password"
              name="password"
              className="form-control block w-full px-4 py-2 text-xs lg:text-sm font-normal text-primary bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:ring-high-light focus:ring-1 focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
              <FormikInput
                name="rememberMe"
                type={"checkbox"}
                className="relative form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:text-white checked:bg-high-light checked:border-high-light focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
              <label
                className="form-check-label inline-block text-xs lg:text-sm text-text-2"
                htmlFor="exampleCheck2"
              >
                Remember me
              </label>
            </div>
          </div>
          <div className="text-center lg:text-left">
            <button
              disabled={userStore.loading}
              type="submit"
              className="inline-block px-7 py-2 lg:py-3 bg-high-light text-white font-medium text-xs lg:text-sm leading-snug uppercase rounded shadow-md focus:outline-none"
            >
              {userStore.loading ? "Loading..." : "Login"}
            </button>
            <div className="text-xs lg:text-sm font-semibold mt-2 pt-1 mb-0 flex items-start text-text-1">
              Don't have an account ?
              <div
                onClick={() => handleDirectRegistForm()}
                className="text-high-light cursor-pointer hover:text-high-light focus:text-red-700 transition duration-200 ease-in-out text-xs lg:text-sm flex items-center"
              >
                &nbsp; <ArrowNarrowRightIcon className="w-4 h-4 mx-2" />
                Register
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default LoginForm;
