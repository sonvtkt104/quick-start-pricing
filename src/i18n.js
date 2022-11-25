import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import { getCookie } from "./helper";
// const english = require("./languages/en.json");
// const vi = require("./languages/vi.json");
// const chinese = require("./languages/zh-CN.json");
// const chineseFull = require("./languages/zh-TW.json");
// const french = require("./languages/fr.json");
// const german = require("./languages/de.json");
// const spanish = require("./languages/es.json");
// const japanish = require("./languages/ja.json");
// const cs1 = require("./languages/cs.json");
// const da1 = require("./languages/da.json");
// const it1 = require("./languages/it.json");
// const nl1 = require("./languages/nl.json");
// const no1 = require("./languages/no.json");
// const pl1 = require("./languages/pl.json");
// const ru1 = require("./languages/ru.json");
// const pt1 = require("./languages/pt.json");
// const fi1 = require("./languages/fi.json");
// const sv1 = require("./languages/sv.json");
// const tr1 = require("./languages/tr.json");
// const th1 = require("./languages/th.json");
// const ko1 = require("./languages/ko.json");



i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // resources,
        // lng: lan,

        // keySeparator: false, // we do not use keys in form messages.welcome

        // interpolation: {
        //     escapeValue: false, // react already safes from xss
        // },
    });

const t = i18n.t.bind(i18n);
export { t };
export default i18n;
