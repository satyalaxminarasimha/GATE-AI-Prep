"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { BrainCircuit, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useAuth } from "@/hooks/use-auth.tsx";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const { register } = useAuth();


  const handleRegister = () => {
    if (password.length < 6) {
        toast({
            variant: "destructive",
            title: "Registration Failed",
            description: "Password must be at least 6 characters.",
        });
        return;
    }

    startTransition(async () => {
        const result = await register({ name, college, email, password });
        if (result.success) {
            toast({
            title: "Registration Successful",
            description: "You can now log in with your credentials.",
            });
            router.push("/login");
        } else {
            toast({
            variant: "destructive",
            title: "Registration Failed",
            description: result.message || "An unexpected error occurred.",
            });
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-11.5rem)] px-4 py-8">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BrainCircuit className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>
            Join GATE AI Prep to start your personalized journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
           <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="college">College</Label>
            <Input id="college" placeholder="University of Innovation" required value={college} onChange={(e) => setCollege(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleRegister} disabled={isPending}>
             {isPending ? <Loader2 className="animate-spin" /> : "Register"}
          </Button>
        </CardFooter>
         <p className="px-6 pb-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-primary">
                Login
            </Link>
          </p>
      </Card>
    </div>
  );
}
