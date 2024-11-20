import { items } from '$lib/data/projects';

export const prerender = false; // Don't attempt to prerender dynamic routes 

export function load({ params }: { params: Record<string, string> }) {
	if (params.slug) {
		const project = items.find((item) => {
			return item.slug === params.slug;
		});

		return { project };
	}
}
