export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  interface Patent {
    id: number;
    idx: number;
    idx_2: number;
    patent_id: number;
    patent_text: string;
    phase: string;
    date: string;
  }
}
