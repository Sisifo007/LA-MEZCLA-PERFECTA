export async function publishToFacebook(message: string, mediaUrl?: string) {
  const token = process.env.META_ACCESS_TOKEN;
  const pageId = process.env.META_FACEBOOK_PAGE_ID;

  if (!token || !pageId) {
    throw new Error("Missing Meta Facebook config");
  }

  // If there's an image, post to photos edge. Else, post to feed edge.
  const edge = mediaUrl ? "photos" : "feed";
  const url = `https://graph.facebook.com/v19.0/${pageId}/${edge}`;

  const body: any = {
    access_token: token,
    message: message,
  };

  if (mediaUrl) {
    body.url = mediaUrl; // Facebook API uses 'url' for the photo url
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("FB Publish Error:", data);
    throw new Error(data.error?.message || "Failed to publish to Facebook");
  }

  return data; // { id: "post_id" }
}

export async function publishToInstagram(message: string, mediaUrl: string) {
  const token = process.env.META_ACCESS_TOKEN;
  const igAccountId = process.env.META_INSTAGRAM_ACCOUNT_ID;

  if (!token || !igAccountId || !mediaUrl) {
    throw new Error("Missing Meta Instagram config or mediaUrl. IG requires media.");
  }

  // 1. Create a media container
  const mediaContainerUrl = `https://graph.facebook.com/v19.0/${igAccountId}/media`;
  const containerRes = await fetch(mediaContainerUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_token: token,
      image_url: mediaUrl,
      caption: message,
    }),
  });

  const containerData = await containerRes.json();
  if (!containerRes.ok) {
    console.error("IG Container Error:", containerData);
    throw new Error(containerData.error?.message || "Failed to create IG media container");
  }

  const creationId = containerData.id;

  // 2. Publish the media container
  const publishUrl = `https://graph.facebook.com/v19.0/${igAccountId}/media_publish`;
  const publishRes = await fetch(publishUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_token: token,
      creation_id: creationId,
    }),
  });

  const publishData = await publishRes.json();
  if (!publishRes.ok) {
    console.error("IG Publish Error:", publishData);
    throw new Error(publishData.error?.message || "Failed to publish IG media");
  }

  return publishData; // { id: "media_id" }
}
