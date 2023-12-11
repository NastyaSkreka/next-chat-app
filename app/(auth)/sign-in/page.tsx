"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authenticateUser} from "@/config/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

interface FormData {
  username: string;
  password: string;
}

function SignIn() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const user = await authenticateUser(data.username, data.password);
    if (user) {
      router.push("/conversations");
    } else {
      setLoginError("Login error. User not found. Please register.");
    }
  };

  return (
    <div>
      <div className="text-white text-lg mb-5 font-semibold text-center">
        Sign In
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        <div>
          <Label className="text-start text-slate-400">UserName</Label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => <Input type="text" {...field} />}
          />
          <span className="text-red-500">
            {errors.username && errors.username.message}
          </span>
        </div>
        <div>
          <Label className="text-start text-slate-400">Password</Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input type="password" {...field} />}
          />
          <span className="text-red-500">
            {errors.password && errors.password.message}
          </span>
        </div>
        {loginError && (
          <div className="text-red-500 text-center">{loginError}</div>
        )}
        <div className="text-center">
          <Button type="submit">Sign In</Button>
        </div>
      </form>

      <div className="mt-7 text-center text-white hover:underline underline-offset-2">
        <Link href="/sign-up">I want to register</Link>
      </div>
    </div>
  );
}

export default SignIn;
