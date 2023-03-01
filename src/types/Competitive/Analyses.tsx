export interface IFormatAnalyses {
  [key: string]: IFormatAnalysesSetsObject;
}

export interface IFormatAnalysesSetsObject {
  [key: string]: IFormatAnalysesSets;
}

export interface IFormatAnalysesSets {
  sets: IFormatsAnalysesSetName[];
}

export interface IFormatsAnalysesSetName {
  name: string;
  description?: string;
}
