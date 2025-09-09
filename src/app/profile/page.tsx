
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100dvh-11.5rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24 text-3xl">
                    <AvatarFallback>{user.name?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </div>
          <CardTitle className="text-3xl font-headline">{user.name}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">{user.college}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center space-y-2">
                <p className="text-md"><strong>Email:</strong> {user.email}</p>
            </div>
        </CardContent>
      </Card>
      <div className="mt-8 flex justify-center">
        <Button variant="outline" onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}
