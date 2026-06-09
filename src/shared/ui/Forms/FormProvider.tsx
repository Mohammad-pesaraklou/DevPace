import { FormEventHandler, ReactNode } from "react";
import {
  FormProvider as RHFFormProvider,
  UseFormReturn,
} from "react-hook-form";

type Props<T extends Record<string, any>> = {
  methods: UseFormReturn<T>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
};

export default function FormProvider<T extends Record<string, any>>({
  methods,
  onSubmit,
  children,
}: Props<T>) {
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </RHFFormProvider>
  );
}
