import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema(
  {
    storeName: { type: String, required: false, unique: true },
    storeLink: { type: String, required: false, unique: true },
    name: { type: String, required: false },
    phone: { type: Number, required: false },
    email: { type: String, required: false, unique: true },
    verified: { type: Boolean, required: false, default: false },
    plan: { type: String, required: false, default: 'Basic' },
    password: { type: String, required: false },
    companyName: { type: String, required: false },
    title: { type: String, required: false },
    metatitle: { type: String, required: false },
    metadescription: { type: String, required: false },
    gst: { type: String, required: false },
    logo: { type: String, required: false },
    bio: { type: String, required: false },
    socialMediaLinks: { type: Object, required: false },
    languages: { type: Array, required: false, default: ['eng'] },
    categories: { type: Array, required: false },
    taxes: { type: Object, required: false },
    paymentProviders:
    {
      razorpay: { type: Object, required: false },
    }
    ,
    storeDetails:
    {
      storeIndustry: { type: String, required: false },
      storeAudience: { type: String, required: false },
      companyName: { type: String, required: false },
    },
    socialMediaLinks:
    {
      facebook: { type: String, required: false },
      instagram: { type: String, required: false },
      twitter: { type: String, required: false },
      github: { type: String, required: false },
    }
    ,
    checkout: 
      {
        CodAvailable: { type: Boolean, required: false, default: true },
        checkoutCustomerAccount: { type: String, required: false, default: 'required' },
        checkoutCustomerContact: { type: String, required: false, default: 'phoneEmail' },
        marketingConsent: {
          emailMarketingSubscribe: { type: Boolean, required: false, default: true },
          smsMarketingSubscribe: { type: Boolean, required: false, default: false }
        },
        formOptions: {
          firstName: { type: String, required: false, default: 'required' },
          lastName: { type: String, required: false, default: 'hidden' },
          companyName: { type: String, required: false, default: 'hidden' },
          addressLine2: { type: String, required: false, default: 'hidden' },
          shippingAddressPhone: { type: String, required: false, default: 'hidden' },
        },
      }
    ,
    address: {
      addressLine1: { type: String, required: false },
      addressLine2: { type: String, required: false },
      city: { type: String, required: false },
      country: { type: String, required: false },
      state: { type: String, required: false },
      pinCode: { type: Number, required: false },
    },
    taxes: {
      allPricesIncludeTaxes: { type: Boolean, required: false, default: false },
      shippingRatesTax: { type: Boolean, required: false, default: false },
      digitalProductVAT: { type: Boolean, required: false, default: false },
    },
    checkout: {
      customerAccounts: { type: String, required: false, default: 'disabled' },
      formOptionFullName: { type: Boolean, required: false, default: true },
      formOptionCompanyName: { type: String, required: false, default: 'optional' },
      formOptionAddressLine2: { type: String, required: false, default: 'optional' },
      formOptionShippingAddressPhone: { type: String, required: false, default: 'optional' },
    },
    policies: {
      RefundPolicyHtml: { type: String, required: false, default: false },
      PrivacyPolicyHtml: { type: String, required: false, default: false },
      ShippingPolicyHtml: { type: String, required: false, default: false },
      TermsOfServiceHtml: { type: String, required: false, default: false },
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.models.Store || mongoose.model('Store', storeSchema, "stores");
export default Store;
