export interface Product {
  id: number;
  name: string;
  category_id: number;
  attributes: AttributeValue[];
}

export interface AttributeValue {
  code: string;
  value: any;
}
