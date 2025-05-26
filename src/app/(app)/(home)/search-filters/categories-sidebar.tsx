"use client";

import { CustomCategory } from '../types';

import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';


interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: CustomCategory[]; // TODO: Remove this later
}

export const CategorySidebar = ({ open, onOpenChange, data }: Props) => {
    const router = useRouter();

    const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CustomCategory | null>(null);

    const currentCategories = parentCategories ?? data ?? [];

    const handleOpenChange = (open: boolean) => {
        setSelectedCategory(null);
        setParentCategories(null);
        onOpenChange(open);
    }

    const handleCategoryClick = (category: CustomCategory) => {
        if (category.subcategories && category.subcategories.length > 0) {
            console.log('Category clicked:', category);
            setParentCategories(category.subcategories as CustomCategory[]);
            setSelectedCategory(category);
        } else {
            if (parentCategories && selectedCategory) {
                router.push(`/${selectedCategory.slug}/${category.slug}`);
            } else {
                if (category.slug === 'all') {
                    router.push('/');
                } else {
                    router.push(`/${category.slug}`);
                }
            }
            handleOpenChange(false);
        }
    }

    const backgroundColor = selectedCategory?.color || 'white';

    const handleBaBackClick = () => {
        if (parentCategories) {
            setParentCategories(null);
            setSelectedCategory(null);
        }
    }
    
    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
           <SheetContent
            side='left'
            className='p-0 transition-none'
            style={{ backgroundColor }}
           >
            <SheetHeader className='p-4 border-b'>
                <SheetTitle>
                    Categories
                </SheetTitle>
            </SheetHeader>
            <ScrollArea className='flex flex-col overflow-y-auto h-full pb-2'>
            {parentCategories && (
                <button
                    onClick={() => handleBaBackClick()}
                    className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'
                >
                    <ChevronLeftIcon className='size-4 mr-2' />
                    Back
                </button>
            )}
            {currentCategories.map((category) => (
                <button
                    key={category.slug}
                    onClick={() => handleCategoryClick(category)}
                    className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium justify-between cursor-pointer'
                >
                    {category.name}
                    {category.subcategories && category.subcategories.length > 0 && (
                       <ChevronRightIcon className='size-4' />
                    )}
                </button>
            ))}
            </ScrollArea>
           </SheetContent>
        </Sheet>
    );
}