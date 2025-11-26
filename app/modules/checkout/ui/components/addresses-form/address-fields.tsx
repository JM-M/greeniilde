"use client";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/app/components/ui/input-group";
import { DEFAULT_COUNTRY_CODE } from "@/app/constants/terminal";
import { CitiesSelect } from "@/app/modules/checkout/ui/components/cities-select";
import { CountriesSelect } from "@/app/modules/checkout/ui/components/countries-select";
import { StatesSelect } from "@/app/modules/checkout/ui/components/states-select";
import { useSuspenseGetStates } from "@/app/modules/terminal/hooks/use-terminal-queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

export const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Enter a valid email"),
  phone: z.string().optional(),
  addressLine1: z
    .string()
    .min(1, "Address line 1 is required")
    .max(45, "Address line 1 should not be more than 45 characters."),
  addressLine2: z.string().optional(),
  company: z.string().optional(),
  postalCode: z.string().min(1, "Postal code is required"),
  city: z.string().min(1, "City is required"),
  countryCode: z
    .string()
    .min(2, "Country code must be 2 letters")
    .max(2, "Country code must be 2 letters")
    .toUpperCase(),
  state: z.string().optional(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;

export interface AddressFormProps {
  onSubmit: (values: AddressFormValues) => void;
  submitButtonLabel: ReactNode;
  isLoading?: boolean;
  defaultValues?: Partial<AddressFormValues>;
  showIcon?: boolean;
}

interface AddressFieldsProps {
  prefix?: string;
}

export const AddressFields = ({ prefix = "" }: AddressFieldsProps) => {
  const form = useFormContext();
  const fieldName = (name: string) => (prefix ? `${prefix}.${name}` : name);

  const countryCode = form.watch(fieldName("countryCode"));
  const { data: statesData } = useSuspenseGetStates(
    countryCode || DEFAULT_COUNTRY_CODE,
  );
  const stateName = form.watch(fieldName("state"));
  const stateCode = statesData.data.find((s) => s.name === stateName)?.isoCode;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FormField
          control={form.control}
          name={fieldName("firstName")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jane"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={fieldName("lastName")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FormField
          control={form.control}
          name={fieldName("email")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="jane@example.com"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={fieldName("phone")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>+234</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    type="tel"
                    placeholder="800 000 0000"
                    {...field}
                    value={field.value || ""}
                  />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={fieldName("company")}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input
                placeholder="Company (optional)"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={fieldName("addressLine1")}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address line 1</FormLabel>
            <FormControl>
              <Input
                placeholder="Street address"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={fieldName("addressLine2")}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address line 2</FormLabel>
            <FormControl>
              <Input
                placeholder="Apt, suite, etc. (optional)"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <FormField
          control={form.control}
          name={fieldName("countryCode")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <CountriesSelect
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue(fieldName("state"), "", {
                      shouldValidate: false,
                    });
                    form.setValue(fieldName("city"), "", {
                      shouldValidate: false,
                    });
                  }}
                  placeholder="Select country..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={fieldName("state")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>State/Region</FormLabel>
              <FormControl>
                <StatesSelect
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue(fieldName("city"), "", {
                      shouldValidate: false,
                    });
                  }}
                  countryCode={countryCode}
                  placeholder="Select state..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={fieldName("city")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <CitiesSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  countryCode={countryCode}
                  stateCode={stateCode}
                  placeholder="Select city..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={fieldName("postalCode")}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Postal code</FormLabel>
            <FormControl>
              <Input
                placeholder="Postal code"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export const AddressForm = ({
  onSubmit,
  submitButtonLabel,
  isLoading = false,
  defaultValues = {},
  showIcon = true,
}: AddressFormProps) => {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      company: "",
      postalCode: "",
      city: "",
      countryCode: DEFAULT_COUNTRY_CODE,
      state: "",
      ...defaultValues,
    },
    mode: "onSubmit",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full flex-col gap-3"
        noValidate
      >
        <AddressFields />
        <div className="mt-4 flex gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {submitButtonLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
