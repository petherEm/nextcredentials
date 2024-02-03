"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data);

    const { email, password } = data;

    try {
      const response: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log({ response });
      if (!response?.error) {
        router.push("/");
        router.refresh();
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      console.log("Login Successful", response);
      toast({ title: "Login Successful" });
    } catch (error: any) {
      console.error("Login Failed:", error);
      toast({ title: "Login Failed", description: error.message });
    }
  };

  return (
    <Form {...form} className="w-2/3 space-y-6">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-white p-4 md:p-16 border-[1.5px] rounded-lg border-gray-300 flex flex-col items-center justify-center gap-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provide Email</FormLabel>
              <FormControl>
                <Input
                  className="text-black"
                  placeholder="Provide Email"
                  {...field}
                  type="text"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provide Password</FormLabel>
              <FormControl>
                <Input
                  className="text-black"
                  placeholder="Hasło"
                  {...field}
                  type="password"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="hover:scale-110 hover:bg-cyan-700"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Opening...." : "Open Sesame!"}
        </Button>
      </form>
    </Form>
  );
}
