"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") setVariant("REGISTER");
    else setVariant("LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post(`/api/register`, data)
        .then(() => toast.success("Registered Successfully"))
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    }
    if (variant === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) toast.error("Invalid Credentials");
          if (callback?.ok) toast.success("Logged in !");
        })
        .finally(() => setIsLoading(false));
    }
  };
  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) toast.error("Invalid credentials");
        if (callback?.ok) toast.success(`Logged in with ${action}`);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <Input
                label="Name"
                id="name"
                type="text"
                disabled={isLoading}
                errors={errors}
                register={register}
              />
            )}
            <Input
              label="Email Address"
              id="email"
              type="email"
              disabled={isLoading}
              errors={errors}
              register={register}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              disabled={isLoading}
              errors={errors}
              register={register}
            />
            <div>
              <Button disabled={isLoading} type="submit" fullWidth>
                {variant === "LOGIN" ? "Sign In" : "Register"}
              </Button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => socialAction("github")}
              />
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => socialAction("google")}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant ? "New to Messenger?" : "Already Have an account?"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
