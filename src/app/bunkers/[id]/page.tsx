import { getBunkerById } from "@/lib/data/bunkers";
import { getReviewsByBunkerId } from "@/lib/data/reviews";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BunkerDetailsContent } from "@/components/bunker/BunkerDetailsContent";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const bunker = getBunkerById(id);

    if (!bunker) {
        // Throwing here (not only in the page) makes the response status 404
        // even when loading.tsx has already started streaming a 200.
        notFound();
    }

    return {
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
            title: bunker.title,
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
