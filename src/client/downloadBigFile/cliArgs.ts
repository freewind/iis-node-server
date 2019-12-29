import minimist from 'minimist';
import {ParsedArgs} from 'minimist';

export type Args = { host: string, filePath: string, localCacheDir: string }

const argv = process.argv.slice(2);

const cliArgs = minimist<ParsedArgs & Args>(argv, {
  string: ['filePath', 'host', 'localCacheDir'],
  unknown: () => true,
});

export default cliArgs;
