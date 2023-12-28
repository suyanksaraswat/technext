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

  interface DownloadData {
    date: string | null;
    total_records: number;
    distinct_idx_count: number;
    distinct_idx_2_count: number;
    distinct_patent_id_count: number;
    distinct_phase_count: number;
  }
}
