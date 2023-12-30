import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "./login-form";

export function LoginDialog({ className }: {className: string}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={className} variant="outline">Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[325px]">
                <DialogHeader>
                    <DialogTitle>Login to your account</DialogTitle>
                </DialogHeader>
                <LoginForm />
            </DialogContent>
        </Dialog>
    );
}
