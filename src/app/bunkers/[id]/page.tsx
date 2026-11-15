import { getBunkerById, mockBunkers } from "@/lib/data/bunkers";
import { getReviewsByBunkerId } from "@/lib/data/reviews";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BunkerDetailsContent } from "@/components/bunker/BunkerDetailsContent";

type Props = {
    params: Promise<{ id: string }>;
};

// Only known bunkers exist. With dynamicParams off, unknown ids get a real 404
// status; calling notFound() alone returns 200 because loading.tsx has already
// started streaming the response by the time the page resolves.
export const dynamicParams = false;

export function generateStaticParams() {
    return mockBunkers.map((bunker) => ({ id: bunker.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const bunker = getBunkerById(id);

    if (!bunker) {
        return {
            title: "Bunker Not Found",
            description: "This shelter has been destroyed or never existed.",
        };
    }

    return {
        // The root layout title template appends " | APOC-BNB".
        title: bunker.title,
        description: bunker.description,
        openGraph: {
            title: `${bunker.title} - ${bunker.price.caps} CAPS/night`,
            description: bunker.description,
            images: bunker.images[0] ? [bunker.images[0]] : [],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${bunker.title} | APOC-BNB`,
            description: bunker.description,
            images: bunker.images[0] ? [bunker.images[0]] : [],
        },
    };
}

export default async function BunkerDetailsPage({ params }: Props) {
    const { id } = await params;
    const bunker = getBunkerById(id);
    const reviews = getReviewsByBunkerId(id);

    if (!bunker) {
        notFound();
    }

    return <BunkerDetailsContent bunker={bunker} reviews={reviews} />;
}
