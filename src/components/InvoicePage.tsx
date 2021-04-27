import React, { FC, useState, useEffect } from 'react'
import { Invoice, ProductLine, } from '../data/types'
import { initialInvoice, initialProductLine,  } from '../data/initialData'
import EditableInput from './EditableInput'
import EditableSelect from './EditableSelect'
import EditableTextarea from './EditableTextarea'
import EditableCalendarInput from './EditableCalendarInput'
import countryList from '../data/countryList'
import Document from './Document'
import Page from './Page'
import View from './View'
import Text from './Text'
import { Font } from '@react-pdf/renderer'
import Download from './DownloadPDF'
import format from 'date-fns/format'

Font.register({
  family: 'Nunito',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf' },
    { src: 'https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf', fontWeight: 600 },
  ],
})

interface Props {
  data?: Invoice
  pdfMode?: boolean
}

const InvoicePage: FC<Props> = ({ data, pdfMode }) => {
  const [invoice, setInvoice] = useState<Invoice>(data ? { ...data } : { ...initialInvoice })
  const [subTotal, setSubTotal] = useState<number>()
  const [saleTax, setSaleTax] = useState<number>()
  const [centralGST, setCentralGST] = useState<number>()
  const [stateGST, setStateGST] = useState<number>()


  const dateFormat = 'MMM dd, yyyy'
  const invoiceDate = invoice.invoiceDate !== '' ? new Date(invoice.invoiceDate) : new Date()
  const deliveryNoteDate =
    invoice.deliveryNoteDate !== ''
      ? new Date(invoice.deliveryNoteDate)
      : new Date()

  const handleChange = (name: keyof Invoice, value: string) => {
    if (name !== 'productLines') {
      const newInvoice = { ...invoice }
      newInvoice[name] = value

      setInvoice(newInvoice)
    }
  }

  const handleProductLineChange = (index: number, name: keyof ProductLine, value: string) => {
    debugger
    const productLines = invoice.productLines.map((productLine, i) => {
      if (i === index) {
        const newProductLine = { ...productLine }

        if (name === 'description') {
          newProductLine[name] = value
        } else {
          if (
            value[value.length - 1] === '.' ||
            (value[value.length - 1] === '0' && value.includes('.'))
          ) {
            newProductLine[name] = value
          } else {
            const n = parseFloat(value)

            newProductLine[name] = (n ? n : 0).toString()
          }
        }

        return newProductLine
      }

      return { ...productLine }
    })

    setInvoice({ ...invoice, productLines })
  }

  const handleRemove = (i: number) => {
    const productLines = invoice.productLines.filter((productLine, index) => index !== i)

    setInvoice({ ...invoice, productLines })
  }

  const handleAdd = () => {
    const productLines = [...invoice.productLines, { ...initialProductLine }]

    setInvoice({ ...invoice, productLines })
  }

  const calculateAmount = (quantity: string, rate: string) => {
    const quantityNumber = parseFloat(quantity)
    const rateNumber = parseFloat(rate)
    const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0

    return amount.toFixed(2)
  }

  useEffect(() => {
    let subTotal = 0

    invoice.productLines.forEach((productLine) => {
      const quantityNumber = parseFloat(productLine.quantity)
      const rateNumber = parseFloat(productLine.rate)
      const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0

      subTotal += amount
    })

    setSubTotal(subTotal)
  }, [invoice.productLines])

  useEffect(() => {
    const match = invoice.taxLabel.match(/(\d+)%/)
    const taxRate = match ? parseFloat(match[1]) : 0
    const saleTax = subTotal ? (subTotal * taxRate) / 100 : 0
    const centralGST =  subTotal ? (subTotal * 2.5) / 100 : 0
    const stateGST =  subTotal ? (subTotal * 2.5) / 100 : 0
    setSaleTax(saleTax)
    setCentralGST(centralGST)
    setStateGST(stateGST)
  }, [subTotal, invoice.taxLabel])

  return (
    <Document pdfMode={pdfMode}>
      <Page className="invoice-wrapper" pdfMode={pdfMode}>
        <div>{!pdfMode && <Download data={invoice} />}</div>
<div>
<div className="center fs-20">Tax Invoice</div>
        <View className="flex" pdfMode={pdfMode}>
          <View className="w-50" pdfMode={pdfMode}>
            <div className="borderBox">
            <EditableInput
              className="fs-15 bold"
              value={invoice.companyName="Aswathy Traders"}
              pdfMode={pdfMode}
            />
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.cityLabel}
                  onChange={(value) => handleChange('cityLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.city}
                  onChange={(value) => handleChange('city', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.gstinLabel}
                  onChange={(value) => handleChange('gstinLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.gstin}
                  onChange={(value) => handleChange('gstin', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.stateLabel}
                  onChange={(value) => handleChange('stateLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.state}
                  onChange={(value) => handleChange('state', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.codeLabel}
                  onChange={(value) => handleChange('codeLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.code}
                  onChange={(value) => handleChange('code', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.emailLabel}
                  onChange={(value) => handleChange('emailLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.email}
                  onChange={(value) => handleChange('email', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.mobileLabel}
                  onChange={(value) => handleChange('mobileLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.mobile}
                  onChange={(value) => handleChange('mobile', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            </div>
            <div className="topNoneBorder">
            <View className="w-55" pdfMode={pdfMode}>
            <EditableInput
              className="bold dark"
              value={invoice.buyer}
              pdfMode={pdfMode}
            />
            <EditableInput
              value={invoice.buyerName}
              onChange={(value) => handleChange('buyerName', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              value={invoice.buyerAddressLabel}
              onChange={(value) => handleChange('buyerAddressLabel', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              value={invoice.buyerAddress}
              onChange={(value) => handleChange('buyerAddress', value)}
              pdfMode={pdfMode}
            />
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.buyerCityLabel}
                  onChange={(value) => handleChange('buyerCityLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.buyerCity}
                  onChange={(value) => handleChange('buyerCity', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.buyergstinLabel}
                  onChange={(value) => handleChange('buyergstinLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.buyergstin}
                  onChange={(value) => handleChange('buyergstin', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.buyerStateLabel}
                  onChange={(value) => handleChange('buyerStateLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.buyerState}
                  onChange={(value) => handleChange('buyerState', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.buyerCodeLabel}
                  onChange={(value) => handleChange('buyerCodeLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.buyerCode}
                  onChange={(value) => handleChange('buyerCode', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.buyerEmailLabel}
                  onChange={(value) => handleChange('buyerEmailLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.buyerEmail}
                  onChange={(value) => handleChange('buyerEmail', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.buyerMobileLabel}
                  onChange={(value) => handleChange('buyerMobileLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.buyerMobile}
                  onChange={(value) => handleChange('buyerMobile', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
          </View>
          </div>
          </View>
          <View className="w-50" pdfMode={pdfMode}>
            <div className="leftNoneBorder">
          <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.invoiceNoLabel}
                  onChange={(value) => handleChange('invoiceNoLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.invoiceNo}
                  onChange={(value) => handleChange('invoiceNo', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.datedLabel}
                  onChange={(value) => handleChange('datedLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableCalendarInput
                  value={format(invoiceDate, dateFormat)}
                  selected={invoiceDate}
                  onChange={(date) =>
                    handleChange(
                      'invoiceDate',
                      date && !Array.isArray(date) ? format(date, dateFormat) : ''
                    )
                  }
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.deliveryNoteLabel}
                  onChange={(value) => handleChange('deliveryNoteLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.deliveryNote}
                  onChange={(value) => handleChange('deliveryNote', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.suppliersRefLabel}
                  onChange={(value) => handleChange('suppliersRefLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.suppliersRef}
                  onChange={(value) => handleChange('suppliersRef', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.buyersOrderNoLabel}
                  onChange={(value) => handleChange('buyersOrderNoLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.buyersOrderNo}
                  onChange={(value) => handleChange('buyersOrderNo', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.dispatchedDocNoLabel}
                  onChange={(value) => handleChange('dispatchedDocNoLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.dispatchedDocNo}
                  onChange={(value) => handleChange('dispatchedDocNo', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.dispatchedThroughLabel}
                  onChange={(value) => handleChange('dispatchedThroughLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.dispatchedThrough}
                  onChange={(value) => handleChange('dispatchedThrough', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.deliveryNoteDateLabel}
                  onChange={(value) => handleChange('deliveryNoteDateLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableCalendarInput
                  value={format(deliveryNoteDate, dateFormat)}
                  selected={deliveryNoteDate}
                  onChange={(date) =>
                    handleChange(
                      'deliveryNoteDate',
                      date && !Array.isArray(date) ? format(date, dateFormat) : ''
                    )
                  }
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.modeOfPaymentlabel}
                  onChange={(value) => handleChange('modeOfPaymentlabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-40" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.modeOfPayment}
                  onChange={(value) => handleChange('modeOfPayment', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.vehicleNumberLabel}
                  onChange={(value) => handleChange('vehicleNumberLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.vehicleNumber}
                  onChange={(value) => handleChange('vehicleNumber', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.destinationLabel}
                  onChange={(value) => handleChange('destinationLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.destination}
                  onChange={(value) => handleChange('destination', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            </div>
            <View className="flex rightBorder h-35" pdfMode={pdfMode}>
              <View className="w-33" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.termsOfDeliveryLabel}
                  onChange={(value) => handleChange('termsOfDeliveryLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60 " pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.termsOfDelivery}
                  onChange={(value) => handleChange('termsOfDelivery', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            </View>
        </View>
<div className="borderBox">
        <View className="bg-dark flex" pdfMode={pdfMode}>
        <View className="w-48 p-4-8" pdfMode={pdfMode}>
            <EditableInput
              className="white bold"
              value={invoice.productLineCode}
              onChange={(value) => handleChange('productLineCode', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-48 p-4-8" pdfMode={pdfMode}>
            <EditableInput
              className="white bold"
              value={invoice.productLineDescription}
              onChange={(value) => handleChange('productLineDescription', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={invoice.productLineQuantity}
              onChange={(value) => handleChange('productLineQuantity', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={invoice.productLineQuantityRate}
              onChange={(value) => handleChange('productLineQuantityRate', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={invoice.productLineTaxPercentage}
              onChange={(value) => handleChange('productLineTaxPercentage', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-18 p-4-8" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={invoice.productLineQuantityAmount}
              onChange={(value) => handleChange('productLineQuantityAmount', value)}
              pdfMode={pdfMode}
            />
          </View>
        </View>
        {invoice.productLines.map((productLine, i) => {
          return pdfMode && productLine.description === '' ? (
            <Text key={i}></Text>
          ) : (
            <View key={i} className="row flex" pdfMode={pdfMode}>
              <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
                <EditableTextarea
                  className="dark"
                  rows={2}
                  placeholder="Enter item name/description"
                  value={productLine.description}
                  onChange={(value) => handleProductLineChange(i, 'description', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                <EditableInput
                  className="dark right"
                  value={productLine.quantity}
                  onChange={(value) => handleProductLineChange(i, 'quantity', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                <EditableInput
                  className="dark right"
                  value={productLine.rate}
                  onChange={(value) => handleProductLineChange(i, 'rate', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-18 p-4-8 pb-10" pdfMode={pdfMode}>
                <Text className="dark right" pdfMode={pdfMode}>
                  {calculateAmount(productLine.quantity, productLine.rate)}
                </Text>
              </View>
              {!pdfMode && (
                <button
                  className="link row__remove"
                  aria-label="Remove Row"
                  title="Remove Row"
                  onClick={() => handleRemove(i)}
                >
                  <span className="icon icon-remove bg-red"></span>
                </button>
              )}
            </View>
          )
        })}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-50 mt-10" pdfMode={pdfMode}>
            {!pdfMode && (
              <button className="link" onClick={handleAdd}>
                <span className="icon icon-add bg-green mr-10"></span>
                Add Line Item
              </button>
            )}
          </View>
          <View className="w-50" pdfMode={pdfMode}>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-50" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.subTotalLabel}
                  onChange={(value) => handleChange('subTotalLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50" pdfMode={pdfMode}>
                <Text className="right bold dark" pdfMode={pdfMode}>
                  {subTotal?.toFixed(2)}
                </Text>
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-50" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.cgstLabel}
                  onChange={(value) => handleChange('taxLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50" pdfMode={pdfMode}>
                <Text className="right bold dark" pdfMode={pdfMode}>
                  {centralGST?.toFixed(2)}
                </Text>
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-50" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.sgstLabel}
                  onChange={(value) => handleChange('taxLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50" pdfMode={pdfMode}>
                <Text className="right bold dark" pdfMode={pdfMode}>
                  {stateGST?.toFixed(2)}
                </Text>
              </View>
            </View>
            <View className="flex bg-gray" pdfMode={pdfMode}>
              <View className="w-50" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.totalLabel}
                  onChange={(value) => handleChange('totalLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50 flex" pdfMode={pdfMode}>
                <EditableInput
                  className="dark bold right ml-30"
                  value={invoice.currency}
                  onChange={(value) => handleChange('currency', value)}
                  pdfMode={pdfMode}
                />
                <Text className="right bold dark w-auto" pdfMode={pdfMode}>
                  {(typeof subTotal !== 'undefined' && typeof centralGST !== 'undefined' && typeof stateGST !== 'undefined'
                    ? subTotal + centralGST + stateGST
                    : 0
                  ).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        </div>
        <View className="flex" pdfMode={pdfMode}>
          <View>

          <Text className=" bold " pdfMode={pdfMode}>
          {invoice.chargeableAmountLabel}
                </Text>
          <EditableTextarea
            className="w-100 bold"
            rows={2}
            value={invoice.chargeableAmount}
            onChange={(value) => handleChange('chargeableAmount', value)}
            pdfMode={pdfMode}
          />
          </View>
           <Text className="right bold dark" pdfMode={pdfMode}>
                  E & OE
                </Text>
        </View>
        <div className="h-20 flex">
          <span className="w-22">Our Bank :</span>
          <EditableTextarea
          className="h-20"
            rows={2}
            value={invoice.bankDetails}
            onChange={(value) => handleChange('chargeableAmount', value)}
            pdfMode={pdfMode}
          />
          </div>
          <div className="h-20 flex">
          <span className="w-22"> Account Number : </span>
          <EditableTextarea
          className="h-20"
            rows={2}
            value={invoice.accountNumber}
            onChange={(value) => handleChange('chargeableAmount', value)}
            pdfMode={pdfMode}
          />
          </div>
          <div className="h-20 flex">
        <span className="w-22">IFSC Code :</span>
          <EditableTextarea
          className="h-20"
            rows={2}
            value={invoice.ifscCode}
            onChange={(value) => handleChange('chargeableAmount', value)}
            pdfMode={pdfMode}
          />
          </div>
          <div className="h-20 flex">
          <div>
            Description
          <div className="w-80">We declare that this invoice shows the actual price of the good described and that all particulars are true and correct.</div>
          </div>
          <div className="right">For Aswathy Traders</div>
        </div>
        </div>
      </Page>
    </Document>
  )
}

export default InvoicePage