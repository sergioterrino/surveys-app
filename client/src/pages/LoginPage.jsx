import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { toast } from 'react-hot-toast';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const { login } = useAuth();

  useEffect(()=> {
    if(location.state?.fromSignup) toast.success('Account create successfully')
  },[location.state]);

  const goToSignup = () => {
    navigate("/signup");
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log("data handleSubmit Login -> ", data);
    try {
      const res = await login(data);
      if (res && res.status === 200 && res.data.token) {
        navigate("/profile", { state: {fromLogin: true}});
        console.log("res despues de loginPage() -> ", res);
      } else{
        console.log("Error en loginPage() -> ", res);
      }
    } catch (error) {
      console.log("Login error -> ", error);
    }
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
        {errors.email && <div>Email is required</div>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          {...register("password", { required: true })}
        />
        {errors.password && <div>Password is required</div>}
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
