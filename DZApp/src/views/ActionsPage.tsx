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
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "src/components/ui/Breadcrumb";
import { ScrollArea } from "src/components/ui/Scrollarea";
import { Separator } from "src/components/ui/Separator";
import { RadioGroup, RadioGroupItem } from "src/components/ui/RadioGroup";

const ActionsPage: React.FC = () => {
  const [showCreateActionDialog, setShowCreateActionDialog] = useState(false);
  const [name, setName] = useState("");
  const [newActionType, setNewActionType] = useState<"withdraw" | "deposit" | "transport">("withdraw");

  const handleCreateAction = () => {
    console.log('create', name);
    setName("");
    setShowCreateActionDialog(false);
  };

  const handleDeleteAction = () => {
    console.log("delete");
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex bg-gray-neutral/40 items-center justify-between p-4">
          <div className="flex flex-col">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/operations">Operation</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/operations/123">123</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-xl font-disket uppercasefont-bold">Actions</h1>
          </div>

          <Dialog open={showCreateActionDialog} onOpenChange={setShowCreateActionDialog}>
            <DialogTrigger asChild>
              <Button variant="neutral">Create Action</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Create Action</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-5 gap-4 pt-4">
                <div className="col-span-5 md:col-span-2 flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="type" className="text-right">
                      Action type
                    </Label>
                    <RadioGroup defaultValue="comfortable" value={newActionType} onValueChange={(value) => setNewActionType(value as "withdraw" | "deposit" | "transport")}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="withdraw" id="r1" />
                        <Label htmlFor="r1">Withdraw</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="deposit" id="r2" />
                        <Label htmlFor="r2">Deposit</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="transport" id="r3" />
                        <Label htmlFor="r3">Transport</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {(newActionType === 'transport' || newActionType === 'withdraw') && (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="fromSSU" className="text-right">
                        From SSU ID
                      </Label>
                      <Input type="string" placeholder="0x0000000000000000000000000000000000000000" id="fromSSU" />
                    </div>
                  )}

                  {(newActionType === 'transport' || newActionType === 'deposit') && (
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="toSSU" className="text-right">
                        To SSU ID
                      </Label>
                      <Input type="string" placeholder="0x0000000000000000000000000000000000000000" id="toSSU" />
                    </div>
                  )}
                </div>
                <div className="col-span-5 md:col-span-3 flex flex-col gap-1.5">
                  <div className="border">
                    <ScrollArea className="h-[300px]">
                      <div className="p-4 flex flex-col gap-2">
                        {Array.from({ length: 50 }).map((tag, i) => (
                          <>
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-gray-neutral/50"></div>
                              <div className="text-sm">
                                Item {i + 1}
                              </div>
                              <div className="flex-grow"></div>
                              <div className="text-sm">
                                <Input type="number" step={1} min={0} className="w-20" placeholder="Qnt" />
                              </div>
                            </div>
                            {/* <Separator className="my-2" /> */}
                          </>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateAction}>Create</Button>
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
                        <Link to="/actions/123">View</Link>
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
                            <AlertDialogAction variant="destructive" onClick={handleDeleteAction}>Delete</AlertDialogAction>
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

export default React.memo(ActionsPage);
