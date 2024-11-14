"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Post } from "@/store/client/interface/post";
import Link from "next/link";
import { TwitterImage } from "./TwitterImage";
import { TwitterWidget } from "./TwitterWidget";

interface TwitterChildProps {
  post: Post;
}

export const TwitterChild: React.FC<TwitterChildProps> = ({ post }) => {
  return (
    <Card className="bg-white border-t-0 border-gray-200 w-[540px] pt-4 pr-4 pl-4 rounded-sm shadow-none">
      <div className="flex group">
        <Link href={post.socialAccount.url ?? "/"} target="_blank" rel="noopener noreferrer" className="w-[40px] h-auto flex flex-col">
          <Avatar>
            <AvatarImage src={post.socialAccount.avatarUrl ?? "https://avatar.vercel.sh/rauchg.png"} />
          </Avatar>
          <div className="w-[0.1px] bg-gray-300 h-full left-1/2 relative transform -translate-x-1/2 my-2"></div>
        </Link>

        <div className="flex-1 pl-[10px]">
          <div className="text-sm font-medium leading-none flex">
            <Link href={post.socialAccount.url ?? "/"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <span className="group-hover:underline">{post.socialAccount.name}</span>
              {post.socialAccount.isVerified && (
                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                </svg>
              )}
              <span className="text-sm text-muted-foreground">@{post.socialAccount.username}</span>
            </Link>
          </div>
          <div className="pt-1   text-sm font-normal font-sans text-slate-600">
            <div>{post.body}</div>
            <TwitterImage images={post.pictures} />
            <TwitterWidget border="" />
          </div>
        </div>
      </div>
    </Card>
  );
};
