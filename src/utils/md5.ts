import md5File from 'md5-file';

export function md5OfFile(filePath: string): string {
  return md5File.sync(filePath);
}
