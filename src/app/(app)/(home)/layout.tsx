import configPromise from "@/payload.config"
import { getPayload } from "payload";

import React from "react"
import {Navbar} from "./Navbar";
import { Footer } from "./footer";
import { SearchFilters } from "./search-filters";
import {Category} from '@/payload-types'
import { CustomCategory } from "./types";

interface Props {
    children: React.ReactNode;
}

const  Layout = async ({children}: Props) => {

    const payload = await getPayload({
      config: configPromise,
    })

    const data = await payload.find({
      collection: 'categories',
      depth: 1,
      pagination: false,
      where: {
        parent: {
            exists: false
        }
      },
      sort: 'name'
    })

    const formattedData: CustomCategory[] = data.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            ...(doc as Category), 
        }))
    }))

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <SearchFilters data={formattedData} />
            <div className="flex-1 bg-[#F4F4F0]">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout