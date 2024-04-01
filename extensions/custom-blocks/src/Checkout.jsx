import {
  Banner,
  useApi,
  useTranslate,
  useAppMetafields,
  Text,
  reactExtension,
  SkeletonTextBlock,
  Divider,
  BlockStack,
  TextBlock
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);


function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();

  const appMetafields = useAppMetafields();
  const metafield = appMetafields[0]?.metafield?.value;
  console.log('appMetafields', metafield);
  

  return (
    <BlockStack>
    <Divider />
      <Banner>
       <Text as="h2">{metafield}</Text>
      </Banner>
    </BlockStack>
  );
}