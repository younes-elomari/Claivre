"use client";
import Spinner from "@/app/components/Spinner";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import ErrorMessage from "@/app/components/ErrorMessage";
import { registerUserSchema } from "@/app/validationSchemas";

type RegisterFormData = z.infer<typeof registerUserSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerUserSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/register/", data);
      router.push("/auth");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("Une erreur inattendue s'est produite.");
    }
  });

  return (
    <div>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-5" onSubmit={onSubmit}>
        <div>
          <Text size="3" className="font-medium">
            Nom d&apos;utilisateur:
          </Text>
          <TextField.Root
            type="text"
            placeholder="nom d'utilisateur"
            className="mt-2"
            {...register("username")}
          />
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
        </div>

        <div>
          <Text size="3" className="font-medium">
            Email:
          </Text>
          <TextField.Root
            type="email"
            placeholder="email"
            className="mt-2"
            {...register("email")}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </div>

        <div>
          <Text size="3" className="font-medium">
            Mot de passe:
          </Text>
          <TextField.Root
            type="password"
            placeholder="mot de passe"
            className="mt-2"
            {...register("password")}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </div>

        <div>
          <Text size="3" className="font-medium">
            Confirmer mot de passe:
          </Text>
          <TextField.Root
            type="password"
            placeholder="confirmer mot de passe:"
            className="mt-2"
            {...register("confirmPassword")}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
        </div>

        <Button disabled={isSubmitting}>
          <Text className="cursor-pointer">S&apos;inscrire</Text>
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
