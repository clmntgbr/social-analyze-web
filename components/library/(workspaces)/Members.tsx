"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useWorkspacesContext from "@/contexts/workspaces/hooks";
import { useI18n } from "@/locales/client";
import { Workspace } from "@/store/client/interface/workspace";
import { deleteWorkspaceUser } from "@/store/workspaces/deleteWorkspaceUser";
import { getWorkspaces } from "@/store/workspaces/getWorkspaces";
import { postWorkspaceInvitation } from "@/store/workspaces/postWorkspaceInvitation";
import { postWorkspacePromote } from "@/store/workspaces/postWorkspacePromote";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { ShieldCheck, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import * as Yup from "yup";
import { ToastFail, ToastSuccess } from "../Toast";

type WorkspacesMembersProps = {
  workspace: Workspace;
};

export const WorkspacesMembers: React.FC<WorkspacesMembersProps> = ({ workspace }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOnDelete, setIsLoadingOnDelete] = useState(false);
  const [isLoadingOnPromote, setIsLoadingOnPromote] = useState(false);
  const [uuidLoadingOnDelete, setUuidLoadingOnDelete] = useState("");
  const [uuidLoadingOnPromote, setUuidLoadingOnPromote] = useState("");
  const { workspacesDispatch } = useWorkspacesContext();
  const t = useI18n();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUuid, setSelectedUuid] = useState<{ workspaceUuid: string | null; userUuid: string | null; user: string | null }>({
    workspaceUuid: null,
    userUuid: null,
    user: null,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const body = {
        workspaceUuid: workspace.uuid,
        userInvitationEmail: values.email,
      };
      postWorkspaceInvitation(session?.accessToken ?? "", body, workspacesDispatch)
        .then(() => {
          getWorkspaces(session?.accessToken ?? "", workspacesDispatch);
          formik.resetForm();
          setTimeout(() => {
            setIsLoading(false);
            ToastSuccess();
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

  const removeUser = async (workspaceUuid: string, userUuid: string) => {
    setUuidLoadingOnDelete(userUuid);
    setIsLoadingOnDelete(true);
    deleteWorkspaceUser(session?.accessToken ?? "", workspaceUuid, userUuid, workspacesDispatch)
      .then(() => {
        getWorkspaces(session?.accessToken ?? "", workspacesDispatch);
        setUuidLoadingOnDelete("");
        setTimeout(() => {
          setIsLoadingOnDelete(false);
          ToastSuccess();
        }, 2000);
      })
      .catch((response) => {
        setUuidLoadingOnDelete("");
        setTimeout(() => {
          setIsLoadingOnDelete(false);
          ToastFail("Something went wrong.", response.message ?? "There was a problem with your request.");
        }, 2000);
      });
  };

  const promoteUserValidate = async (workspaceUuid: string, userUuid: string, userName: string) => {
    setSelectedUuid({ workspaceUuid, userUuid, user: userName });
    setShowDialog(true);
  };

  const promoteUserCancel = async () => {
    setSelectedUuid({ workspaceUuid: null, userUuid: null, user: null });
    setShowDialog(false);
  };

  const promoteUser = async () => {
    setUuidLoadingOnPromote(selectedUuid.userUuid ?? "");
    setIsLoadingOnPromote(true);
    postWorkspacePromote(session?.accessToken ?? "", selectedUuid.workspaceUuid ?? "", selectedUuid.userUuid ?? "", workspacesDispatch)
      .then(() => {
        getWorkspaces(session?.accessToken ?? "", workspacesDispatch);
        setUuidLoadingOnPromote("");
        setSelectedUuid({ workspaceUuid: null, userUuid: null, user: null });
        setTimeout(() => {
          setIsLoadingOnPromote(false);
          setShowDialog(false);
          ToastSuccess();
        }, 2000);
      })
      .catch(() => {
        setUuidLoadingOnPromote("");
        setTimeout((response) => {
          setIsLoadingOnPromote(false);
          ToastFail("Something went wrong.", response.message ?? "There was a problem with your request.");
        }, 2000);
      });
  };

  return (
    <>
      <Card className="shadow-xs">
        <CardHeader>
          <CardTitle>{t("pages.workspaces.widget.members.title")}</CardTitle>
          <CardDescription>{t("pages.workspaces.widget.members.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="post-workspaces" onSubmit={formik.handleSubmit}>
            <div className="flex space-x-2">
              <Input id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} disabled={isLoading} placeholder="" />
              <Button variant="secondary" className="shrink-0" type="submit" disabled={isLoading}>
                {t("pages.workspaces.widget.members.button")}
                {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              </Button>
            </div>
          </form>
          <Separator className="my-4" />
          <div className="space-y-4">
            <h4 className="text-sm font-medium">{t("pages.workspaces.widget.members.access")}</h4>
            <div className="grid gap-6">
              {workspace &&
                workspace.users.map((user) => (
                  <div className="flex items-center justify-between space-x-4" key={crypto.randomUUID()}>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl ?? "https://avatar.vercel.sh/rauchg.png"} />
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium leading-none">
                          {user.givenName} {user.familyName}
                          {session?.user?.id === user.uuid && (
                            <Badge variant="outline" className="ml-1">
                              {t("pages.workspaces.widget.members.you")}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Badge>{user.uuid === workspace.admin.uuid ? t("pages.workspaces.widget.members.administrator") : t("pages.workspaces.widget.members.member")}</Badge>
                      {session?.user?.id === workspace.admin.uuid && user.uuid !== workspace.admin.uuid && (
                        <>
                          <Badge className="cursor-pointer" variant="destructive" onClick={() => removeUser(workspace.uuid, user.uuid)}>
                            {isLoadingOnDelete && user.uuid === uuidLoadingOnDelete ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <Trash2 size={16} />}
                          </Badge>
                          <Badge className="cursor-pointer" variant="outline" onClick={() => promoteUserValidate(workspace.uuid, user.uuid, `${user.givenName} ${user.familyName}`)}>
                            {isLoadingOnPromote && user.uuid === uuidLoadingOnPromote ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <ShieldCheck size={16} />}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {workspace && workspace.workspaceInvitations.some((invitation) => invitation.status === "pending") && (
            <>
              <Separator className="my-4" />
              <div className="space-y-4">
                <h4 className="text-sm font-medium">{t("pages.workspaces.widget.members.pending.title")}</h4>
                <div className="grid gap-6">
                  {workspace &&
                    workspace.workspaceInvitations
                      .filter((workspaceInvitation) => workspaceInvitation.status === "pending")
                      .map((workspaceInvitation) => (
                        <div className="flex items-center justify-between space-x-4" key={crypto.randomUUID()}>
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={workspaceInvitation.user.avatarUrl ?? "https://avatar.vercel.sh/rauchg.png"} />
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium leading-none">
                                {workspaceInvitation.user.givenName} {workspaceInvitation.user.familyName}
                              </div>
                              <p className="text-sm text-muted-foreground">{workspaceInvitation.user.email}</p>
                            </div>
                          </div>
                          <Badge variant="secondary">{workspaceInvitation.status.toLocaleUpperCase()}</Badge>
                        </div>
                      ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("pages.workspaces.widget.members.promote.title", { name: selectedUuid.user })}</DialogTitle>
            <DialogDescription>{t("pages.workspaces.widget.members.promote.description")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" variant="destructive" disabled={isLoadingOnPromote} onClick={() => promoteUserCancel()}>
              {t("pages.workspaces.widget.members.promote.cancel")}
            </Button>
            <Button type="submit" disabled={isLoadingOnPromote} onClick={promoteUser}>
              {t("pages.workspaces.widget.members.promote.confirm")} {isLoadingOnPromote && <ReloadIcon className="h-4 w-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};