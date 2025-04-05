export interface ColorSegment {
  id: string;
  color: string;
  title: string;
}

export interface SegmentSet {
  id: string;
  name: string;
  segments: ColorSegment[];
}

export interface ExportOptions {
  width: number;
  height: number;
  orientation: 'horizontal' | 'vertical';
  showTitles: boolean;
}
