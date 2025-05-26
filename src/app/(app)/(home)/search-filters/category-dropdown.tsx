"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useDropDownPosition } from "./use-dropdown-position";
import { SubCategoryMenu } from "./subcategory-menu";
import { CustomCategory } from "../types";
import Link from "next/link";

interface Props {
    category: CustomCategory,
    isActive?: boolean,
    isNavigationHovered: boolean;
}

export const CategoryDropdown = ({ category, isActive, isNavigationHovered }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { getDropDownPosition } = useDropDownPosition(dropdownRef)

    const onMouseEnter = () => {
        if (category.subcategories) {
            setIsOpen(true)
        }
    }

    const onMouseLeave = (e: React.MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget as Node)) {
            setIsOpen(false)
        }
    }

    const dropdownPosition = getDropDownPosition()

    const togglDropdown = () => {
        if (category.subcategories?.length) {
            setIsOpen(prev => !prev)
        }
    }

    return (
        <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="relative">
                <Button 
                    variant={"elevated"}
                    className={cn(
                        "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
                        isActive && !isNavigationHovered && "bg-white border-primary",
                        isOpen && "bg-white border-primary"
                    )}
                    onClick={(e) => {
                        e.stopPropagation();
                        togglDropdown();
                    }}
                >
                    <Link
                        href={`/${category.slug === 'all' ? '' : category.slug}`}
                    >
                        {category.name}
                    </Link>
                </Button>
                {category.subcategories && category.subcategories.length > 0 && isOpen && (
                    <div
                        className="absolute left-1/2 top-full mt-1 -translate-x-1/2 z-50"
                        style={{
                            width: 0,
                            height: 0,
                            borderLeft: '7px solid transparent',
                            borderRight: '7px solid transparent',
                            borderBottom: '7px solid black'
                        }}
                    />
                )}
            </div>
            <SubCategoryMenu 
                category={category}
                isOpen={isOpen}
                position={dropdownPosition}
            />
        </div>
    )
}