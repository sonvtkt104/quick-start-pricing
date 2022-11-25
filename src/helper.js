import axios from "axios";
import * as historyBrowser from "history";
import { notification, Modal, Input } from "antd";
// import Cookies from "js-cookie";
import React from "react";
// import i18n from "./i18n";
import ReactGA from "react-ga";
// import Pusher from "pusher-js";
// import { SBButton } from "./components/UiV2";
// import { Redirect } from "react-router-dom";
// import { withTranslation, Trans } from "react-i18next";
// import { getSessionToken } from "@shopify/app-bridge-utils";
// import { createApp } from "@shopify/app-bridge";
// import { Redirect as ShopifyRedirect } from "@shopify/app-bridge/actions";

const app = null
const $crisp = null;



const setLanguage = (language) => {
    let url = "api/save-setting";
    let parameters = {
        key: "language",
        value: language,
    };
    let response = api("GET", url, null, parameters);
}

const openMessage = async (isOpen = false, msg = null, isSent = false) => {
    if (isOpen) {
        try {
            
                $crisp.push(["do", "chat:open"]);
            
        } catch (e) {
            console.log(e);
        }
    }

    if (msg) {
        try {
            
                if (isSent == 1) {
                    isSent = "send";
                }
                if (isSent) {
                    $crisp.push(["do", "message:" + isSent, ["text", msg]]);
                } else {
                    $crisp.push(["set", "message:text", [msg]]);
                }
            
        } catch (e) {
            console.log(e);
        }
    }
};

const redirectApp = (url) => {
    // var r = ShopifyRedirect.create(appShopify());
    // r.dispatch(ShopifyRedirect.Action.APP, url);
};

const redirect = (url) => {
    window.top.location.replace(url)
 };

const { TextArea } = Input;
let openNotification = (type, message, description, duration = 10) => {
    notification.destroy();
    notification[type]({
        message: message,
        description: description,
        duration: duration,
    });
};

let redirectTo = (url) => {
    // return <Redirect to={url} />;
};

let dynamicSortStr = (property) => {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result =
            a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    };
};

let dynamicSortTime = (property) => {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */

        var d1 = new Date(a[property]);
        var d2 = new Date(b[property]);
        var result = d1 < d2 ? -1 : d1 > d2 ? 1 : 0;
        return result * sortOrder;
    };
};

function isMobile() {
    var check = false;
    (function (a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

let setCustomerIO = (att) => {
    api("POST", "/api/set-customerio", {
        tag: att,
    });
};

let changePlan = async (planId, trialDays = 0) => {
    var token = await getSessionTokenSB();
    axios.defaults.headers.common = {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": app.csrfToken,
        Authorization: token,
    };
    let data = {
        planId: planId,
        referrer: document.referrer,
    };

    if (trialDays) {
        data["trialDays"] = trialDays;
    }

    // axios
    //     .post(app.baseUrl + "/api/update_subscription", data)
    //     .then((response) => {
    //         if (response.data.chargeUrl) {
    //             if (response.data.type == "app") {
    //                 redirectApp("/home");
    //             } else {
    //                 redirect(response.data.chargeUrl);
    //             }
    //         }
    //         return;
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
};

const getDateString = (date, format) => {
    if (!date || !format) return 0;
    var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        getPaddedComp = function (comp) {
            return parseInt(comp) < 10 ? "0" + comp : comp;
        },
        formattedDate = format,
        o = {
            "y+": date.getFullYear(), // year
            "M+": months[date.getMonth()], //month
            "d+": getPaddedComp(date.getDate()), //day
            "h+": getPaddedComp(
                date.getHours() > 12 ? date.getHours() % 12 : date.getHours()
            ), //hour
            "m+": getPaddedComp(date.getMinutes()), //minute
            "s+": getPaddedComp(date.getSeconds()), //second
            "S+": getPaddedComp(date.getMilliseconds()), //millisecond,
            "t+": date.getHours() >= 12 ? "PM" : "AM",
        };

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            formattedDate = formattedDate.replace(RegExp.$1, o[k]);
        }
    }
    return formattedDate;
};

const getDateStringNumber = (date, format) => {
    if (!date || !format) return 0;
    var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        getPaddedComp = function (comp) {
            return parseInt(comp) < 10 ? "0" + comp : comp;
        },
        formattedDate = format,
        o = {
            "y+": date.getFullYear(), // year
            "M+": months[date.getMonth()], //month
            "d+": getPaddedComp(date.getDate()), //day
            "h+": getPaddedComp(
                date.getHours() > 12 ? date.getHours() % 12 : date.getHours()
            ), //hour
            "m+": getPaddedComp(date.getMinutes()), //minute
            "s+": getPaddedComp(date.getSeconds()), //second
            "S+": getPaddedComp(date.getMilliseconds()), //millisecond,
            "t+": date.getHours() >= 12 ? "PM" : "AM",
        };

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            formattedDate = formattedDate.replace(RegExp.$1, o[k]);
        }
    }
    return formattedDate;
};

