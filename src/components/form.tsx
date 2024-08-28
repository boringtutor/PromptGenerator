"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import {
  useForm,
  getFormProps,
  getInputProps,
  SubmissionResult,
} from "@conform-to/react";
import React, { useEffect, useId } from "react";
import { promptaction } from "@/app/actions";
import { parseWithZod } from "@conform-to/zod";
import { PromptSchema } from "@/app/schema";
import { Textarea } from "./ui/textarea";

export type ListOfErrors = Array<string | null | undefined> | null | undefined;

export function ErrorList({
  id,
  errors,
}: {
  errors?: ListOfErrors;
  id?: string;
}) {
  const errorsToRender = errors?.filter(Boolean);
  if (!errorsToRender?.length) return null;
  return (
    <ul id={id} className="flex flex-col gap-1">
      {errorsToRender.map((e) => (
        <li key={e} className="text-[10px] text-foreground-destructive">
          {e}
        </li>
      ))}
    </ul>
  );
}

export function TextareaField({
  labelProps,
  textareaProps,
  errors,
  className,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  errors?: ListOfErrors;
  className?: string;
}) {
  const fallbackId = useId();
  const id = textareaProps.id ?? textareaProps.name ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <div className={className}>
      <Textarea
        id={id}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        {...textareaProps}
      />
      <div className="min-h-[10px]  pt-1 text-red-400">
        {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
      </div>
    </div>
  );
}

function FormButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="mt-6 flex justify-center w-full"
      {...props}
      disabled={pending || props.disabled}
    >
      {pending ? "Generating Prompt..." : props.children}
    </Button>
  );
}

export default function PromptInputForm({
  setGeneratePrompt,
}: {
  setGeneratePrompt: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [lastResult, action] = useFormState(promptaction, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,
    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: PromptSchema });
    },
    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    if (lastResult?.status === "success" && "response" in lastResult) {
      setGeneratePrompt(lastResult.response);
    }
  }, [lastResult, setGeneratePrompt]);
  return (
    <form action={action} {...getFormProps(form)}>
      <div>
        <TextareaField
          className="w-[800px] "
          labelProps={{ htmlFor: "prompt" }}
          textareaProps={{ id: "prompt", name: "prompt" }}
          {...getInputProps(fields.prompt, { type: "text" })}
          errors={fields.prompt.errors}
        />
      </div>
      <FormButton>Generate Prompt</FormButton>
      <div></div>
    </form>
  );
}
