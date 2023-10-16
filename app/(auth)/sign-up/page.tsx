"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerUser } from "@/config/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  username: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

function SignUp() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Данные из формы:", data);
    registerUser(data.username, data.password);
    router.push("/sign-in");
  };

  return (
    <div>
      <div className="text-white text-lg mb-5 font-semibold text-center">
        Sign Up
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        <div>
          <Label className="text-start text-slate-400">Name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input type="text" {...field} />}
          />
          <span className="text-red-500">
            {errors.name && errors.name.message}
          </span>
        </div>
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
          <Label className="text-start text-slate-400">Email</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input type="email" {...field} />}
          />
          <span className="text-red-500">
            {errors.email && errors.email.message}
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
        <div className="text-center">
          <Button type="submit">Sign Up</Button>
        </div>
      </form>

      <div className="mt-7 text-center text-white hover:underline underline-offset-2">
        <Link href="/sign-in">I already have an account</Link>
      </div>
    </div>
  );
}

export default SignUp;
