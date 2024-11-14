import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, useAuth } from "../../utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Email must be a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

function Login() {
  document.title = "Login | User System";
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, values);
      localStorage.setItem("jwtToken", response.data.token);
      // Redirect to users page or handle login success
      login();
      navigate("/users");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <section className="flex w-full h-screen">
      <div className="flex-1 hidden xl:block">
        <img
          src="/auth.jpg"
          alt="auth"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 my-8">
        <h1 className="text-blue-400 text-3xl font-bold my-4">
          Login to your account
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="space-y-8 border-2 border-blue-400 rounded-2xl p-10 w-1/2 mt-10"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="me@example.com" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between relative">
                      <Input
                        autoComplete="off"
                        type={isVisible ? "string" : "password"}
                        {...field}
                      />
                      <span
                        className="absolute right-4 cursor-pointer"
                        onClick={() => setIsVisible(!isVisible)}
                      >
                        {isVisible ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-blue-400">
              Login
            </Button>
            <div className="w-full items-center justify-center flex gap-1 flex-col">
              <p>Don't have an account?</p>
              <Link to="/signup" className="text-blue-400">
                Register here
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default Login;
