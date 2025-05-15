import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
    slug: "categories",
    access: {
        create: () => false,
        update: () => false
    },
    fields: [
        {
            name: "category-name",
            type: "text",
            required: true
        }
    ]
}