export interface Product {
  id: number;
  name: string;
  category_id: number;
  attributes: AttributeValue[];
}

export enum AttributeType {
  Number = "number",
  Text = "text",
  Url = "url",
  Tags = "tags",
  Boolean = "boolean",
}
export interface AttributeValue {
  code: string;
  value: any;
  type: AttributeType;
}
