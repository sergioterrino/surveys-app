import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const { login } = useAuth();

  useEffect(() => {
    if (location.state?.fromSignup)
      toast.success("Account create successfully");
  }, [location.state]);

  const goToSignup = () => {
    navigate("/signup");
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log("data handleSubmit Login -> ", data);
    try {
      const res = await login(data);
      if (res && res.status === 200 && res.data.token) {
        navigate("/profile", { state: { fromLogin: true } });
        console.log("res despues de loginPage() -> ", res);
      } else {
        console.log("Error en loginPage() -> ", res);
      }
    } catch (error) {
      console.log("Login error -> ", error);
    }
  });

  return (
    <div className="flex items-center justify-center h-[calc(86vh-100px)]">
      <div className="w-full max-w-md p-10 rounded-md bg-zinc-800">
        <h1 className="text-center text-3xl font-bold mb-4">Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 my-2 bg-zinc-700 rounded-md "
          />
          {errors.email && <div className="text-red-700 font-bold pl-2">Email is required</div>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 my-2 bg-zinc-700 rounded-md "
          />
          {errors.password && <div className="text-red-700 font-bold pl-2">Password is required</div>}
          <button type="submit" className="w-full px-4 py-2 my-4 bg-zinc-800 
           hover:text-zinc-700 hover:bg-white rounded-lg border font-bold">Login</button>
          <div className="flex justify-center gap-2 mt-6">
            <p>You don't have an account? </p>
            <button onClick={goToSignup} className="font-bold text-sky-500 hover:text-sky-400">Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
