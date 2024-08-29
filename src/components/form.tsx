"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import React, { useEffect, useId, useState } from "react";
import { promptaction } from "@/app/actions";
import { parseWithZod } from "@conform-to/zod";
import { PromptSchema } from "@/app/schema";
import { Textarea } from "./ui/textarea";
import { ButtonStatus } from "@/lib/types";
import { StatusButton } from "./ui/statusButton";
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
  ref,
  textareaProps,
  errors,
  className,
}: {
  ref: React.RefObject<HTMLTextAreaElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  errors?: ListOfErrors;
  className?: string;
}) {
  const fallbackId = useId();
  const id = textareaProps.id ?? textareaProps.name ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-2">
      <Textarea
        ref={ref}
        id={id}
        placeholder="Enter your initial prompt here..."
        className="mb-4 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        rows={4}
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

function FormButton({
  status,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { status: ButtonStatus }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <StatusButton
          status="pending"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          disabled
        >
          Generating... This may take a while.
        </StatusButton>
      ) : status === "success" ? (
        <StatusButton
          status="success"
          className="bg-green-500 hover:bg-green-600 text-white w-full transition-all duration-200"
        >
          Prompt Generated
        </StatusButton>
      ) : (
        <>
          {status === "error" ? (
            <StatusButton
              status="error"
              className="w-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
            >
              Error Generating Prompt
            </StatusButton>
          ) : (
            <StatusButton
              status="idle"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Generate Detailed Prompt'
            </StatusButton>
          )}
        </>
      )}
    </>
  );
}

export default function PromptInputForm({
  setGeneratePrompt,
  ref,
}: {
  setGeneratePrompt: React.Dispatch<React.SetStateAction<string | undefined>>;
  ref: React.RefObject<HTMLTextAreaElement>;
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
  const [status, setStatus] = useState<ButtonStatus>("idle");

  useEffect(() => {
    if (lastResult?.status === "success" && "response" in lastResult) {
      setGeneratePrompt(lastResult.response);
      setStatus("success");
    }
    if (lastResult?.status === "error") {
      setStatus("error");
    }
  }, [lastResult, setGeneratePrompt]);

  useEffect(() => {
    if (fields.prompt.value) {
      setStatus("idle");
    }
  }, [fields.prompt.value]);

  return (
    <form action={action} {...getFormProps(form)}>
      <div className="space-y-2 mb-4">
        <TextareaField
          ref={ref}
          className="flex min-w-full md:min-w-[400px] lg:min-w-[600px] xl:min-w-[600px]"
          labelProps={{ htmlFor: "prompt" }}
          textareaProps={{ id: "prompt", name: "prompt" }}
          {...getInputProps(fields.prompt, { type: "text" })}
          errors={fields.prompt.errors}
        />
      </div>
      {status === "error" ? (
        <FormButton status="error" />
      ) : (
        <>
          {status === "success" ? (
            <FormButton status="success" />
          ) : (
            <FormButton status="idle" />
          )}
        </>
      )}
      <div></div>
    </form>
  );
}
