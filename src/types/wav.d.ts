declare module 'wav' {
  import { Writable, Readable } from 'stream';

  export class Writer extends Writable {
    constructor(options?: WriterOptions);
  }

  export class Reader extends Readable {
    constructor(options?: ReaderOptions);
    on(event: 'format', listener: (format: Format) => void): this;
    on(event: string, listener: (...args: any[]) => void): this;
  }

  export interface Format {
    audioFormat: number;
    channels: number;
    sampleRate: number;
    byteRate: number;
    blockAlign: number;
    bitDepth: number;
  }

  export interface WriterOptions {
    format?: string;
    channels?: number;
    sampleRate?: number;
    bitDepth?: number;
  }

  export interface ReaderOptions {
    // There are no specific options for the reader in the type definition
  }
}
