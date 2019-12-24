IIS Node Server
===============

Run on windows, then config IIS have reverse proxy to it.

Then use '/upload' with data:

```
{
  fileName: string;
  fileContent: string;
  targetPath: string;
  forceOverride: boolean;
}
```

to upload some file to server.

Notice:

Should run `cmd` or other console as Administrator, then start this server by:

```
npm install
npm start
```
