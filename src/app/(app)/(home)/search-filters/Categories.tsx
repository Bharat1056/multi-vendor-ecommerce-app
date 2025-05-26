"use client";

import { CategoryDropdown } from "./category-dropdown";
import { CustomCategory } from "../types";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import { CategorySidebar } from "./categories-sidebar";

interface Props {
    data: CustomCategory[];
}

export const Categories = ({ data }: Props) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const viewAllRef = useRef<HTMLDivElement>(null);

    const [visibleCount, setVisibleCount] = useState(data.length);
    const [isAnyHovered, setIsAnyHovered] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    

    useEffect(() => {
          const calculateVisible = () => {
            if (!containerRef.current || !measureRef.current || !viewAllRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const viewAllWidth = viewAllRef.current.offsetWidth;
            const availableWidth = containerWidth - viewAllWidth;

            const items = Array.from(measureRef.current.children);
            let totalWidth = 0;
            let visible = 0;

            for (const item of items) {
                totalWidth += item.getBoundingClientRect().width;
                if (totalWidth <= availableWidth) {
                    visible++;
                } else {
                    break;
                }
            }
            setVisibleCount(visible);
          }

          const resizeObserver = new ResizeObserver(calculateVisible);
          resizeObserver.observe(containerRef.current!);

          return () => resizeObserver.disconnect();
    }, [data.length])


    return (
        <div className="relative w-full"> 

        {/* Sidebar */}
        <CategorySidebar 
            open={isSidebarOpen}
            onOpenChange={setIsSidebarOpen}
            data={data}
        />

        {/* Hidden Element */}
            <div 
                ref={measureRef}
                className="absolute opacity-0 pointer-events-none flex"
                style={{ position: 'fixed', top: -9999, left: -9999 }}
                >
                {data.map((category) => (
                    <div key={category.id}>
                        <CategoryDropdown
                            category={category}
                            isActive={false}
                            isNavigationHovered={false}
                            />
                    </div>
                ))}
            </div>
            
        {/* Showing Element */}
            <div 
                ref={containerRef}
                onMouseEnter={() => setIsAnyHovered(true)}
                onMouseLeave={() => setIsAnyHovered(false)}
                className="flex flex-nowrap items-center"
            >
                {data.slice(0, visibleCount).map((category) => (
                    <div key={category.id}>
                        <CategoryDropdown
                            category={category}
                            isActive={false}
                            isNavigationHovered={isAnyHovered}
                        />
                    </div>
                ))}

                <div ref={viewAllRef} className="shrink-0">
                    <Button
                        className={cn(
                            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
                            !isAnyHovered && "bg-white border-primary",
                        )}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        View All
                        <ListFilterIcon className="ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}