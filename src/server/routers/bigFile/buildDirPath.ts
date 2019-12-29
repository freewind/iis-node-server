import path from 'path';

export default function buildDirPath(filePath: string): string {
  const fileName = path.basename(filePath)
  const dirName = `${fileName}.__splitSmallFiles__`;
  return path.resolve(path.dirname(filePath), dirName);
}
