"use client";

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const items = [
  {
    name: "Project Management & Task Tracking",
    url: "#",
    emoji: "📊",
  },
  {
    name: "Family Recipe Collection & Meal Planning",
    url: "#",
    emoji: "🍳",
  },
  {
    name: "Fitness Tracker & Workout Routines",
    url: "#",
    emoji: "💪",
  },
  {
    name: "Book Notes & Reading List",
    url: "#",
    emoji: "📚",
  },
  {
    name: "Sustainable Gardening Tips & Plant Care",
    url: "#",
    emoji: "🌱",
  },
  {
    name: "Language Learning Progress & Resources",
    url: "#",
    emoji: "🗣️",
  },
  {
    name: "Home Renovation Ideas & Budget Tracker",
    url: "#",
    emoji: "🏠",
  },
  {
    name: "Personal Finance & Investment Portfolio",
    url: "#",
    emoji: "💰",
  },
  {
    name: "Movie & TV Show Watchlist with Reviews",
    url: "#",
    emoji: "🎬",
  },
  {
    name: "Daily Habit Tracker & Goal Setting",
    url: "#",
    emoji: "✅",
  },
];

export function SidebarRecents() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Recents</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={crypto.randomUUID()} className="hover:bg-gray-100">
            <SidebarMenuButton asChild>
              <a href={item.url} title={item.name}>
                <span>{item.emoji}</span>
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
