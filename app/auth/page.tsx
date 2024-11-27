"use client";
import { signIn } from "next-auth/react";
import Spinner from "@/app/components/Spinner";
import {
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

const loginUserSchema = z.object({
  email: z.string().email("email is required.").max(200),
  password: z.string().min(8, "password is required.").max(800),
});

type LoginFormData = z.infer<typeof loginUserSchema>;

const SigninPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginUserSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    } else {
      router.push("/");
      router.refresh();
    }
  });

  return (
    <Card className="max-w-xl m-auto">
      <Flex className="my-5 mx-3" direction="column" gap="4">
        <Heading size="5" className="text-gray-600 text-center">
          Connexion.
        </Heading>
        <Text size="4" className="text-gray-500 font-medium">
          Bon retour. veuillez vous connecter à votre compte.
        </Text>
        {error && (
          <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <form className="space-y-5" onSubmit={onSubmit}>
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
              Mot de pass:
            </Text>
            <TextField.Root
              type="password"
              placeholder="mot de pass"
              className="mt-2"
              {...register("password")}
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>
          <Button disabled={isSubmitting}>
            <Text className="cursor-pointer">Connexion</Text>
            {isSubmitting && <Spinner />}
          </Button>
        </form>
      </Flex>
    </Card>
  );
};

export default SigninPage;
