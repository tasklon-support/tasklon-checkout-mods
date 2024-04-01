import {
    Layout,
    Page,
    TextField,
    Button,
    Text,
    Card
} from "@shopify/polaris";
import { useNavigate, useSubmit, Form } from "@remix-run/react";
import {useState, useCallback} from 'react';
import React from 'react'
import { authenticate } from "~/shopify.server";
import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData, useActionData } from '@remix-run/react';
import { json } from "@remix-run/node";
import shopify from "app/shopify.server";
import type { ActionFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
    const { admin } = await shopify.authenticate.admin(request);
    const response = await admin.graphql(` #graphql
    query {
        shop {
            id
            name
            metafield(namespace: "checkout_ui_field", key: "info") {
                namespace
                key
                value
            }
        }
    }`);

    try {
        if(response.ok){
            const data = await response.json()

            return data;
        }

        return null
        
        
    } catch (error) {
        console.log(error);
    }
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const dynamicContent = formData.get('customContent');
    const ownerId = formData.get('ownerIdValue');

    // if (!dynamicContent) {
    //     return json({ success: false, error: 'Custom content is required' });
    // }

    // if (!ownerId) {
    //     return json({ success: false, error: 'ownerId is required' });
    // }


    const { admin } = await shopify.authenticate.admin(request);

    const response = await admin.graphql(
        `#graphql
        mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
          metafieldDefinitionCreate(definition: $definition) {
            createdDefinition {
              id
              name
            }
            userErrors {
              field
              message
              code
            }
          }
        }`,
        {
          variables: {
            "definition": {
                "name": "Checkout UI field",
                "namespace": "checkout_ui_field",
                "key": "info",
                "description": "Multiline field for output in checkout extension.",
                "type": "multi_line_text_field",
                "ownerType": "SHOP"
            }
          },
        },
      );

    const response2 = await admin.graphql(
        
        `#graphql
        mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
          metafieldsSet(metafields: $metafields) {
            metafields {
              key
              namespace
              value
              createdAt
              updatedAt
            }
            userErrors {
              field
              message
              code
            }
          }
        }`,
        {
          variables: {
            "metafields": [
              {
                "namespace": "checkout_ui_field",
                "key": "info",
                "type": "multi_line_text_field",
                "value": dynamicContent,
                "ownerId": ownerId
              }
            ]
          },
        },
      );

    try {
        if (response.ok || response2.ok ) {
            const data = await response.json();
            const data2 = await response2.json();

            return json({ success: true, data, data2, dynamicContent, ownerId });
        }

        return json({ success: false, error: response2.statusText });
    } catch (error) {
        console.log(error);
    }
}

const CustomBlocks = () => {
    const { data }: any = useLoaderData();
    console.log({data}, 'value');

    const actionData = useActionData<typeof action>();

    console.log(actionData, 'actionData');


    const navigate = useNavigate();
    const submit = useSubmit();
    
    const [blockCode, setBlockCode] = useState(data?.shop?.metafield?.value);
    const handleChange = useCallback((newBlockCode: string) => setBlockCode(newBlockCode), []);

    const ownerIdValue = data?.shop?.id;

    const saveContent = () => submit({ customContent: blockCode, ownerIdValue: ownerIdValue }, { replace: true, method: 'POST' });

    return (
        <Page>
            <ui-title-bar title="Custom Blocks">
                <button variant="breadcrumb" onClick={() => navigate("/app")}>Home</button>
                <button onClick={() => navigate("/app")}>Back</button>
            </ui-title-bar>

            <Layout>
              <Layout.Section>
                <Card>
                <form method="post">
                <TextField
                      id="customContent"
                      name="customContent"
                      label="Add custom content to checkout"
                      multiline={10}
                      autoComplete="off"
                      value={blockCode}
                      helpText={
                        <span>
                          This data will be displayed at checkout
                        </span>
                      }
                      onChange={handleChange}
                  />
                  <br/>
                  <input
                      id="ownerIdValue"
                      name="ownerIdValue"
                      autoComplete="off"
                      type='hidden'
                      value={ownerIdValue}
                  />
                  <Button submit onClick={saveContent} variant="primary">Save</Button>
                  
                </form>
                </Card>
              </Layout.Section>
                {/* <Layout.Section>
                    <Card>
                        <Text as="p">shopId: {data?.shop?.id}</Text>
                        <Text as="p">metaKey: {data?.shop?.metafield?.key}</Text>
                        <Text as="p">metaNamespace: {data?.shop?.metafield?.namespace}</Text>
                        <Text as="p">metaValue: {data?.shop?.metafield?.value}</Text>
                        <Text as="p">shopName: {data?.shop?.name}</Text>
                    </Card>
                </Layout.Section> */}
        </Layout>
            
        </Page>
        );
};

export default CustomBlocks;
