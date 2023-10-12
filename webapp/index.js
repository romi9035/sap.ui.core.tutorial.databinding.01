sap.ui.require(
  [
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/XMLView",
    "sap/ui/model/BindingMode",
    "sap/ui/model/resource/ResourceModel",
  ],
  function (JSONModel, XMLView, BindingMode, ResourceModel) {
    "use strict";
    sap.ui.getCore().attachInit(function () {
      var oProductModel = new JSONModel();
      oProductModel.loadData("./model/Products.json");
      sap.ui.getCore().setModel(oProductModel, "products");
      
      var oModel = new JSONModel({
        firstName: "Harry",
        lastName: "Hawk",
        enabled: true,
        address: {
          street: "Dietmar-Hopp-Allee 16",
          city: "Walldorf",
          zip: "69190",
          country: "Germany",
        },
        salesAmount: 12345.6789,
        currencyCode: "EUR",
        priceThreshold: 20,
      });
      oModel.setDefaultBindingMode(BindingMode.TwoWay);
      sap.ui.getCore().setModel(oModel, "name");

      // Create a resource bundle for language specific texts
      // the configured supportedLocales represent the i18n files present:
      // * "" - i18n/i18n.properties
      // the configured fallbackLocale should represent one of these files
      // * "" - according to the fallback chain the root bundle is the last fallback.
      //   Configuring it explicitly avoids side effects when additional resource files are added.
      // @see https://ui5.sap.com/#/topic/ec753bc539d748f689e3ac814e129563

      var oResourceModel = new ResourceModel({
        bundleName: "sap.ui.demo.db.i18n.i18n",
        supportedLocales: ["", "de"],
        fallbackLocale: "",
      });
      sap.ui.getCore().setModel(oResourceModel, "i18n");
      // new Text({ text: "{/greetingText}" }).placeAt("content");
      var oView = new XMLView({
        viewName: "sap.ui.demo.db.view.App",
      });

      // Register the view with the message manager
      // sap.ui.getCore().getMessageManager().registerObject(oView, true);

      // Insert the view into the DOM
      oView.placeAt("content");
    });

    //   // Chain an anonymous function to the SAPUI5 'ready' Promise
    //   Core.ready().then(function () {
    //     // Create a text UI element that displays a hardcoded text string

    //   });
  }
);
