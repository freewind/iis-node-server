export const entireFileMd5 = 'entire-file-md5.';

export function isEntireFileMd5File(fileName: string): boolean {
  return fileName.startsWith(entireFileMd5);
}

export function findEntireFileMd5(fileNames: string[]): string | undefined {
  const entireFile = fileNames.find(it => isEntireFileMd5File(it));
  if (entireFile) {
    return entireFile.split('.')[1];
  } else {
    return undefined;
  }
}

export function buildEntireFileMd5FileName(md5: string): string {
  return entireFileMd5 + md5;
}
