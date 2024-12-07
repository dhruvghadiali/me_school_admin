import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import MEInput from "../../../common/input/meInput";
import MEButton from "../../../common/button/meButton";
import MELoaderIcon from "../../../common/loader/meLoaderIcon";
import { variants } from "../../../../utils/enums";
import { validationMessage } from "../../../../utils/validationMessage";
import { validateUser } from "../../../../slice/login/loginAction";

const LoginForm = () => {
  const { loader, error } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(validateUser(values));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <MEInput
          id="username"
          type={"text"}
          label={"Username"}
          message={formik.errors.username}
          value={formik.values.username}
          labelVariant={variants.DARK}
          inputVariant={variants.DARK}
          messageVariant={variants.DANGER}
          onChange={formik.handleChange}
        />
        <MEInput
          id="password"
          type={"password"}
          label={"Password"}
          message={formik.errors.password}
          value={formik.values.password}
          labelVariant={variants.DARK}
          inputVariant={variants.DARK}
          messageVariant={variants.DANGER}
          onChange={formik.handleChange}
        />
        <div className="py-2">
          <MEButton type="submit" buttonVariant={variants.SUCCESS}>
            Login {loader && <MELoaderIcon />}
          </MEButton>
        </div>
      </form>
    </>
  );
};

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, validationMessage.usernameMin)
    .max(10, validationMessage.usernameMax)
    .required(validationMessage.usernameRequired),
  password: Yup.string()
    .min(5, validationMessage.passwordMin)
    .max(10, validationMessage.passwordMax)
    .required(validationMessage.required),
});

export default LoginForm;
