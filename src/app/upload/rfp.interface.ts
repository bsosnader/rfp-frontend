// rfp.interface.ts

export interface rfpDocument {
  companyName: string;
  dateSubmitted: string;
  companyType: string;
  service: string;
  additionalTags: Tag[]; //multiple tags possible

}

export interface Tag {
  key: string;
  value: string;
}
