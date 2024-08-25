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
    if (res.status === 201) navigate("/login", { state: { fromSignup: true } });
    console.log("res dignup -> ", res);
  });

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="max-w-md w-full p-10 rounded-xl bg-zinc-800">
        <form onSubmit={onSubmit}>
          <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            {...register("username", { required: true })}
            className="w-full px-4 py-2 my-2 rounded-md bg-zinc-700"
          />
          {errors.username && (
            <div className="text-red-700 font-bold pl-2">
              Username is required
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 my-2 rounded-md bg-zinc-700"
          />
          {errors.email && (
            <div className="text-red-700 font-bold pl-2">Email is required</div>
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 my-2 rounded-md bg-zinc-700"
          />
          {errors.password && <div className="text-red-700 font-bold pl-2">Password is required</div>}
          <button type="submit" className="w-full px-4 py-2 my-4 mb-6 border rounded-xl font-bold hover:bg-white hover:text-zinc-700">Create</button>
          <div className="flex justify-center gap-2 mt-2">
            <p>Do you have already an account?</p>
            <button onClick={goToLogin} className="font-bold text-sky-500 hover:text-sky-700">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
