// redirect user from alias to their url

import { redirect } from "next/navigation";
import getCollection, { LINKS_COLLECTION } from "@/db";

// params object
type AliasParamsPromise = Promise<{ alias: string }>;

// for new link
type LinkDoc = {
  alias: string;
  url: string;
  createdAt?: Date;
};

export default async function AliasRedirectPage({params,}: {params: AliasParamsPromise;}) {

  const { alias } = await params;
  const collection = await getCollection(LINKS_COLLECTION);
  const link = await collection.findOne<LinkDoc>({ alias });

// if link doesn't exist then stay
  if (!link || !link.url) {
    redirect("/");
  }

// decide to either do http or https depending on original url
  const targetLink = link.url.startsWith("http://") || link.url.startsWith("https://") ? link.url : `https://${link.url}`;

  redirect(targetLink);
}