export interface bookType {
    id: number,
    title: string,
    author: string,
    price: number,
    description: string,
    images: {
        jpeg: string,
        avif: string,
        webp: string
    }
}

export interface cart {
    id: number,
    title: string,
    author: string,
    price: number,
    count: number,
    description: string,
    images: {
        jpeg: string,
        avif: string,
        webp: string
    }
}
export interface promotions {
    id: number,
    type: string,
    name: string,
    targetIds: number[],
    discounts: string[]
}