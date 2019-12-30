import minimist from 'minimist';
import {ParsedArgs} from 'minimist';

export type Args = { baseApi: string, filePath: string, localCacheDir: string }

const argv = process.argv.slice(2);

const cliArgs = minimist<ParsedArgs & Args>(argv, {
  string: ['filePath', 'baseApi', 'localCacheDir'],
  unknown: () => true,
});

export default cliArgs;
