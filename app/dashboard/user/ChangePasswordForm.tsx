"use client";
import Spinner from "@/app/components/Spinner";
import { Button, Callout, Card, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import ErrorMessage from "@/app/components/ErrorMessage";
import { changePasswordSchema } from "@/app/validationSchemas";

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePasswordForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.patch(`/api/register/${userId}`, data);
      router.push("/auth");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("Une erreur inattendue s'est produite.");

    }
  });

  return (
    <Card>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-5 p-2" onSubmit={onSubmit}>
        <div>
          <Text size="3" className="font-medium">
            Nouveaux email:
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
            Nouveaux mot de passe:
          </Text>
          <TextField.Root
            type="password"
            placeholder="nouveaux mot de passe"
            className="mt-2"
            {...register("newPassword")}
          />
          <ErrorMessage>{errors.newPassword?.message}</ErrorMessage>
        </div>

        <div>
          <Text size="3" className="font-medium">
            Confirmer le nouveau mot de passe:
          </Text>
          <TextField.Root
            type="password"
            placeholder="confirmer le nouveau mot de passe"
            className="mt-2"
            {...register("confirmNewPassword")}
          />
          <ErrorMessage>{errors.confirmNewPassword?.message}</ErrorMessage>
        </div>

        <Button disabled={isSubmitting}>
          <Text className="cursor-pointer">Modifier</Text>
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Card>
  );
};

export default ChangePasswordForm;
