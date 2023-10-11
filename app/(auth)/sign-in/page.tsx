"use client"
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type FormSubmitHandler = (data: FormData) => void;

function SignIn({ handleSubmitForm }: { handleSubmitForm: FormSubmitHandler }) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    handleSubmitForm(data);
  };

  return (
    <>
        <div className="text-white text-lg mb-5 font-semibold">Sign In</div>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <div>
            <label className="text-start text-slate-400">Username</label>
            <Input type="text" placeholder="Enter your username" {...field} />
          </div>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <div>
            <label className="text-start text-slate-400">Password</label>
            <Input type="password" placeholder="Enter your password" {...field} />
          </div>
        )}
      />

        <div className="text-center">
            <Button type="submit">Sign In</Button>
        </div>
    </form>
    </>
  );
}

export default SignIn;
