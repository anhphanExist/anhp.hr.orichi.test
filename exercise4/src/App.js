import {
  Page, Divider, Card, Text, FormLayout, TextField, Grid, Button, InlineGrid, Icon
} from '@shopify/polaris';
import {
  CirclePlusMajor
} from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import VolumeDiscountRules from './VolumeDiscountRules';
import PreviewTable from './PreviewTable';
import { DiscountType } from './DiscountType';

let nextOptionId = 3;
const initOptions = [
  {
    id: 1,
    title: 'single',
    subtitle: 'Standard price',
    label: '',
    quantity: 1,
    discountType: DiscountType.NONE,
    amount: 0
  },
  {
    id: 2,
    title: 'single',
    subtitle: 'Standard price',
    label: '',
    quantity: 2,
    discountType: DiscountType.PERCENT,
    amount: 10
  }
]

const initGeneral = {
  campaign: 'Volume discount #2',
  title: 'Buy more and save',
  description: ''
}

function App() {
  const [options, setOptions] = useState(initOptions);
  const [general, setGeneral] = useState(initGeneral);

  const handleAddOption = () => {
    const newOption = {
      id: nextOptionId,
      title: 'single',
      subtitle: 'Standard price',
      label: '',
      quantity: !!options && options.length > 0 ? options[options.length - 1].quantity + 1 : 1,
      discountType: DiscountType.NONE
    };
    setOptions([...options, newOption])
    nextOptionId++;
  }

  const updateOption = (updatedOption) => {
    setOptions(prevOptions =>
      prevOptions.map(x =>
        x.id === updatedOption.id ? updatedOption : x
      )
    );
  };

  const deleteOption = (id) => {
    const newListOptions = options.filter(x => x.id != id);
    setOptions(newListOptions);
  }

  const handleChangeCampaign = (value) => {
    setGeneral({...general, campaign: value})
  }

  const handleChangeTitle = (value) => {
    setGeneral({...general, title: value})
  }
  
  const handleChangeDescription = (value) => {
    setGeneral({...general, description: value})
  }

  function isValueRequired(content) {
    return !content;
  }
  const isCampaignInvalid = isValueRequired(general.campaign);

  return (
    <Page
      backAction={{ content: 'Settings', url: '#' }}
      title="Create Volume Discount"
    >
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 7, xl: 7 }}>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              General
            </Text>
            <FormLayout>
              <TextField label="Campaign" value={general.campaign} onChange={handleChangeCampaign} error={isCampaignInvalid} />
              <TextField label="Title" value={general.title} onChange={handleChangeTitle} />
              <TextField label="Description" value={general.description} onChange={handleChangeDescription} />
            </FormLayout>
          </Card>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              Volume discount rule
            </Text>
            <Divider />
            
            {options.map((x, index) =>
              <VolumeDiscountRules 
                key={x.id}
                index={index} 
                option={x} 
                deleteOption={deleteOption}
                updateOption={updateOption} />)}

              
            <Button fullWidth onClick={handleAddOption} variant="primary" tone="critical">
              <InlineGrid columns={2}><Icon source={CirclePlusMajor} />Add option</InlineGrid>
            </Button>
          </Card>
        </Grid.Cell>

        <Grid.Cell columnSpan={{ xs: 6, sm: 2, md: 2, lg: 5, xl: 5 }}>
          <Card title="Tags" sectioned>
            <Text variant="headingMd" as="h2">
              Preview
            </Text>
            <Text variant="headingMd" as="h2" alignment="center">
              {general.title}
            </Text>
            <Text variant="bodyLg" as="p" alignment="start">
              Apply for all products in store
            </Text>
            <PreviewTable options={options} />
          </Card>
        </Grid.Cell>
      </Grid>
    </Page>
  );
}

export default App;
