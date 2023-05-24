// import { SanityClient } from "@sanity/client";
// import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

// const client = SanityClient({
// 	projectId: "qwoxusny",
// 	dataset: "production",
// 	useCdn: true,
// 	apiVersion: "2021-10-21",
// });

// const builder = ImageUrlBuilder(client);

// export const urlFor = (source) => builder.image(source);

// export default client;

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
	projectId: "qwoxusny",
	dataset: "production",
	useCdn: true,
	apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
