import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from '../api/surveys'

function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors, isValid} } = useForm();

  const goToSignup = () => {
    navigate("/signup");
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log("data handleSubmit Login -> ", data);
    const res = await login(data);
    if (res.status === 200 && res.data.token) navigate('/profile')
    console.log('res despues de login() -> ', res);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          {...register("email", { required: true })}
        />
        {errors.email && (<div>Email is required</div>)}
        <input
          type="password"
          placeholder="Password"
          name="password"
          {...register("password", { required: true })}
        />
        {errors.password && (<div>Password is required</div>)}
        <button type="submit">Login</button>
        <div>
          <p>You don't have an account? </p>
          <span>
            <button onClick={goToSignup}>Signup</button>
          </span>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