const activitiesLog = (page) => {
    api("POST", "/api/set-activities-log", {
        page: page,
    });
    var time = new Date();
    // followFrom(
    //     "Shop Activities",
    //     "Get Page",
    //     app.shopName,
    //     time.toTimeString()
    // );
};

let isTestPlan = () => {
    if (
        ["affiliate", "partner_test", "staff_business"].includes(app.shopPlan)
    ) {
        return 1;
    } else {
        return 0;
    }
};

let isAdminShop = () => {
    if (app.appEnv != "production") return 1;
    var admins = app.adminShop.split(",");
    if (admins.includes(app.shopName)) return 1;
    return 0;
};

let GAInit = () => {
    // try {
    //     if (isTestPlan() && !isAdminShop()) {
    //         return 1;
    //     }

    //     var location = `${window.location.origin}${window.location.pathname}${window.location.search}`;
    //     ReactGA.initialize(
    //         [
    //             {
    //                 trackingId: app.gaID,
    //                 gaOptions: {
    //                     name: "tracker1",
    //                     cookieDomain: "auto",
    //                     // storage: 'none',
    //                 },
    //             },
    //             {
    //                 trackingId: app.gaIDFree,
    //                 gaOptions: {
    //                     name: "trackerFree",
    //                     cookieDomain: "auto",
    //                     // storage: 'none',
    //                 },
    //             },
    //             {
    //                 trackingId: app.gaIDChargePro,
    //                 gaOptions: {
    //                     name: "trackerChargePro",
    //                     cookieDomain: "auto",
    //                     // storage: 'none',
    //                 },
    //             },
    //             {
    //                 trackingId: app.gaIDChargeUnlimited,
    //                 gaOptions: {
    //                     name: "trackerChargeUnlimited",
    //                     cookieDomain: "auto",
    //                     // storage: 'none',
    //                 },
    //             },
    //         ],
    //         { debug: false, alwaysSendToDefaultTracker: false }
    //     );

    //     ReactGA.ga("create", app.gaID, "auto", {
    //         cookieFlags: "SameSite=None; Secure",
    //     });
    //     ReactGA.ga("create", app.gaIDFree, "auto", {
    //         cookieFlags: "SameSite=None; Secure",
    //     });
    //     ReactGA.ga("create", app.gaIDChargePro, "auto", {
    //         cookieFlags: "SameSite=None; Secure",
    //     });
    //     ReactGA.ga("create", app.gaIDChargeUnlimited, "auto", {
    //         cookieFlags: "SameSite=None; Secure",
    //     });

    //     if (app.isCharge) {
    //         if (app.planType == "pro") {
    //             ReactGA.pageview(window.location.pathname, [
    //                 "tracker1",
    //                 "trackerChargePro",
    //             ]);
    //             ReactGA.set({ page: window.location.pathname }, [
    //                 "tracker1",
    //                 "trackerChargePro",
    //             ]);
    //         } else {
    //             ReactGA.pageview(window.location.pathname, [
    //                 "tracker1",
    //                 "trackerChargeUnlimited",
    //             ]);
    //             ReactGA.set({ page: window.location.pathname }, [
    //                 "tracker1",
    //                 "trackerChargeUnlimited",
    //             ]);
    //         }
    //     } else {
    //         ReactGA.pageview(window.location.pathname, [
    //             "tracker1",
    //             "trackerFree",
    //         ]);
    //         ReactGA.set({ page: window.location.pathname }, [
    //             "tracker1",
    //             "trackerFree",
    //         ]);
    //     }
    //     // ReactGA.pageview(window.location.pathname, ["tracker1"]);
    //     // ReactGA.pageview(window.location.pathname, ["trackerFree"]);
    //     // ReactGA.pageview(window.location.pathname, ["trackerCharge"]);
    //     activitiesLog(window.location.pathname);
    // } catch (error) {
    //     console.log(error);
    // }
};

