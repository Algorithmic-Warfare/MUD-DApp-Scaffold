import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/Table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/ui/Dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "src/components/ui/AlertDialog";
import { Button } from "src/components/ui/Button"
import { Label } from "src/components/ui/Label";
import { Input } from "src/components/ui/Input";
import { Link } from "react-router-dom";

const OperationsPage: React.FC = () => {
  const [showCreateOperationDialog, setShowCreateOperationDialog] = useState(false);
  const [name, setName] = useState("");

  const handleCreateOperation = () => {
    console.log('create', name);
    setName("");
    setShowCreateOperationDialog(false);
  };

  const handleDeleteOperation = () => {
    console.log("delete");
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex bg-gray-neutral/40 items-center justify-between p-4">
          <h1 className="text-xl font-disket uppercasefont-bold">Operations</h1>

          <Dialog open={showCreateOperationDialog} onOpenChange={setShowCreateOperationDialog}>
            <DialogTrigger asChild>
              <Button variant="neutral">Create Operation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Operation</DialogTitle>
                <DialogDescription>
                  An operation is a collection of actions.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-1.5 py-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} id="name" />
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateOperation}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="p-2">
          <div className="bg-crude border border-gray-neutral/50 w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right" />
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">ABC123</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>Example description</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/operations/123">View</Link>
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              account and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction variant="destructive" onClick={handleDeleteOperation}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(OperationsPage);
