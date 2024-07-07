import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Modal({
  children,
  buttonLabel,
  headerTitle,
  headerDescription,
  footerContent,
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-secondary text-secondary-foreground"
        >
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          {headerTitle && <DialogTitle>{headerTitle}</DialogTitle>}
          {headerDescription && (
            <DialogDescription>{headerDescription}</DialogDescription>
          )}
        </DialogHeader>
        {children}
        <DialogFooter>{footerContent}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
