import {
    Box,
    Card,
    Layout,
    Link,
    List,
    Page,
    Text,
    BlockStack,
    Icon,
    Grid
} from "@shopify/polaris";
import { useNavigate } from "@remix-run/react"

const HideShipping = () => {
    const navigate = useNavigate()

    return (
        <Page>
            <ui-title-bar title="Hide Shipping Methods">
            <button variant="breadcrumb" onClick={() => navigate("/app")}>Home</button>
            <button onClick={() => navigate("/app")}>Back</button>
            </ui-title-bar>

        <Layout>
            <Layout.Section>
                <Card>
                    
                </Card>
            </Layout.Section>
        </Layout>
            
        </Page>
        );
};

export default HideShipping;