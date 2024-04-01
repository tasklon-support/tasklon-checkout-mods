import { Box, Button, Card, Layout, Page, Text, Grid, Icon, Link, InlineStack } from "@shopify/polaris";
import { PlusCircleIcon, QuestionCircleIcon } from '@shopify/polaris-icons';
import { Row } from "@shopify/polaris/build/ts/src/components/IndexTable";
import React from "react";

type Props = {};

const Index = (props: Props) => {
  return (
    <Page>
      <ui-title-bar title="Checkout Extensions"></ui-title-bar>
      <Layout>
        <Layout.Section>
        <Card>
          <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
              <Link monochrome url="/app/custom-blocks" removeUnderline>
                <Card>
                <Text variant="headingLg" as="h5">Custom Blocks</Text>
                <Text variant="bodyMd" as="p">Add a custom block to the checkout</Text>
                </Card>
              </Link>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
              <Link monochrome url="/app/hide-shipping" removeUnderline>
                <Card>
                <Text variant="headingLg" as="h5">Hide Shipping Methods</Text>
                <Text variant="bodyMd" as="p">Hide shipping methods in the checkout</Text>
                </Card>
              </Link>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
              <Link monochrome url="/app/hide-payment" removeUnderline>
                <Card>
                <Text variant="headingLg" as="h5">Hide Payment Methods</Text>
                <Text variant="bodyMd" as="p">Hide payment methods in the checkout</Text>
                </Card>
              </Link>
            </Grid.Cell>
          </Grid>
        </Card>
        </Layout.Section>
        <Layout.Section>
        <Card>
          
          
          <Text as="h2" variant="bodyMd">Contact us if you have any questions.</Text>
          {/* <Icon source={QuestionCircleIcon} tone="base"/> */}
          
          
          <br/>
          <Link url="https://tasklon.com/" target="_blank" removeUnderline><Button variant="primary">Contact Us</Button></Link>
        </Card>
        <br/>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Index;