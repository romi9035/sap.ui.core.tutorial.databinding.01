sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/core/Messaging",
    "sap/m/library",
    "sap/ui/core/Locale",
    "sap/ui/core/LocaleData",
    "sap/ui/model/type/Currency",
  ],
  function (Controller, mobileLibrary, Messaging) {
    "use strict";

    return Controller.extend("sap.ui.demo.db.controller.App", {
      onInit: function () {
        var oView;

        oView = this.getView();

        // set message model
        oView.setModel(Messaging.getMessageModel(), "message");

        // or just do it for the whole view
        Messaging.registerObject(oView, true);
      },

      formatMail: function (sFirstName, sLastName) {
        var oBundle = this.getView().getModel("i18n").getResourceBundle();
        return mobileLibrary.URLHelper.normalizeEmail(
          sFirstName + "." + sLastName + "@example.com",
          oBundle.getText("mailSubject", [sFirstName]),
          oBundle.getText("mailBody")
        );
      },
      formatStockValue: function (fUnitPrice, iStockLevel, sCurrCode) {
        var sBrowserLocale = sap.ui.getCore().getConfiguration().getLanguage();
        var oLocale = new Locale(sBrowserLocale);
        var oLocaleData = new LocaleData(oLocale);
        var oCurrency = new Currency(oLocaleData.mData.currencyFormat);
        return oCurrency.formatValue(
          [fUnitPrice * iStockLevel, sCurrCode],
          "string"
        );
      },
    });
  }
);
