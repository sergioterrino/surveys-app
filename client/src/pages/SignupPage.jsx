import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup } = useAuth();

  const goToLogin = () => {
    navigate("/login");
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log("data of Signup -> ", data);
    const res = await signup(data);
    if (res.status === 200) navigate("/login", { state: { fromSignup: true } });
    console.log("res dignup -> ", res);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Create Account</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          {...register("username", { required: true })}
        />
        {errors.username && <div>Username is required</div>}
        <input
          type="email"
          placeholder="Email"
          name="email"
          {...register("email", { required: true })}
        />
        {errors.email && <div>Email is required</div>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          {...register("password", { required: true })}
        />
        {errors.password && <div>Password is required</div>}
        <button type="submit">Signup</button>
        <div>
          <p>Do you have already an account?</p>
          <span>
            <button onClick={goToLogin}>Login</button>
          </span>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
