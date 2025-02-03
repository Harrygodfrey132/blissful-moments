export const getCroppedImg = (
  imageSrc: string,
  croppedAreaPixels: { x: number; y: number; width: number; height: number },
  zoom: number // Add zoom parameter
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Scale the cropped area based on the zoom level
      const scale = 1 / zoom; // Inverse of the zoom to scale the image down if zoom is applied
      const scaledWidth = croppedAreaPixels.width * scale;
      const scaledHeight = croppedAreaPixels.height * scale;
      const scaledX = croppedAreaPixels.x * scale;
      const scaledY = croppedAreaPixels.y * scale;

      // Set canvas size to the scaled image size
      canvas.width = scaledWidth;
      canvas.height = scaledHeight;

      ctx?.drawImage(
        image,
        scaledX,
        scaledY,
        scaledWidth,
        scaledHeight,
        0,
        0,
        scaledWidth,
        scaledHeight
      );

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create a cropped image blob."));
        }
      }, "image/jpeg");
    };

    image.onerror = (error) => reject(error);
  });
};
