import { CirclePlusIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

interface CreateButtonProps {
  onConfirm: () => void;
  disabled?: boolean;
  label?: string;
  dialogTitle?: string;
  dialogDescription?: string;
}

export default function CreateButton(props: CreateButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={'outline'}
          className="text-neutral-500 flex space-x-1.5 place-items-center"
          disabled={props.disabled}
        >
          <CirclePlusIcon strokeWidth={1.5} />
          <p>{props.label ?? 'Create'}</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.dialogTitle ?? 'Please confirm submission'}</AlertDialogTitle>
          <AlertDialogDescription>
            {props.dialogDescription ?? 'The following action cannot be undone.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={props.onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
