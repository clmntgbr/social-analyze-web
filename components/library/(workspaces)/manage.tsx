"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { WorkspaceFull } from "@/store/client/interface/workspace-full";
import { getFullWorkspaces } from "@/store/workspaces/getFullWorkspaces";
import { getWorkspace } from "@/store/workspaces/getWorkspace";
import { getWorkspaces } from "@/store/workspaces/getWorkspaces";
import { leaveWorkspace } from "@/store/workspaces/leaveWorkspace";
import { patchWorkspace } from "@/store/workspaces/patchWorkspace";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { ToastFail, ToastSuccess } from "../Toast";

type WorkspacesMembersProps = {
  workspace: WorkspaceFull;
};

export const WorkspacesManage: React.FC<WorkspacesMembersProps> = ({ workspace }) => {
  const { data: session } = useSession();
  const { workspaces, workspacesDispatch } = useWorkspacesContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOnLeave, setIsLoadingOnLeave] = useState(false);
  const [file64, setFile64] = useState<string | null>(null);
  const fileRef = useRef(null);
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    convertToBase64(selectedFile);
  };

  const handleFileClick = () => {
    if (workspace.admin.uuid !== session?.user?.id || isLoading) {
      return;
    }

    if (fileRef) {
      fileRef.current.click();
    }
  };

  const formik = useFormik({
    initialValues: {
      label: "",
    },
    validationSchema: Yup.object({
      label: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const body = { label: values.label, avatar: file64 };

      patchWorkspace(session?.accessToken ?? "", workspace.uuid, body, workspacesDispatch)
        .then(() => {
          setTimeout(async () => {
            ToastSuccess();
            getFullWorkspaces(session?.accessToken ?? "", workspacesDispatch);
            getWorkspaces(session?.accessToken ?? "", workspacesDispatch);
            getWorkspace(session?.accessToken ?? "", workspacesDispatch);
            setIsLoading(false);
          }, 2000);
        })
        .catch((response) => {
          setTimeout(() => {
            setIsLoading(false);
            ToastFail("Something went wrong.", response.message ?? "There was a problem with your request.");
          }, 2000);
        });
    },
  });

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      setFile64(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const showLeaveDialog = async (event) => {
    event.preventDefault();
    setShowDialog(true);
  };

  const onLeaveWorkspace = async () => {
    setIsLoadingOnLeave(true);

    leaveWorkspace(session?.accessToken ?? "", workspace.uuid, workspacesDispatch)
      .then(() => {
        console.log("success");
        setTimeout(async () => {
          ToastSuccess();
          getFullWorkspaces(session?.accessToken ?? "", workspacesDispatch);
          getWorkspaces(session?.accessToken ?? "", workspacesDispatch);
          getWorkspace(session?.accessToken ?? "", workspacesDispatch);
          router.push(`?uuid=`);
          setIsLoading(false);
          setShowDialog(false);
          setIsLoadingOnLeave(false);
        }, 2000);
      })
      .catch((response) => {
        console.log("error");
        setTimeout(() => {
          setIsLoading(false);
          setShowDialog(false);
          setIsLoadingOnLeave(false);
          ToastFail("Something went wrong.", response.message ?? "There was a problem with your request.");
        }, 2000);
      });
  };

  useEffect(() => {
    setFile64(null);
    formik.setFieldValue("label", workspace.label);
  }, [workspace]);

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{workspace.label}</CardTitle>
          <CardDescription> Update your workspace settings. Set your workspace name and avatar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="post-workspaces" onSubmit={formik.handleSubmit} key={workspace.uuid}>
            <div>
              <Label htmlFor="name" className={`${formik.touched.label && formik.errors.label ? "text-red-800" : ""}`}>
                Name
              </Label>
              <Input
                className={`${formik.touched.label && formik.errors.label ? "border-red-500" : ""}`}
                id="label"
                name="label"
                onBlur={formik.handleBlur}
                value={formik.values.label}
                onChange={formik.handleChange}
                disabled={workspace.admin.uuid !== session?.user?.id || isLoading}
              />
            </div>

            <div className="mt-5">
              <Label htmlFor="logo" className={`${formik.touched.label && formik.errors.label ? "text-red-800" : ""}`}>
                Logo
              </Label>

              <div className="flex items-center space-x-4">
                <img className="w-24 h-24 object-cover rounded-full " onClick={handleFileClick} src={file64 ?? workspace.logoUrl} alt="Base64 Image" />

                <div>
                  <div className="text-sm font-medium leading-none">
                    <input type="file" hidden ref={fileRef} id="file" name="file" onChange={handleFileChange} className="border border-gray-400 p-2 rounded-md w-full" />
                  </div>
                </div>
              </div>
            </div>
            <p className="italic mt-2 font-extralight from-stone-300 text-sm">You can change the workspace logo by clicking on it</p>
            <div className="flex justify-between mt-5">
              <Button type="submit" className="mt-5" disabled={workspace.admin.uuid !== session?.user?.id || isLoading}>
                Save
                {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              </Button>
              <Button variant="destructive" className="mt-5" onClick={showLeaveDialog}>
                Leave this workspace
              </Button>
            </div>
          </form>
        </CardContent>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Leaving {workspace.label} workspace ?</DialogTitle>
              <DialogDescription>
                {workspace.admin.uuid === session?.user?.id ? (
                  <>You cannot leave this workspace as you are the current administrator. Please assign administrator rights to another user and try again.</>
                ) : (
                  <>Are you sure you want to leave?</>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {workspace.admin.uuid !== session?.user?.id && (
                <>
                  <Button type="submit" disabled={isLoadingOnLeave} variant="destructive" onClick={() => setShowDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoadingOnLeave} onClick={() => onLeaveWorkspace()}>
                    Confirm
                    {isLoadingOnLeave && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
};
