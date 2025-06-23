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
import { Progress } from "src/components/ui/progress";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "src/components/ui/Breadcrumb";
import { toast } from "sonner";

const UIComponentView: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold">UI Components</h1>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Colors</h2>
        <div className="flex gap-4">
          {/* Primary Colors */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-primary"></div>
              <span className="text-sm">Primary</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-primary-light"></div>
              <span className="text-sm">Primary Light</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-primary-lighter"></div>
              <span className="text-sm">Primary Lighter</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-primary-dark"></div>
              <span className="text-sm">Primary Dark</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-primary-darker"></div>
              <span className="text-sm">Primary Darker</span>
            </div>
          </div>

          {/* Secondary Colors */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-secondary"></div>
              <span className="text-sm">Secondary</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-secondary-light"></div>
              <span className="text-sm">Secondary Light</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-secondary-lighter"></div>
              <span className="text-sm">Secondary Lighter</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-secondary-dark"></div>
              <span className="text-sm">Secondary Dark</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-secondary-darker"></div>
              <span className="text-sm">Secondary Darker</span>
            </div>
          </div>

          {/* Status Colors */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-success"></div>
              <span className="text-sm">Success</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-warning"></div>
              <span className="text-sm">Warning</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-error"></div>
              <span className="text-sm">Error</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-info"></div>
              <span className="text-sm">Info</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Buttons</h2>
        <h3>Primary</h3>
        <div className="flex gap-4">
          <Button variant="primary-default">Primary Default</Button>
          <Button variant="primary-outline">Primary Outline</Button>
          <Button variant="primary-destructive">Primary Destructive</Button>
          <Button variant="primary-ghost">Primary Ghost</Button>
          <Button variant="primary-link">Primary Link</Button>
        </div>
        <h3>Secondary</h3>
        <div className="flex gap-4">
          <Button variant="secondary-default">Secondary Default</Button>
          <Button variant="secondary-outline">Secondary Outline</Button>
          <Button variant="secondary-ghost">Secondary Ghost</Button>
          <Button variant="secondary-link">Secondary Link</Button>
          <Button variant="secondary-destructive">Secondary Destructive</Button>
        </div>
        <h3>Neutral</h3>
        <div className="flex gap-4">
          <Button variant="neutral">Neutral</Button>
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
                <AlertDialogAction variant="primary-destructive">
                  Continue
                </AlertDialogAction>
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
        <div className="flex items-center space-x-2 bg-primary-100">
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
            <TableHeader className="border-1 border-">
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
                  <Button variant="primary-default">View</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Breadcrumb</h2>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Library</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Data</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-lg font-bold">Progress</h2>
        <Progress value={50} />
      </div>

      <Toaster />
    </div>
  );
};

export default UIComponentView;