let pusherInit = () => {
    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;

    // var pusher = new Pusher(app.pusherKey, {
    //     cluster: app.pusherCluster,
    //     encrypted: true,
    // });

    // var channel = pusher.subscribe("job-done");

    // channel.bind("job-status-done", function (data) {
    //     alert(JSON.stringify(data));
    // });
};

const openInNewTab = (url) => {
    let popUp = window.open(url, "_blank");
    if (popUp == null || typeof popUp == "undefined") {
        alert("Please disable your pop-up blocker and try again.");
    }
};
const localStorage_setItem = (key, val) => {
    try {
        window.localStorage.setItem(key, val);
    } catch (err) {
        //trường hợp trình duyệt ẩn danh ko nhận localStorage
        var sb_localStorage = window.sb_localStorage
            ? JSON.parse(window.sb_localStorage) || {}
            : {};
        sb_localStorage[key] = val;
        window.sb_localStorage = JSON.stringify(sb_localStorage);
    }
};
const localStorage_getItem = (key) => {
    try {
        return window.localStorage.getItem(key);
    } catch (err) {
        //trường hợp trình duyệt ẩn danh ko nhận localStorage
        var sb_localStorage = window.sb_localStorage
            ? JSON.parse(window.sb_localStorage) || {}
            : {};
        return sb_localStorage[key];
    }
};
const localStorage_setCookie = (cookie, expires = 90) => {
    try {
        var sb_cookie = window.localStorage.sb_cookie
            ? JSON.parse(window.localStorage.sb_cookie) || {}
            : {};
        sb_cookie[cookie.name] = {
            v: cookie.value,
            t: new Date().getTime() + expires * 86400000,
        }; //24*60*60*1000 = 86400000
        //xoa du liệu đã hết thời gian
        var time = new Date().getTime();
        for (var i in sb_cookie) {
            if (sb_cookie[i].t <= time) {
                delete sb_cookie[i];
            }
        }
        window.localStorage.sb_cookie = JSON.stringify(sb_cookie);
        return true;
    } catch (err) {
        //trường hợp trình duyệt ẩn danh ko nhận localStorage
        try {
            var sb_cookie = window.sb_cookie
                ? JSON.parse(window.sb_cookie) || {}
                : {};
            sb_cookie[cookie.name] = {
                v: cookie.value,
                t: new Date().getTime() + expires * 86400000,
            };
            var time = new Date().getTime();
            for (var i in sb_cookie) {
                if (sb_cookie[i].t <= time) {
                    delete sb_cookie[i];
                }
            }
            window.sb_cookie = JSON.stringify(sb_cookie);
            return true;
        } catch (err) {
            return false;
        }
    }
};

