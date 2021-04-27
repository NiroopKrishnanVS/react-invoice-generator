import { ProductLine, Invoice, } from './types'

export const initialProductLine: ProductLine = {
  description: '',
  quantity: '1',
  rate: '0.00',
}
// export const intialProductList:ProductList = {
//   productCode:'BAK',
//   productName:'Baking Powder',
//   productRate:20,
//   productTaxPercentage:5,
// }
export const initialInvoice: Invoice = {
  name:'',
  title: 'INVOICE',
  companyName: 'Aswathy Traders',
  cityLabel:'City:',
  city:'Thiruvanathapuram',
  stateLabel:'State name',
  state:'Kerala',
  codeLabel:'Code:',
  code:'',
  gstinLabel:'GSTIN/UIN:',
  gstin: '',
  emailLabel:'Email:',
  email:'',
  mobileLabel:'Mobile:',
  mobile:'8015907501',
  buyer: 'Buyer:',
  buyerName: '',
  buyerAddressLabel:'Address:',
  buyerAddress: '',
  buyerCityLabel:'City:',
  buyerCity: '',
  buyergstinLabel:'GSTIN/UIN:',
  buyergstin: '',
  buyerStateLabel:'State:',
  buyerState:'',
  buyerCodeLabel:'Code:',
  buyerCode:'',
  buyerEmailLabel:'Email:',
  buyerEmail:'',
  buyerMobileLabel:'Mobile:',
  buyerMobile:'',
  invoiceNoLabel:'Invoice No:',
  invoiceNo:'',
  deliveryNoteLabel:'Delivery Note:',
  deliveryNote:'',
  suppliersRefLabel:'Suppliers Ref:',
  suppliersRef:'',
  buyersOrderNoLabel:'Buyers Order No.:',
  buyersOrderNo:'',
  dispatchedDocNoLabel:'Dispatched Document No.',
  dispatchedDocNo:'',
  dispatchedThroughLabel:'Dispatched through:',
  dispatchedThrough:'',
  termsOfDeliveryLabel:'Terms of delivery',
  termsOfDelivery:'',
  datedLabel:'Dated:',
  dated:'',
  modeOfPaymentlabel:'Mode/Terms of Payment:',
  modeOfPayment:'',
  vehicleNumberLabel:'Vehicle Number',
  vehicleNumber:'',
  invoiceDateLabel:'Date',
  invoiceDate:'',
  deliveryNoteDateLabel:'Delivery Note Date:',
  deliveryNoteDate:'',
destinationLabel:'Destination',
destination:'',
  productLineCode:'HSN/SAC',
  productLineDescription: 'Item Description',
  productLineQuantity: 'Qty',
  productLineQuantityRate: 'Rate',
  productLineTaxPercentage: 'Per',
  productLineQuantityAmount: 'Amount',
  //  productList:[
  //    {...intialProductList}
  //  ],
  productLines: [
    {
      description: 'Brochure Design',
      quantity: '2',
      rate: '100.00',
    },
    { ...initialProductLine },
    { ...initialProductLine },
  ],
  subTotalLabel: 'Sub Total',
  taxLabel: 'Sale Tax (10%)',
  cgstLabel:'CGST',
  sgstLabel:'SGST',
  totalLabel: 'TOTAL',
  currency: '₹',
  chargeableAmountLabel:'Amount Chargeable (in words)',
  chargeableAmount:'',
  bankDetails:'',
  accountNumber:'',
  ifscCode:'',
  notesLabel: 'Notes',
  notes: 'It was great doing business with you.',
  termLabel: 'Terms & Conditions',
  term: 'Please make the payment by the due date.',
}