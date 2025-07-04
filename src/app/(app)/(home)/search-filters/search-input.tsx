"use client";

import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { CustomCategory } from "../types";
import { CategorySidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    disabled?: boolean;
    data: CustomCategory[]
}

export const SearchInput = ({ disabled, data }: Props) => {
    const [isSideBarOpen, setIsSidebarOpen] = useState(false);
    return (
        <>
            <div className="flex items-center gap-2 w-full">
                <CategorySidebar 
                    data={data} 
                    onOpenChange={setIsSidebarOpen}
                    open={isSideBarOpen}
                />
                <div className="relative w-full">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                    <Input 
                        className="pl-8" 
                        placeholder="Search Products" disabled={disabled}
                    />
                </div>
                {/* Add categpries view all button */}
                <Button
                    variant={"elevated"}
                    className="size-12 shrink-0 flex lg:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <ListFilterIcon />
                </Button>

                {/* Add library button */}
            </div>
        </>
    )
}