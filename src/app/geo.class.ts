export class GeoData {
    constructor(
    public name: string,
    public adminName1: string,
    public countryName: string,
    )
    {}

  }
  export class DataCity {
  dataform: [];
  
  }
  export interface IGeoResponse {
   geonames: GeoData[];
  }