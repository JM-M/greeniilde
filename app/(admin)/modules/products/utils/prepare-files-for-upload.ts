/**
 * Prepare blob URLs for upload by converting them to File objects
 */
export const prepareFilesForUpload = async (mediaUrls: string[]) => {
  const filesToUpload: File[] = [];
  const blobIndices: number[] = [];

  for (let i = 0; i < mediaUrls.length; i++) {
    const url = mediaUrls[i];
    if (url.startsWith("blob:")) {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File(
        [blob],
        `image-${Date.now()}-${i}.${blob.type.split("/")[1]}`,
        {
          type: blob.type,
        },
      );
      filesToUpload.push(file);
      blobIndices.push(i);
    }
  }

  return { filesToUpload, blobIndices };
};
