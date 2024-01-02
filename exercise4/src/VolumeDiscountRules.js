import React from 'react';
import {
  BlockStack, Select, TextField, Text, InlineGrid, Button, Icon, Divider, Box
} from '@shopify/polaris';
import {
  DeleteMajor
} from '@shopify/polaris-icons';
import { DiscountType } from './DiscountType';

const DiscountTypeSelectOptions = [
  DiscountType.NONE,
  DiscountType.EACH,
  DiscountType.PERCENT
]

function VolumeDiscountRules(props) {


  const handleUpdateTitle = (newValue) => {
    const updatedOption = {
      ...props.option,
      title: newValue
    };
    props.updateOption(updatedOption);
  };

  const handleUpdateSubtitle = (newValue) => {
    const updatedOption = {
      ...props.option,
      subtitle: newValue
    };
    props.updateOption(updatedOption);
  };

  const handleUpdateLabel = (newValue) => {
    const updatedOption = {
      ...props.option,
      label: newValue
    };
    props.updateOption(updatedOption);
  };

  const handleUpdateQuantity = (newValue) => {
    const updatedOption = {
      ...props.option,
      quantity: newValue
    };
    props.updateOption(updatedOption);
  }

  const handleUpdateDiscountType = (newValue) => {
    const updatedOption = {
      ...props.option,
      discountType: newValue
    };
    props.updateOption(updatedOption);
  }

  const handleUpdateAmount = (newValue) => {
    const updatedOption = {
      ...props.option,
      amount: newValue
    };
    props.updateOption(updatedOption);
  }

  function isValueRequired(content) {
    return !content;
  }
  const isTitleInvalid = isValueRequired(props.option.title);

  function isNotSatisfyRequiredNumber(content) {
    return !content || (typeof content !== 'number')
  }
  const isQuantityInvalid = isNotSatisfyRequiredNumber(props.option.quantity);
  const isAmountInvalid = isNotSatisfyRequiredNumber(props.option.amount);

  function AmountTextField() {
    if (props.option.discountType === DiscountType.NONE)
      return null;

    if (props.option.discountType === DiscountType.PERCENT)
      return <TextField label="Amount" value={props.option.amount} onChange={handleUpdateAmount} error={isAmountInvalid} />

    if (props.option.discountType === DiscountType.EACH)
      return <TextField label="Amount" value={props.option.amount} onChange={handleUpdateAmount} error={isAmountInvalid} />
  }

  return (
    <BlockStack gap="300">
      <InlineGrid columns="1fr auto">
        <Text variant="headingMd" as="h2">
          <div
            style={{
              backgroundColor: 'orange',
              color: 'white',
              width: 'fit-content'
            }}>
            OPTION {props.index + 1}
          </div>
        </Text>
        <Button
          variant="plain"
          onClick={() => props.deleteOption(props.option.id)}
          accessibilityLabel="Add variant"
        >
          <Icon
            source={DeleteMajor}
            tone="base"
          />
        </Button>
      </InlineGrid>

      <InlineGrid gap="400" columns={3}>
        <TextField label="Title" value={props.option.title} onChange={handleUpdateTitle} error={isTitleInvalid} autoComplete="off" />
        <TextField label="Subtitle" value={props.option.subtitle} onChange={handleUpdateSubtitle} autoComplete="off" />
        <TextField label="Label (optional)" value={props.option.label} onChange={handleUpdateLabel} autoComplete="off" />
      </InlineGrid>

      <InlineGrid gap="400" columns={3}>
        <TextField label="Quantity" value={props.option.quantity} onChange={handleUpdateQuantity} error={isQuantityInvalid} autoComplete="off" />
        <Select
          label="Discount Type"
          options={DiscountTypeSelectOptions}
          onChange={handleUpdateDiscountType}
          value={props.option.discountType}
        />
        {
          AmountTextField()
        }
      </InlineGrid>

      <Divider />
    </BlockStack >
  );
}

export default VolumeDiscountRules;