import { useState, ChangeEvent } from 'react';

export const usePreviewImgInput = (onReset: () => void) => {
  const [previewPath, setPreviewPath] = useState<string>();
  const handleImgInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList?.length) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        if (readerEvent.target && readerEvent.target.result)
          setPreviewPath(readerEvent.target.result.toString());
      };
      reader.readAsDataURL(fileList[0]);
    }
  };

  const handleCancelButtonClick = () => {
    setPreviewPath('');
    onReset();
  };

  return {
    previewPath,
    handleImgInputChange,
    handleCancelButtonClick,
  } as const;
};
