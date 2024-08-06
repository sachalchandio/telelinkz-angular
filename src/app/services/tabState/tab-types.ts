export interface Tab {
  title: string;
  route: string;
  queryParams?: { [key: string]: any };
}