const localStorage_getCookie = (name) => {
    try {
        var sb_cookie = window.localStorage.sb_cookie
            ? JSON.parse(window.localStorage.sb_cookie) || {}
            : {};
        //xoa du liệu đã hết thời gian
        var time = new Date().getTime();
        for (var i in sb_cookie) {
            if (sb_cookie[i].t <= time) {
                delete sb_cookie[i];
            }
        }
        window.localStorage.sb_cookie = JSON.stringify(sb_cookie);
        if (sb_cookie && sb_cookie[name]) {
            return sb_cookie[name].v;
        } else {
            return null;
        }
    } catch (err) {
        try {
            var sb_cookie = window.sb_cookie
                ? JSON.parse(window.sb_cookie) || {}
                : {};
            var time = new Date().getTime();
            for (var i in sb_cookie) {
                if (sb_cookie[i].t <= time) {
                    delete sb_cookie[i];
                }
            }
            window.sb_cookie = JSON.stringify(sb_cookie);
            if (sb_cookie && sb_cookie[name]) {
                return sb_cookie[name].v;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }
};

const setCookie = (cookie, expires = 90) => {
    return localStorage_setCookie(cookie, expires);
};

const getCookie = (name) => {
    // return localStorage_getCookie(name);
    // return Cookies.get(name);
};

const popupCenter = ({ url, title, w, h }) => {
    // Fixes dual-screen position                             Most browsers      Firefox
    // const dualScreenLeft =
    //     window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    // const dualScreenTop =
    //     window.screenTop !== undefined ? window.screenTop : window.screenY;

    // const width = window.innerWidth
    //     ? window.innerWidth
    //     : document.documentElement.clientWidth
    //     ? document.documentElement.clientWidth
    //     : screen.width;
    // const height = window.innerHeight
    //     ? window.innerHeight
    //     : document.documentElement.clientHeight
    //     ? document.documentElement.clientHeight
    //     : screen.height;

    // const systemZoom = width / window.screen.availWidth;
    // const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    // const top = (height - h) / 2 / systemZoom + dualScreenTop;
    // const newWindow = window.open(
    //     url,
    //     title,
    //     `
    //   scrollbars=yes,
    //   width=${w / systemZoom}, 
    //   height=${h / systemZoom}, 
    //   top=${top}, 
    //   left=${left}
    //   `
    // );

    // if (window.focus) newWindow.focus();
};

const openReview = (page = null, type = "") => {
    let url = "api/save-setting";
    let parameters = {
        key: "show_review",
        value: true,
    };
    let response = api("GET", url, null, parameters);

    if (page) {
        followFrom("Review Event", "From " + page + type);
    }

    Modal.destroyAll();

    return popupCenter({
        url: app.reviewLink,
        title: "Seo Booster app",
        w: 900,
        h: 650,
    });
};
const openFakeReviewModal = () => {
    // const [value, setValue] = useState("");
    return Modal.confirm({
        title: "How do you feel about the app?",
        content: (
            <div>
                <TextArea
                // onChange={e => {
                //     setValue(e.target.value);
                // }}
                />
            </div>
        ),
        okText: "Send",
        cancelText: "Cancel",
        onOk() {
            try {
                let url = "api/save-setting";
                let parameters = {
                    key: "show_bad_review",
                    value: 1,
                };
                let response = api("GET", url, null, parameters);
            } catch (e) {
                console.log(e);
            }
            Modal.destroyAll();
        },
        onCancel() {
            Modal.destroyAll();
        },
    });
};

const openReviewModal = (page = null) => {
    // return;
    // if (Cookies.get("is_review_modal")) {
    //     return;
    // }
    // Cookies.set("is_review_modal", 1, { expires: 1 });

    // return Modal.confirm({
    //     icon: <b></b>,
    //     content: (
    //         <div>
    //             <h1 style={{ fontSize: "1.5em", textAlign: "center" }}>
    //                 <b>Would you leave a quick 10 seconds review 😍? </b>
    //             </h1>
    //             <div className="mt-3 text-center">
    //                 <p>We are working hard for a better user experience.</p>
    //                 <p>We'd greatly appreciate if you can rate us.</p>
    //                 <p className="mt-3 text-center">
    //                     <Rate
    //                         style={{
    //                             fontSize: "2em",
    //                         }}
    //                         value={5}
    //                         onChange={(value) => {
    //                             if ([1, 2, 3].includes(value)) {
    //                                 return openFakeReviewModal();
    //                             }
    //                             openReview();
    //                             if (page) {
    //                                 followFrom(page);
    //                             }
    //                         }}
    //                     />
    //                 </p>
    //             </div>
    //         </div>
    //     ),
    //     okText: "Sure",
    //     onOk: openReview,
    //     cancelText: "Cancel",
    //     width: "50vw",
    //     centered: true,
    //     className: "open-review-modal",
    // });
};

let followFrom = (
    category,
    action = "click",
    label = app.shopName,
    value = "is charge " + app.isCharge,
    tracker = "tracker1"
) => {
    if (isTestPlan() && !isAdminShop()) {
        return 1;
    }

    ReactGA.event(
        {
            category: category,
            action: action,
            label: label,
            value: value,
        },
        [tracker]
    );

    if (app.isCharge) {
        if (app.planType == "pro") {
            ReactGA.event(
                {
                    category: category,
                    action: action,
                    label: label,
                    value: value,
                },
                ["trackerChargePro"]
            );
        } else {
            ReactGA.event(
                {
                    category: category,
                    action: action,
                    label: label,
                    value: value,
                },
                ["trackerChargeUnlimited"]
            );
        }
    } else {
        ReactGA.event(
            {
                category: category,
                action: action,
                label: label,
                value: value,
            },
            ["trackerFree"]
        );
    }
};

// let openNotificationToCharge = (message, description, page = null) => {
//     const key = `open${Date.now()}`;
//     const btn = (
//         <Button
//             type="primary"
//             size="small"
//             onClick={e => openInNewTab("/plan")}
//         >
//             {i18n.t("Upgrade to Pro")}
//         </Button>
//     );
//     if (page) {
//         followFrom("Clicked To Charge", "Popup " + page);
//     }
//     notification.destroy();
//     notification.open({
//         type: "warning",
//         duration: 10,
//         message: message,
//         description: description,
//         btn,
//         key
//     });
// };
let openNotificationToCharge = (
    message,
    description,
    page = null,
    onClose = undefined,
    buttonText
) => {
    const key = `open${Date.now()}`;
    const btn = (
        // <Button
        //     type="primary"
        //     size="small"
        //     onClick={e => openInNewTab("/plan")}
        //     style={{
        //         backgroundColor: "#159cde",
        //         borderColor: "#159cde",
        //         boxShadow: "0 1px 0 0 #00bac8",
        //         padding: "0 20px",
        //         borderRadius: "4px",
        //         fontWeight: "bold",
        //         height: "28px"
        //     }}
        // >
        //     {i18n.t(
        //         app.eachUpgradeInThePast
        //             ? "Upgrade to Pro"
        //             : "Start FREE trials"
        //     )}
        // </Button>
        // <SBButton onClick={(e) => openInNewTab("/plan")} color={"red"}>
        //     <Trans>
        //         {buttonText ||
        //             (app.eachUpgradeInThePast
        //                 ? "Upgrade to Pro"
        //                 : "Start FREE trials")}
        //     </Trans>
        // </SBButton>
        ""
    );
    if (page) {
        followFrom("Clicked To Charge", "Popup " + page);
    }
    notification.destroy();
    notification.open({
        type: "warning",
        duration: 10,
        message: message,
        description: undefined, //description,
        btn,
        key,
        className: "upgrade",
        onClose: onClose,
    });
};

let notifyError = (msg, type) => {
    return (
        <div className={"Polaris-Labelled__Error " + type}>
            <div id="txtHomeTitleError" className={"Polaris-InlineError"}>
                <div className={"Polaris-InlineError__Icon"}>
                    <span className={"Polaris-Icon"}>
                        <svg
                            viewBox="0 0 20 20"
                            className={"Polaris-Icon__Svg"}
                            focusable="false"
                            aria-hidden="true"
                        >
                            <path
                                d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-8h2V6H9v4zm0 4h2v-2H9v2z"
                                fillRule={"evenodd"}
                            ></path>
                        </svg>
                    </span>
                </div>
                <div className={"Polaris-InlineError-Text"}>
                    <p>{msg}</p>
                </div>
            </div>
        </div>
    );
};

let validURL = (str) => {
    str = (str || "").replace(/^https?:\/\/?|^\/\//gi, "http://");
    str = encodeURI(str);
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(str);
};

function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

const checkTokenExpired = (token) => {
    if (!token) {
        return false;
    }
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
    var arr = JSON.parse(jsonPayload);
    return arr.exp > new Date().getTime() / 1000 + 2;
};

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
        .getElementsByTagName("meta")
        ["csrf-token"].getAttribute("content"),
};

const client = null;

const updateSessionTokenSB = async () => {
    // if(!app.fRedirect) { 
    //     return;
    // }
    // var appMain = appShopify();
    // var sessionToken = appMain ? await getSessionToken(appMain) : null;
    // if (sessionToken) sessionToken = "Bearer " + sessionToken;
    // return sessionToken;
};

const getSessionTokenSB = async () => {
    var token = document.getElementsByTagName("meta")["sb-token"]
        ? document
              .getElementsByTagName("meta")
              ["sb-token"].getAttribute("content")
        : null;
    if (!checkTokenExpired(token)) {
        token = await updateSessionTokenSB();
        if (token) {
            document
                .querySelector('meta[name="sb-token"]')
                .setAttribute("content", token);
        }
    }
    return token;
};

const api = async (method, url, data = {}, params = {}, header) => {
    var sessionToken = await getSessionTokenSB();
    if (!header) {
        data = JSON.stringify(data);
        header = headers;
    }
    header.Authorization = sessionToken ? sessionToken : "";
    header["shop"] = app.shopName + ".myshopify.com";
    return client
        .request({
            data: data,
            params,
            headers: header,
            method,
            url,
        })
        .then((response) => response);
};

const apiFunction = async (
    method,
    url,
    data = {},
    params = {},
    header = null,
    callback = null
) => {
    var sessionToken = await getSessionTokenSB();
    if (!header) {
        data = JSON.stringify(data);
        header = headers;
    }
    header.Authorization = sessionToken ? sessionToken : "";
    header["shop"] = app.shopName + ".myshopify.com";

    if (!callback) {
        callback = (response) => response;
    }

    return client
        .request({
            data: data,
            params,
            headers: header,
            method,
            url,
        })
        .then((response) => callback(response));
};

const apiClient = (method, url, data = {}, params = {}, header1) => {
    // if (!header1) {
    //     data = JSON.stringify(data);
    //     header1 = headers;
    // }

    // const sessionToken = getSessionTokenSB();

    // header1["Authorization"] = sessionToken ? sessionToken : "";
    // header1["shop"] = app.shopName + ".myshopify.com";
    // return client1
    //     .request({
    //         data: data,
    //         params,
    //         headers: header1,
    //         method,
    //         url,
    //     })
    //     .then((response) => response);
};

const history = historyBrowser.createBrowserHistory();

export {
    apiFunction,
    getSessionTokenSB,
    apiClient,
    api,
    history,
    openNotification,
    headers,
    openInNewTab,
    openReview,
    openReviewModal,
    openNotificationToCharge,
    openFakeReviewModal,
    followFrom,
    setCookie,
    getCookie,
    pusherInit,
    GAInit,
    changePlan,
    setCustomerIO,
    activitiesLog,
    getDateString,
    notifyError,
    validURL,
    redirectTo,
    isTestPlan,
    popupCenter,
    isMobile,
    isAdminShop,
    dynamicSortStr,
    dynamicSortTime,
    bytesToSize,
    getDateStringNumber,
    localStorage_setCookie,
    localStorage_getCookie,
    localStorage_getItem,
    localStorage_setItem,
    updateSessionTokenSB,
    redirect,
    redirectApp,
    openMessage,
    setLanguage,
};
