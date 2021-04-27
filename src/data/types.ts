import { CSSProperties } from 'react'

export interface ProductLine {
  description: string
  quantity: string
  rate: string
}
// export interface ProductList{
//   productCode:string;
//   productName:string;
//   productRate:number;
//   productTaxPercentage:number;
// }
export interface Invoice {
  
  title: string
  companyName: string
  name: string
  cityLabel:string,
  city:string,
  codeLabel:string,
  code:string,
  gstinLabel:string,
  gstin: string,
  stateLabel:string,
  state:string,
  emailLabel:string,
  email:string,
  mobileLabel:string,
  mobile:string,

  buyer: string,
  buyerName:string,
  buyerAddressLabel:string,
  buyerAddress: string,
  buyerCityLabel:string,
  buyerCity:string,
  buyergstinLabel:string,
  buyergstin: string,
  buyerStateLabel:string,
  buyerState:string,
  buyerCodeLabel:string,
  buyerCode:string,
  buyerEmailLabel:string,
  buyerEmail:string,
  buyerMobileLabel:string,
  buyerMobile:string,

  invoiceNoLabel:string,
  invoiceNo:string,
  deliveryNoteLabel:string,
  deliveryNote:string,
  suppliersRefLabel:string,
  suppliersRef:string,
  buyersOrderNoLabel:string,
  buyersOrderNo:string,
  dispatchedDocNoLabel:string,
  dispatchedDocNo:string,
  dispatchedThroughLabel:string,
  dispatchedThrough:string,
  termsOfDeliveryLabel:string,
  termsOfDelivery:string,
  datedLabel:string,
  dated:string,
  modeOfPaymentlabel:string,
  modeOfPayment:string,
  vehicleNumberLabel:string,
  vehicleNumber:string,
  invoiceDateLabel:string,
  invoiceDate:string,
  deliveryNoteDateLabel:string,
  deliveryNoteDate:string,
  destinationLabel:string,
  destination:string,
  productLineCode:string,
  productLineDescription: string
  productLineQuantity: string
  productLineQuantityRate: string
  productLineTaxPercentage:string
  productLineQuantityAmount: string
  // productList: ProductList[]
  productLines: ProductLine[]

  subTotalLabel: string
  taxLabel: string
  cgstLabel:string
  sgstLabel:string
  totalLabel: string
  currency: string

  chargeableAmountLabel:string
  chargeableAmount:string

  bankDetails:string
  accountNumber:string
  ifscCode:string

  notesLabel: string
  notes: string
  termLabel: string
  term: string
}

export interface CSSClasses {
  [key: string]: CSSProperties
}