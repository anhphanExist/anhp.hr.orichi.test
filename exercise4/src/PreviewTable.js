import {Page, Card, DataTable} from '@shopify/polaris';
import React from 'react';
import { DiscountType } from './DiscountType';

function PreviewTable(props) {

  const transformPostFixOfAmount = (discountType, amount) => {
    if (discountType === DiscountType.NONE)
      return null;

    if (discountType === DiscountType.PERCENT)
      return amount + '%';

    if (discountType === DiscountType.EACH)
      return amount + '$';
  }
  
  let rows = props.options.map((x, index) => ([
    x.title,
    x.discountType,
    x.quantity,
    transformPostFixOfAmount(x.discountType, x.amount)
  ]));

  return (
      <Card>
        <DataTable
          columnContentTypes={[
            'text',
            'text',
            'numeric',
            'text',
          ]}
          headings={[
            'Title',
            'Discount Type',
            'Quantity',
            'Amount',
          ]}
          rows={rows}
        />
      </Card>
  );
}

export default PreviewTable;