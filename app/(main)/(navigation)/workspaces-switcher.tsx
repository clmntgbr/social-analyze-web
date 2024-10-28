"use client";

import { CaretSortIcon, CheckIcon, PlusCircledIcon, ReloadIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { cn } from "@/lib/utils";
import { Workspace } from "@/store/client/interface/workspace";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function WorkspacesSwitcher() {
  const { workspaces } = useWorkspacesContext();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { workspacesDispatch } = useWorkspacesContext();
    const { getToken } = useAuth();
    const token = await getToken();
    setIsLoading(false);

    // if (workspaceName) {
    //   setIsLoading(true);
    //   const body = {
    //     label: workspaceName,
    //     logoUrl: "string",
    //   };
    //   postWorkspaces(`${token}`, body, workspacesDispatch);
    // }
  };

  useEffect(() => {
    if (!selectedWorkspace) {
      setSelectedWorkspace(workspaces.workspace);
    }
  });

  if (!workspaces || !workspaces.workspace || !workspaces.workspaces || !workspaces.workspaces.member?.length) {
    return null;
  }

  return (
    <Dialog open={showNewWorkspaceDialog} onOpenChange={setShowNewWorkspaceDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} aria-label="Select a team" className={cn("min-w-[250px] justify-between font-semibold")}>
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={`https://avatar.vercel.sh/${selectedWorkspace?.uuid}.png`} alt={selectedWorkspace?.label} />
              <AvatarFallback>{selectedWorkspace?.label}</AvatarFallback>
            </Avatar>
            {selectedWorkspace?.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[250px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No team found.</CommandEmpty>
              {workspaces.workspaces?.member.map((workspace: Workspace) => (
                <CommandItem
                  value={workspace.uuid}
                  key={workspace.uuid}
                  onSelect={() => {
                    setSelectedWorkspace(workspace);
                    setOpen(false);
                  }}
                  className="text-sm font-light px-4"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage src={`https://avatar.vercel.sh/${workspace.uuid}.png`} alt={workspace.label} />
                    <AvatarFallback>{workspace.label}</AvatarFallback>
                  </Avatar>
                  {workspace.label}
                  <CheckIcon className={cn("ml-auto h-4 w-4", selectedWorkspace?.uuid === workspace.uuid ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewWorkspaceDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create a workspace
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogDescription>Add a new workspace to manage social accounts & posts.</DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Workspace name</Label>
                <Input id="name" name="name" disabled={isLoading} placeholder="Acme Inc." value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewWorkspaceDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Continue
              {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}