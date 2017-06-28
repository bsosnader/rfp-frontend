// rfp.interface.ts

export interface rfpDocument {
  companyDoc: File;
  filename: string;
  timestamp: number;
  useHighlighting: boolean;
  companyName: string;
  date: string;
  companyType: string;
  service: string;
  additionalTags: Tag[]; //multiple tags possible

}

export interface Tag {
  key: string;
  value: string;
}
