import React from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/components/ui/Accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "src/components/ui/AlertDialog";
import { Badge } from "src/components/ui/Badge";
import { Button } from "src/components/ui/Button";
import { Checkbox } from "src/components/ui/Checkbox";
import { Input } from "src/components/ui/Input";
import { Label } from "src/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "src/components/ui/RadioGroup";
import { Textarea } from "src/components/ui/Textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/ui/Dialog";
import { ScrollArea } from "src/components/ui/Scrollarea";
import { Separator } from "src/components/ui/Separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/Select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/Table";
import { Toaster } from "src/components/ui/Sonner";
import { toast } from "sonner";

const UIComponentView: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold">UI Components</h1>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Colors</h2>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-crude border border-neutral"></div>
              <span className="text-sm">Crude</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-crude/90 border border-neutral"></div>
              <span className="text-sm">Crude 90%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-crude/80 border border-neutral"></div>
              <span className="text-sm">Crude 80%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-crude/60 border border-neutral"></div>
              <span className="text-sm">Crude 60%</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-quantum"></div>
              <span className="text-sm">Quantum</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-quantum/90"></div>
              <span className="text-sm">Quantum 90%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-quantum/80"></div>
              <span className="text-sm">Quantum 80%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-quantum/60"></div>
              <span className="text-sm">Quantum 60%</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-brightquantum"></div>
              <span className="text-sm">Bright Quantum</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-brightquantum/90"></div>
              <span className="text-sm">Bright Quantum 90%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-brightquantum/80"></div>
              <span className="text-sm">Bright Quantum 80%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-brightquantum/60"></div>
              <span className="text-sm">Bright Quantum 60%</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-martian-red"></div>
              <span className="text-sm">Martian Red</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-martian-red/90"></div>
              <span className="text-sm">Martian Red 90%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-martian-red/80"></div>
              <span className="text-sm">Martian Red 80%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-martian-red/60"></div>
              <span className="text-sm">Martian Red 60%</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-neutral"></div>
              <span className="text-sm">Neutral</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-neutral/90"></div>
              <span className="text-sm">Neutral 90%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-neutral/80"></div>
              <span className="text-sm">Neutral 80%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-neutral/60"></div>
              <span className="text-sm">Neutral 60%</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-red"></div>
              <span className="text-sm">Red</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-red/90"></div>
              <span className="text-sm">Red 90%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-red/80"></div>
              <span className="text-sm">Red 80%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-red/60"></div>
              <span className="text-sm">Red 60%</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-blue"></div>
              <span className="text-sm">Blue</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-blue/90"></div>
              <span className="text-sm">Blue 90%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-blue/80"></div>
              <span className="text-sm">Blue 80%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-blue/60"></div>
              <span className="text-sm">Blue 60%</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-green"></div>
              <span className="text-sm">Green</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-green/90"></div>
              <span className="text-sm">Green 90%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-green/80"></div>
              <span className="text-sm">Green 80%</span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-green/60"></div>
              <span className="text-sm">Green 60%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Buttons</h2>
        <div className="flex gap-4">
          <Button>Button</Button>
          <Button variant="neutral">Neutral</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>

          <Button size="sm" asChild>
            <Link to="/">asChild</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Accordion</h2>
        <div className="w-[300px]">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Section 1</AccordionTrigger>
              <AccordionContent>Content for section 1</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Section 2</AccordionTrigger>
              <AccordionContent>Content for section 2</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Dialog</h2>
        <div className="w-[300px]">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Show Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Example dialog</DialogTitle>
                <DialogDescription>
                  This is an example dialog.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Alert Dialog</h2>
        <div className="">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Show Alert Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Toast</h2>
        <div className="flex gap-2">
          <Button onClick={() => toast.message("Hello")}>Message</Button>
          <Button onClick={() => toast.success("Success")}>Success</Button>
          <Button onClick={() => toast.error("Error")}>Error</Button>
          <Button onClick={() => toast.warning("Warning")}>Warning</Button>
          <Button onClick={() => toast.info("Info")}>Info</Button>
          <Button onClick={() => toast.loading("Loading")}>Loading</Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Badge</h2>
        <div className="flex gap-2">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Input</h2>
        <div className="w-[300px] flex flex-col gap-2">
          <div>
            <Input type="text" placeholder="Placeholder" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file">File</Label>
            <Input id="file" type="file" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Text Area</h2>
        <div className="grid w-[300px] gap-1.5">
          <Label htmlFor="message">Your message</Label>
          <Textarea placeholder="Type your message here." id="message" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Checkbox</h2>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Select</h2>
        <div className="w-[300px]">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Radio Group</h2>
        <div className="w-[300px]">
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">Compact</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Scroll Area</h2>
        <div className="">
          <ScrollArea className="h-72 w-48 border">
            <div className="p-4">
              {Array.from({ length: 50 }).map((tag, i) => (
                <>
                  <div key={i} className="text-sm">
                    Scroll Area Item {i + 1}
                  </div>
                  <Separator className="my-2" />
                </>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Table</h2>
        <div className="">
          <Table>
            <TableCaption>Example table caption</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">ABC123</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>Example description</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline">View</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default UIComponentView;
