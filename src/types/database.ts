export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Tables: {
      // Generated types will land here
    }
  }
}
