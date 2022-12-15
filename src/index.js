import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppProvider } from "@shopify/polaris";
import { Link } from 'react-router-dom';
import {
  Provider as ShopifyProvider,
} from "@shopify/app-bridge-react";

const shop_name = window.document.getElementsByTagName("meta")["shop-name"].getAttribute("content")
const domain = window.document.getElementsByTagName("meta")["domain"].getAttribute("content")
const api_key = window.document.getElementsByTagName("meta")["api-key"].getAttribute("content")

const host = window.btoa(domain + "/admin");

const config = {
  apiKey: api_key,
  shopOrigin: shop_name + ".myshopify.com",
  host: host,
  forceRedirect: false,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider linkComponent={Link}>
      <ShopifyProvider config={config}>
        <App />
      </ShopifyProvider>
    </AppProvider>
  </React.StrictMode>
);

