"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import HookFormItem from "@/components/hook-form/HookFormItem";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sleep } from "@/utils/helpers";
import { apiKeySchema, ApiKeyType } from "@/validators/authSchema";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/libs/utils";

const API_KEY = process.env.API_KEY;

export default function ApiKeyForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ApiKeyType>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: {
      apiKey: "",
    },
  });

  async function onSubmit(data: ApiKeyType) {
    setIsLoading(true);

    try {
      await sleep(2000);
      if (data.apiKey === API_KEY) {
        // Simulate API call to validate the key
        setSuccess(true);
        sessionStorage.setItem("api-key", data.apiKey);

        // Redirect after a short delay to show success message
        setTimeout(() => {
          navigate("/chat");
        }, 1000);
      } else {
        toast.error("Invalid API key");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to authenticate"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-50">
      <Card className="w-[450px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600">
              <KeyRound className="h-7 w-7 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            API Authentication
          </CardTitle>
          <CardDescription className="text-center">
            Enter your API key to access protected resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <HookFormItem name="apiKey" label="API Key" isRequired>
                <Input placeholder="Enter your API key" />
              </HookFormItem>

              <Button
                type="submit"
                className={cn("w-full", {
                  "bg-success": success,
                })}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Authenticated
                  </>
                ) : (
                  "Authenticate"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-xs text-muted-foreground text-center">
            Your API key is securely stored and encrypted
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
