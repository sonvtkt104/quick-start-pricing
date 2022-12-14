import React, { Component } from "react";
import {
    Layout,
    PageHeader,
    Table,
    Collapse,
    Row,
    Col,
    Modal,
    Input,
    Button,
    Affix,
    Tooltip,
    Statistic,
    Tag,
    Switch,
    Radio
} from "antd";
import axios from "axios";
import { withTranslation, Trans } from "react-i18next";


import {
    setCookie,
    GAInit,
    redirect,
} from "../helper";



const app = {}

const shop_name = window.document.getElementsByTagName("meta")["shop-name"].getAttribute("content")
const shopId = document.getElementsByTagName("meta")["shop-id"].getAttribute("content")
const proId = document.getElementsByTagName("meta")["pro-id"].getAttribute("content")
const unlimitedId = document.getElementsByTagName("meta")["unlimited-id"].getAttribute("content")


export class ComfirmPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comfirmPopup:this.props.visible||false
        };
    }
    componentDidMount = () => {};
    render() {
        return (
            <Modal
                open={this.state.comfirmPopup}
                className="comfirm-popup"
                onCancel={(e) => {
                    this.setState({
                        comfirmPopup: false,
                    });
                    this.props.onCancel&&this.props.onCancel(e);
                }}
                style={{textAlign: "center",top: "25%",borderRadius:8}}
                footer={null}
                width={360}
            >
                <div style={{textAlign: "center",}} >
                    <div
                        style={{fontSize: "16px",fontWeight: "600",marginBottom: "15px",lineHeight: "24px",}}
                    >
                        {this.props.title || "Confirm upgrade"}
                    </div>

                    <p style={{ lineHeight: "24px",marginBottom:10 }}>
                        {
                            this.props.textPlan || (
                                <>{"Premium Plan: "}
                                <span
                                    style={{color: 'rgba(88, 202, 140, 1)',fontWeight: 'bold'}}
                                >$39/{"month"}</span></>
                            )
                        }
                    </p>
                    <div style={{textAlign: "left",marginBottom: "15px",}}>
                        {this.props.content || "Confirm you’ll upgrade to enjoy more of our advanced and auto features!"}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", }}>
                        <Button
                            className=""
                            style={{backgroundColor: "rgb(236, 235, 237)",borderRadius: "6px",lineHeight: "21px",border: "none",height: "auto",}}
                            onClick={(e) => {
                                this.setState({
                                    comfirmPopup: false,
                                });
                                this.props.onCancel&&this.props.onCancel(e);
                            }}
                        >
                            <font style={{ color: "rgba(56, 56, 58, 1)", fontSize: 12, }} >
                                CANCEL
                            </font>
                        </Button>
                        <Button
                            className=""
                            style={{backgroundColor: "#58CA8C",borderRadius: "6px",marginLeft: "12px",lineHeight: "21px",border: "none",height: "auto",}}
                            loading={this.state.loading}
                            onClick={(e) => {
                                this.setState({loading:1})
                                this.props.comfirmPay&&this.props.comfirmPay(e);
                            }}
                        >
                            <font style={{ color: "#ffffff", }} >
                                {this.props.textBtnComfirm || "UPGRADE & START FREE TRIAL"}
                            </font>
                        </Button>
                        
                    </div>
                </div>
            </Modal>
        );
    }
}
class Pricing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false,
            errorTextMessage: "",
            sub0: 1,
            sub1: 1,
            sub2: 1,
            sub3: 1,
            sub4: 1,
            sub5: 1,
            sub6: 1,
            sub7: 1,
            sub8: 1,
            trialDays: 3,
            offerTime: 0,
            appliedDiscount: 0,
            // discount: 53,
            openTooltip: 1,
            startDate: new Date("Sep 06, 2021 00:00:00"),
            btnActive: "sb-pro-plan-mobile",
            deadline: 0,
            closeBanner: true,
            classRowSupport: "",
            modalHeadsUpStep1: false,
            modalHeadsUpStep2: false,
            planDown: "",
            planIdDown: 0,
            loadingOffer30: false,
            onTop: false,
            showId: "",
            isMobile: false,
            loadingDowngrade: false,
            loadingSpeedUp: false,
            hideAffixPlan: false,
            total_issues: 0,
            total_notices: 0,
            // sb_new_user:getCookie("sb_new_user")==1,
            isYearly: app.isAnnualPlan == 1 ? true : false,
            optionPlan: 1, 
            showMore: false,
            priceSpeed: 550,
            // encrypt_code: document.getElementsByTagName("meta")["encrypt_code"].getAttribute("content"),
            isHalloween: false,
            isBlackFriday: false,
        };
    }

    componentDidMount() {
        GAInit();
    }

    chargePlan = (
        planId,
    ) => {
        console.log('vo charge')
        this.setState({ loading: true });

        axios({
            method: 'get',
            url: `/pricing-quickstart-charge?shop-id=${shopId}&plan-id=${planId}`,
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-TOKEN": document.querySelector('meta[name=csrf-token]').getAttribute('content'),
                'shop': `${shop_name}.myshopify.com`,
            },
        })
            .then((response) => {
                if (response.data && response.data.chargeUrl) {
                    redirect(response.data.chargeUrl);
                } else {
                    console.log("hahahahaahahahahahh")
                    
                    this.setState({
                        loading: false,
                        comfirmPremiumPlan: 0,
                        comfirmEnterprisePlan: 0
                    });
                   
                }

                return;
            })
            .catch(function (error) {
                console.log(4)
                console.log(error);

                this.setState({
                    loading: false,
                    comfirmPremiumPlan: 0,
                    comfirmEnterprisePlan: 0
                });
            }.bind(this));

        setCookie({ name: "justChangePlanSB", value: 1 }, 0.1);
    };

    changeViewPlan = () => {
        let obj = [];
        for (let i = 1; i < 9; i++) {
            let sub = "sub";
            sub += i;
            obj[sub] = 0;
        }
        this.setState(obj);
        this.setState({
            classRowSupport: "sb-row-support-plan",
        });
    };

    render() {
        const {
            modalActive,
            errorTextTitle,
            errorTextMessage,
            loading,
            openTooltip,
        } = this.state;
        const stylePointer = this.state.isMobile
            ? {
                  display: "none",
              }
            : {
                  position: "absolute",
                  top: "50%",
                  left: "12%",
                  height: 56,
                  zIndex: 1,
              };


        const CheckSvg = () => (
            <div style={{ width: "fit-content", margin: "28px auto" }}>
                <img src="/images/pricing-check.png" alt="pricing check" style={{ width: 25, height: 25 }} />
            </div>
        );

        const ProButtonMonthly = ({detail}) => {
            let Btn = (
                <Button
                    style={{
                        marginTop: "10px",
                        width: "100%",
                        padding: "10px 0px",
                        height: 40,
                        borderRadius: " 6px",
                        color: "#57CA8C",
                        backgroundColor: "#fff",
                        border: "1px solid #FF3C00",
                    }}
                    className="sb-button"
                    onClick={(e) => {
                        this.setState({
                            comfirmPremiumPlan:1
                        });
                       
                    }}
                    loading={this.state.loading_pro_up}
                >
                    <font
                        style={{
                            color: "#FF3C00",
                            fontWeight: '600'
                        }}
                    >
                        <Trans>SELECT</Trans>
                    </font>
                </Button>
            );

            return Btn;
        };

        const UnlButtonMonthly = ({detail}) => {
            let Btn = (
                <Button
                    style={{
                        marginTop: "10px",
                        width: "100%",
                        padding: "10px 0px",
                        height: 40,
                        borderRadius: " 6px",
                        color: "#38383A",
                        backgroundColor: "#FF3C00",
                        border: "1px solid #FF3C00",
                    }}
                    className="sb-button"
                    onClick={(e) => {
                        this.setState({
                            comfirmEnterprisePlan:1
                        });
                        
                    }}
                    loading={this.state.loading_unl_up}
                >
                    <font
                        style={{
                            color: '#fff',
                            fontWeight: '600'
                        }}
                    >
                        <Trans>{'TRY IT TODAY >'}</Trans>
                    </font>
                </Button>
            );
            return Btn;
        };
      
        const column1 = {
            title: (customClassName = "", background = "#FFFFFF") => {
                return (
                    <Col
                        xs={24}
                        sm={24}
                        md={8}
                        lg={6}
                        xl={6}
                        className="sb-header-mobile"
                    >
                        <div
                            style={{
                                background: background,
                                textAlign: "center",
                                borderRadius: '0 16px 0 0'
                            }}
                            className={
                                "sb-header-content pricing-title " +
                                customClassName
                            }
                        >
                            <p
                                style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: "#202223",
                                }}
                            >
                                <Trans>STARTER</Trans>
                            </p>
                            <p
                                style={{
                                    marginTop: "5px",
                                }}
                            >
                                <b
                                    style={{
                                        fontSize: 40,
                                        color: "#FF3C00",
                                        fontWeight: 700,
                                    }}
                                >
                                    <Trans values={{ num: 0 }}>FREE</Trans>
                                </b>
                               
                            </p>
                            
                            <a href="/"
                                onClick={() => {
                                    fetch(`https://www.google-analytics.com/collect?v=1&t=event&tid=UA-53113273-31&cid=e89af982-d7d8-415c-9bd0-b306d9b1ce53&ec=quick-start&ea=qs-starter&ev=1&el=${shop_name}`)
                                }}
                            >
                                <Button
                                    className='sb-button'
                                    style={{
                                        marginTop: "10px",
                                        width: "100%",
                                        padding: "10px 0px",
                                        height: 40,
                                        borderRadius: " 8px",
                                        border: "1px solid #38383A",
                                        color: "#38383A",
                                        backgroundColor: "white",
                                    }}
                                >
                                    <font
                                        style={{
                                            color: "#38383A",
                                            fontWeight: '600'
                                        }}
                                    >
                                        <Trans>SELECT</Trans>
                                    </font>
                                </Button>
                            </a>
                        </div>
                    </Col>
                );
            },
            check: {
                a1: <CheckSvg />,
                a2: "",
                a3: "",
                a4: "",
                b1: ("50 pages"),
                b2: "",
                b3: "",
                b4: "",
                c1: ("50 pages"),
                c2: "",
                c3: ("50 pages"),
                c4: "",
                d1: ("Submit"),
                d2: <CheckSvg />,
                d3: "",
                d4: "",
                e1: "",
                e2: "",
                f1: ("50 pages"),
                f2: <CheckSvg />,
                f3: <CheckSvg />,
                f4: "",
                f5: ("50"),
                g1: ("24/7"),
                g2: <CheckSvg />,
                g3: "",
            },
            background: "",
        };

        const column2 = {
            title: (customClassName = "", background = "#fff") => {
                return (
                    <Col
                        xs={24}
                        sm={24}
                        md={8}
                        lg={6}
                        xl={6}
                        className="sb-header-mobile pcl-2"
                    >
                        <div
                            style={{
                                background: background,
                                paddingTop: 0,
                                textAlign: "center",
                            }}
                            className={
                                "sb-header-content pricing-title " +
                                customClassName
                            }
                        >
                            <div style={{ height: 25 }}></div>

                            <p
                                style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: "#202223",
                                    textAlign: "center",
                                }}
                            >
                                <Trans>PREMIUM</Trans>{" "}
                            </p>
                            <p
                                style={{
                                    marginTop: "5px",
                                    textAlign: "center",
                                }}
                            >
                                <font
                                    style={{
                                        fontSize: 40,
                                        color: "#FF3C00",
                                        fontWeight: 700,
                                    }}
                                >
                                    {
                                        this.state.isYearly ? `$374` : `$39`
                                    }
                                </font>
                            </p>
                            
                            <ProButtonMonthly detail={true} />
                            
                        </div>
                    </Col>
                );
            },
            check: {
                a1: <CheckSvg />,
                a2: <CheckSvg />,
                a3: <CheckSvg />,
                a4: "",
                b1: ("500 pages"),
                b2: "",
                b3: <CheckSvg />,
                b4: <CheckSvg />,
                c1: ("500 pages"),
                c2: <CheckSvg />,
                c3: ("500 pages"),
                c4: "",
                d1: ("Auto Update"),
                d2: <CheckSvg />,
                d3: "",
                d4: "",
                e1: "",
                e2: "",
                f1: ("500 pages"),
                f2: <CheckSvg />,
                f3: <CheckSvg />,
                f4: "",
                f5: ("500"),
                g1: ("24/7"),
                g2: <CheckSvg />,
                g3: "",
            },
            background: "",
        };

        const column3 = {
            title: (customClassName = "", background = "#FFFFFF") => {
                return (
                    <Col
                        xs={24}
                        sm={24}
                        md={8}
                        lg={6}
                        xl={6}
                        className="sb-header-mobile"
                    >
                        <div
                            style={{
                                background: background,
                                textAlign: "center",
                            }}
                            className={
                                "sb-header-content sb-unlimited-plan pricing-title " +
                                customClassName
                            }
                        >
                            <p
                                style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: "#202223",
                                    textAlign: "center",
                                }}
                            >
                                <Trans>ENTERPRISE</Trans>
                            </p>
                            <div
                                style={{
                                    marginTop: "5px",
                                }}
                            >
                                <font
                                    style={{
                                        fontSize: 40,
                                        color: "#FF3C00",
                                        fontWeight: 700,
                                    }}
                                >
                                    {
                                        this.state.isYearly ? `$758` : `$79`
                                    }
                                </font>
                            </div>
                            
                            <UnlButtonMonthly detail={true} />
                            
                        </div>
                    </Col>
                );
            },
            check: {
                a1: <CheckSvg />,
                a2: <CheckSvg />,
                a3: <CheckSvg />,
                a4: <CheckSvg />,
                b1: ("Unlimited"),
                b2: <CheckSvg />,
                b3: <CheckSvg />,
                b4: <CheckSvg />,
                c1: ("Unlimited"),
                c2: <CheckSvg />,
                c3: ("Unlimited"),
                c4: <CheckSvg />,
                d1: ("Auto Update"),
                d2: <CheckSvg />,
                d3: <CheckSvg />,
                d4: <CheckSvg />,
                e1: <CheckSvg />,
                e2: <CheckSvg />,
                f1: ("Unlimited"),
                f2: <CheckSvg />,
                f3: <CheckSvg />,
                f4: <CheckSvg />,
                f5: ("5000"),
                g1: ("VIP Priority"),
                g2: <CheckSvg />,
                g3: <CheckSvg />,
            },
            background: "",
        };

        const firstColumm = column1;
        const secondColumm = column2;
        const thirdColumm = column3;

        const dataUnl = [
            ('Long URL Handle'),
            ('Keyword Analytics'),
            ('Accelerated Mobile Pages'),
            ('Advanced Snippets'),
            // ('Quick Speed Boost'),
            ('Customized Expert'),
            ('More')
        ];
        const dataPro = [
            ('SEO Tags Advance Setup'),
            ('Broken Links AutoPilot '),
            ('Sitemap Auto Update'),
            ('Google Search Console '),
            ('JSON-LD'),
        ];
        const dataFree = [
            ('SEO Report'),
            ('SEO Tags Bulk Update'),
            ('Basic Speed Up'),
            ('Sitemap Submission'),
        ];

        const ItemPlan = ({ title ,typePlan, priceCharge, priceBeforeDiscount, listOptions, special, buttonCharge, service}) => {
            return (
                <div
                    style={{
                        flexBasis: '31%',
                    }}
                >
                    <div className={`pricing-v3-item-plan ${special ? 'special' : ''}`}
                        style={{
                            background:  special ? '#58CA8C' : 'white',
                            padding: typePlan == 'pro' ? '20px 30px 35px' : '20px 30px 50px'
                        }}
                    >
                        <div style={{marginBottom: 15}}>
                            <span
                                style={{padding: '2px 12px', background: '#b0b0b038', borderRadius: '5px'}}
                            >
                                {service}
                            </span>
                        </div>
                        <div 
                            style={{
                                fontSize: 24,
                                lineHeight:'36px',
                                fontWeight:'600',
                                color: special? 'white' : '#38383A'
                            }} 
                        >
                            {title}
                        </div>
                        <div
                            style={{marginBottom: 10}}
                        >
                            <span
                                style={{
                                    fontWeight:'600',
                                    fontSize:'24px',
                                    position: 'relative',
                                    lineHeight: '36px',
                                    color: (special )  ? 'white' : '#38383A'
                                }}
                            >
                                {priceCharge}
                                <span style={{fontSize: 16, fontWeight: '600', lineHeight: '24px'}}>/month</span>
                            </span>
                            {
                                priceBeforeDiscount && (
                                    <span 
                                        style={{
                                            fontSize: '24px',
                                            textDecorationLine: 'line-through',
                                            color: special ? 'white' : '#96A2BA',
                                            marginLeft:'10px',
                                            position: 'relative'
                                        }}
                                    >
                                        {priceBeforeDiscount}
                                    </span> 
                                )
                            }
                        </div>
                        <p
                            style={{
                                color: special ? 'white' : '#707070',
                                marginBottom: 8
                            }}
                        >
                            {
                                typePlan == 'unl' ? ("Save $150/hour on SEO Agency")
                                : typePlan == 'pro' ? ("Save 300 hours of SEO manual tasks")
                                : ("Save 8 weeks to master SEO Basics")
                            }
                        </p>
                        <div
                            style={{
                                width: 213,
                                margin: 'auto',
                                marginBottom: 31
                            }}
                        >
                            {buttonCharge}
                        </div>
                        <Row>
                            <Col style={{width: '100%'}}>
                                {
                                    (typePlan == 'unl' || typePlan == 'pro') && (
                                        <div
                                            style={{
                                                textAlign: 'left',
                                                color: (  special) ? 'white' : 'rgba(56, 56, 58, 1)',
                                                fontWeight: '700',
                                                marginBottom: 10,
                                                marginLeft: 'calc(50% - 106px)'
                                            }}
                                        >
                                            {
                                                typePlan == 'unl' ? ("Everything in PREMIUM, plus:")
                                                : typePlan == 'pro' ? ("Everything in STARTER, plus:")
                                                : ''
                                            }
                                        </div>
                                    )
                                }
                                <ul 
                                    style={{
                                        textAlign: 'left',
                                        marginLeft: 'calc(50% - 106px)'
                                    }}
                                >
                                    {listOptions.map((item, index) => (
                                        <li key={index}>
                                            <span style={{marginRight: 8}}>
                                                {
                                                    typePlan == 'unl' ? (
                                                        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.7319 0.685C13.639 0.591272 13.5284 0.516877 13.4065 0.466109C13.2846 0.41534 13.1539 0.389202 13.0219 0.389202C12.8899 0.389202 12.7592 0.41534 12.6373 0.466109C12.5155 0.516877 12.4049 0.591272 12.3119 0.685L4.86192 8.145L1.73192 5.005C1.6354 4.91176 1.52146 4.83845 1.3966 4.78924C1.27175 4.74004 1.13843 4.71591 1.00424 4.71823C0.870064 4.72055 0.737655 4.74928 0.614576 4.80277C0.491498 4.85627 0.380161 4.93348 0.286922 5.03C0.193684 5.12652 0.12037 5.24046 0.0711659 5.36532C0.0219619 5.49017 -0.00216855 5.6235 0.000152918 5.75768C0.00247438 5.89186 0.0312022 6.02427 0.0846957 6.14735C0.138189 6.27042 0.215401 6.38176 0.311922 6.475L4.15192 10.315C4.24489 10.4087 4.35549 10.4831 4.47735 10.5339C4.59921 10.5847 4.72991 10.6108 4.86192 10.6108C4.99393 10.6108 5.12464 10.5847 5.2465 10.5339C5.36836 10.4831 5.47896 10.4087 5.57192 10.315L13.7319 2.155C13.8334 2.06136 13.9144 1.94771 13.9698 1.82121C14.0252 1.69471 14.0539 1.5581 14.0539 1.42C14.0539 1.2819 14.0252 1.14529 13.9698 1.01879C13.9144 0.892295 13.8334 0.778643 13.7319 0.685Z" fill="#57CA8C"/>
                                                        </svg>
                                                    ) : (
                                                        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14.2319 0.685C14.139 0.591272 14.0284 0.516877 13.9065 0.466109C13.7846 0.41534 13.6539 0.389202 13.5219 0.389202C13.3899 0.389202 13.2592 0.41534 13.1373 0.466109C13.0155 0.516877 12.9049 0.591272 12.8119 0.685L5.36192 8.145L2.23192 5.005C2.1354 4.91176 2.02146 4.83845 1.8966 4.78924C1.77175 4.74004 1.63843 4.71591 1.50424 4.71823C1.37006 4.72055 1.23765 4.74928 1.11458 4.80277C0.991498 4.85627 0.880161 4.93348 0.786922 5.03C0.693684 5.12652 0.62037 5.24046 0.571166 5.36532C0.521962 5.49017 0.497831 5.6235 0.500153 5.75768C0.502474 5.89186 0.531202 6.02427 0.584696 6.14735C0.638189 6.27042 0.715401 6.38176 0.811922 6.475L4.65192 10.315C4.74489 10.4087 4.85549 10.4831 4.97735 10.5339C5.09921 10.5847 5.22991 10.6108 5.36192 10.6108C5.49393 10.6108 5.62464 10.5847 5.7465 10.5339C5.86836 10.4831 5.97896 10.4087 6.07192 10.315L14.2319 2.155C14.3334 2.06136 14.4144 1.94771 14.4698 1.82121C14.5252 1.69471 14.5539 1.5581 14.5539 1.42C14.5539 1.2819 14.5252 1.14529 14.4698 1.01879C14.4144 0.892295 14.3334 0.778643 14.2319 0.685Z" fill="#38383A"/>
                                                        </svg>
                                                    )
                                                }
                                            </span>
                                            <span 
                                                style={{color: (special) ? 'white' : '#38383a', position: 'relative'}}
                                            >
                                                {item}
                                                {
                                                    (item == 'Advanced Snippets' || item == 'Customized Expert') && (
                                                        <span style={{fontSize: 8, fontWeight: '800', color: '#FF3C00', position: 'absolute', right: '-20px'}}>HOT</span>
                                                    )
                                                }
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                        {
                            special && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        padding: '1px 12px',
                                        lineHeight: '18px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        top: '-9px',
                                        left: 'calc(50% - 118px/2 - 0.5px)',
                                        background: "#38383A",
                                        borderRadius: "10px"
                                    }}
                                >
                                    <Trans>RECOMMENDED</Trans>
                                </span>
                            )
                        }
                    </div>
                </div>
            )
        }

        return (
            <div className='pricing-v3'>
              
                <div>
                    <div>
                        <Row justify='center' style={{marginTop: 30}}>
                            <span style={{ fontSize: 36, fontWeight: '600'}}><Trans>Welcome to</Trans></span>
                            <span style={{color: '#FF3C00', fontSize: 36, fontWeight: '600', marginLeft: 7}}> <Trans>SearchPie</Trans></span>
                        </Row>
                        <Row justify="center">
                            <img src="/images/goal-quickstart.png" alt="goal" 
                                style={{width: 75, height: 52, display: 'block', marginBottom: 11}}
                            />
                        </Row>
                        <Row className="pricing-v3-title" justify="center" style={{fontSize: 26, marginBottom: 11}}>
                            <Trans>Starter is great, Enterprise is better</Trans>
                        </Row>
                        <Row justify="center" style={{fontSize: 16, marginBottom: 27}}>
                            <Trans>Select the perfect for your needs. 3-day FREE Trial plus 30-day Refund guarantee unconditionally!</Trans>
                        </Row>
                        <Row className='pricing-v3-plan' justify='space-between' style={{marginBottom: 35}}>
                            <ItemPlan 
                                title='STARTER' 
                                typePlan='free' 
                                priceCharge='$0' 
                                service='50 products'
                                listOptions={dataFree}
                                buttonCharge={
                                    (
                                        <a href="/"
                                            onClick={() => { 
                                                fetch(`https://www.google-analytics.com/collect?v=1&t=event&tid=UA-53113273-31&cid=e89af982-d7d8-415c-9bd0-b306d9b1ce53&ec=quick-start&ea=qs-starter&ev=1&el=${shop_name}`)
                                            }}
                                        >
                                            <Button
                                                className='sb-button'
                                                style={{
                                                    marginTop: "10px",
                                                    width: "100%",
                                                    padding: "10px 0px",
                                                    height: 40,
                                                    borderRadius: " 8px",
                                                    border: "1px solid #38383A",
                                                    color: "#38383A",
                                                    backgroundColor: "white",
                                                }}
                                            >
                                                <font
                                                    style={{
                                                        color: "#38383A",
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    <Trans>SELECT</Trans>
                                                </font>
                                            </Button>
                                        </a>
                                    )
                                }
                            />
                            <ItemPlan 
                                title='PREMIUM' 
                                typePlan='pro' 
                                service='500 products'
                                priceCharge={this.state.isYearly ? "$374" : '$39'}
                                priceBeforeDiscount={this.state.isYearly ? "$468" : ''}
                                listOptions={dataPro}
                                buttonCharge={
                                    (
                                        <ProButtonMonthly />
                                    )
                                }
                            />
                            <ItemPlan 
                                title='ENTERPRISE' 
                                typePlan='unl' 
                                service='> 5000 products'
                                priceCharge={this.state.isYearly ? "$758" : '$79'}
                                priceBeforeDiscount={this.state.isYearly ? "$948" : ''}
                                listOptions={dataUnl} 
                                // special={true}
                                buttonCharge={
                                    (
                                        <UnlButtonMonthly />
                                    )
                                }
                            />
                        </Row>
                        <Row justify="center" style={{marginBottom: 60}}>
                            <a 
                                href={this.state.showMore ? "#pricing-show-more-scroll" : "#"}
                                style={{color: '#38383A'}}
                            >
                                <button
                                    className='pricing-v3-show-more'
                                    style={{
                                        border: '1px solid #DADFE9',
                                        borderRadius: '8px',
                                        padding: '9px 55px',
                                        background: 'transparent',
                                        display: 'flex',
                                        fontFamily: 'Poppins',
                                        cursor: 'pointer'
                                    }}
                                    onClick={e => {
                                        this.setState({ 
                                            showMore: !this.state.showMore
                                        })
                                    }}
                                >
                                    <span 
                                        style={{
                                            marginRight: 10, 
                                            transform: this.state.showMore ? 'rotate(0deg)' : 'rotate(180deg)'
                                        }}
                                    >
                                        <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.524954 6.3325C0.712317 6.51875 0.965768 6.62329 1.22995 6.62329C1.49414 6.62329 1.74759 6.51875 1.93495 6.3325L5.52495 2.7925L9.06495 6.3325C9.25232 6.51875 9.50577 6.62329 9.76995 6.62329C10.0341 6.62329 10.2876 6.51875 10.475 6.3325C10.5687 6.23954 10.6431 6.12893 10.6938 6.00708C10.7446 5.88522 10.7708 5.75451 10.7708 5.6225C10.7708 5.49049 10.7446 5.35978 10.6938 5.23792C10.6431 5.11606 10.5687 5.00546 10.475 4.9125L6.23495 0.672498C6.14199 0.57877 6.03139 0.504376 5.90953 0.453607C5.78767 0.402838 5.65697 0.3767 5.52495 0.3767C5.39294 0.3767 5.26224 0.402838 5.14038 0.453607C5.01852 0.504376 4.90792 0.57877 4.81495 0.672498L0.524954 4.9125C0.431226 5.00546 0.356832 5.11606 0.306063 5.23792C0.255294 5.35978 0.229155 5.49049 0.229155 5.6225C0.229155 5.75451 0.255294 5.88522 0.306063 6.00707C0.356832 6.12893 0.431226 6.23953 0.524954 6.3325Z" fill="#38383A"/>
                                        </svg>
                                    </span>
                                    {   
                                        this.state.showMore 
                                        ? <Trans>Hide detail pricing plans</Trans>
                                        : <Trans>Show detail pricing plans</Trans>
                                    }
                                </button>
                            </a>
                        </Row>
                    </div>
                    {
                        this.state.showMore && ( //this.state.showMore
                            <div>
                                <div
                                    id='pricing-show-more-scroll'
                                    style={{ padding: "0px 2%" }}
                                    onClick={(e) => {
                                        this.setState({
                                            openTooltip: 0,
                                        });
                                    }}
                                    className={
                                        app.isCharge ? "sb-is-charged" : "sb-non-charged"
                                    }
                                >
                                    <Layout
                                        className={
                                            "secomapp-layout page-plan " + this.state.btnActive
                                        }
                                        style={{
                                            background: "#ffffff",
                                            borderRadius: "16px",
                                            boxShadow: '0px 10px 40px rgba(9, 44, 76, 0.051)'
                                        }}
                                    >
                                        <Affix className="sb-mobile-affix" offsetTop={55}>
                                            <div>
                                                <div
                                                    style={{
                                                        backgroundColor: "#F5F5F5",
                                                        borderLeft: "5px solid #F5F5F5",
                                                        borderRight: "5px solid #F5F5F5",
                                                        paddingTop: 5,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <Tag
                                                        color="orange"
                                                        style={{
                                                            position: "relative",
                                                            left: -2,
                                                            borderRadius: 20,
                                                            color: "#d46b08",
                                                        }}
                                                    >
                                                        Recommended
                                                    </Tag>
                                                </div>
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        display: "flex",
                                                        backgroundColor: "#F5F5F5",
                                                    }}
                                                    className={
                                                        "sb-btn-mobile " + this.state.btnActive
                                                    }
                                                >
                                                    <button
                                                        className="sb-btn-affix-mobile"
                                                        onClick={(e) => {
                                                            this.setState({
                                                                btnActive: "sb-free-plan-mobile",
                                                            });
                                                            this.changeViewPlan();
                                                        }}
                                                    >
                                                        Unlimited
                                                    </button>
                                                    <button
                                                        className="sb-btn-affix-mobile"
                                                        onClick={(e) => {
                                                            this.setState({
                                                                btnActive: "sb-pro-plan-mobile",
                                                            });
                                                            this.changeViewPlan();
                                                        }}
                                                    >
                                                        Pro
                                                    </button>
                                                    <button
                                                        className="sb-btn-affix-mobile"
                                                        onClick={(e) => {
                                                            this.setState({
                                                                btnActive:
                                                                    "sb-unlimited-plan-mobile",
                                                            });
                                                            this.changeViewPlan();
                                                        }}
                                                    >
                                                        FREE
                                                    </button>
                                                </div>
                                            </div>
                                        </Affix>

                                        <Affix
                                            className="sb-hidden-affix"
                                            offsetTop={0}
                                            onChange={(e) => {
                                                this.setState({
                                                    onTop: e,
                                                });
                                            }}
                                            style={{
                                                display: this.state.hideAffixPlan
                                                    ? "none"
                                                    : "block",
                                            }}
                                        >
                                            <Row
                                                justify="center"
                                                style={{
                                                    color: "#38383A",
                                                    zIndex: "1997",
                                                    display: "flex",
                                                    boxShadow: "-40px 0px 0px #f5f6f8",
                                                }}
                                            >
                                                <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={0}
                                                    lg={6}
                                                    xl={6}
                                                    style={{
                                                        display: "flex",
                                                        flexWrap: "wrap",
                                                        alignContent: "center",
                                                        backgroundColor: '#ffffff',
                                                        borderRadius: '16px 0 0 0'
                                                    }}
                                                    className="sb-image-plan"
                                                >
                                                    
                                                </Col>
                                                {firstColumm.title(
                                                    "first-column-pricing-title"
                                                )}
                                                {secondColumm.title()}
                                                {thirdColumm.title("last-column-pricing-title")}
                                            </Row>
                                        </Affix>{" "}
                                        <div>
                                            <div className="sb-pricing-resposive">
                                                <Row
                                                    justify="center"
                                                    className="pricing-row-1 "
                                                >
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right"
                                                        id="sb-meta-tag-optimization"
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <b
                                                                style={{
                                                                    margin: "auto 0% auto 12%",
                                                                    width: "78%",
                                                                }}
                                                                className="sb-plan-header"
                                                            >
                                                                <Trans>
                                                                    META TAG OPTIMIZATION
                                                                </Trans>
                                                            </b>
                                                            {/* <div
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={(e) => {
                                                                    let obj = {};
                                                                    let temp =
                                                                        this.state["sub0"];
                                                                    obj["sub0"] = temp ? 0 : 1;
                                                                    this.setState(obj);
                                                                }}
                                                            >
                                                                {this.state["sub0"] ? (
                                                                    <DropupIcon />
                                                                ) : (
                                                                    <DropdownIcon />
                                                                )}
                                                            </div> */}
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right pcl1-null"
                                                    ></Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right pcl2-null"
                                                    ></Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pcl3-null"
                                                    ></Col>
                                                </Row>

                                                {this.state["sub0"] ? (
                                                    <div className="fade-in-div">
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                            >
                                                                {this.state.showId ==
                                                                    "sb-meta-tag-bulk" && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>
                                                                        Bulk Meta Tags
                                                                    </Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.a1}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.a1}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.a1}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                            >
                                                                {this.state.showId ==
                                                                    "sb-meta-tag-auto" && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>
                                                                        Auto Meta Tags
                                                                    </Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.a2}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.a2}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.a2}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                            >
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    {this.state.showId ==
                                                                        "sb-meta-tag-customization" && (
                                                                        <img
                                                                            src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                            style={stylePointer}
                                                                        />
                                                                    )}
                                                                    <Trans>
                                                                        Manual Meta Tags
                                                                    </Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                {firstColumm.check.a3}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                {secondColumm.check.a3}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                {thirdColumm.check.a3}
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                            >
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    {this.state.showId ==
                                                                        "sb-meta-tag-filter-csv" && (
                                                                        <img
                                                                            src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                            style={stylePointer}
                                                                        />
                                                                    )}
                                                                    <Trans>
                                                                    Meta Tag Filter & CSV
                                                                    </Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                {firstColumm.check.a4}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                {secondColumm.check.a4}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                {thirdColumm.check.a4}
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}

                                                <Row
                                                    justify="center"
                                                    className="pricing-row-1 "
                                                >
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right"
                                                        style={{
                                                            // borderRadius: "20px 0 0 0",
                                                        }}
                                                        id="sb-image-optimization"
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <b
                                                                style={{
                                                                    margin: "auto 0% auto 12%",
                                                                    width: "78%",
                                                                }}
                                                                className="sb-plan-header"
                                                            >
                                                                <Trans>
                                                                ALT TAG OPTIMIZATION
                                                                </Trans>
                                                            </b>
                                                            {/* <div
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={(e) => {
                                                                    let obj = {};
                                                                    let temp =
                                                                        this.state["sub1"];
                                                                    obj["sub1"] = temp ? 0 : 1;
                                                                    this.setState(obj);
                                                                }}
                                                            >
                                                                {this.state["sub1"] ? (
                                                                    <DropupIcon />
                                                                ) : (
                                                                    <DropdownIcon />
                                                                )}
                                                            </div> */}
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right pcl1-null"
                                                    ></Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right pcl2-null"
                                                    ></Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pcl3-null"
                                                    ></Col>
                                                </Row>
                                                {this.state["sub1"] ? (
                                                    <div className="fade-in-div">
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                id="sb-alt-product-img"
                                                            >
                                                                {this.state.showId ==
                                                                    "sb-alt-product-img" && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>
                                                                    Alt-tags for Product Images
                                                                    </Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right first-column pcl1"
                                                                style={{
                                                                    textAlign: "center",
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.b1}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                                style={{
                                                                    textAlign: "center",
                                                                }}
                                                            >
                                                                <font
                                                                    style={{
                                                                        margin: "28px auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.b1}
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl3"
                                                                style={{
                                                                    textAlign: "center",
                                                                }}
                                                            >
                                                                <font
                                                                    style={{
                                                                        margin: "28px auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.b1}
                                                                </font>
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                id="sb-alt-all-site"
                                                            >
                                                                {this.state.showId ==
                                                                    "sb-alt-all-site" && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        width: "100%",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            margin: "auto 0% auto 12%",
                                                                            width: "fit-content",
                                                                        }}
                                                                    >
                                                                        <Trans>
                                                                        Alt-tags for All site Images
                                                                        </Trans>
                                                                    </div>
                                                                    {/* <NewSvg /> */}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                {firstColumm.check.b2}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                {secondColumm.check.b2}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                {thirdColumm.check.b2}
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                id="sb-auto-alt-tag"
                                                            >
                                                                {this.state.showId ==
                                                                    "sb-auto-alt-tag" && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        width: "100%",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            margin: "auto 0% auto 12%",
                                                                            width: "fit-content",
                                                                        }}
                                                                    >
                                                                        <Trans>
                                                                        Auto & Daily Alt-tag Setting
                                                                        </Trans>
                                                                    </div>
                                                                    {/* <NewSvg /> */}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                {firstColumm.check.b3}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                {secondColumm.check.b3}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                {thirdColumm.check.b3}
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                id="sb-alt-product-img"
                                                            >
                                                                {this.state.showId ==
                                                                    "sb-alt-product-img" && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>
                                                                    Manual Alt-tags
                                                                    </Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right first-column pcl1"
                                                                style={{
                                                                    textAlign: "center",
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.b4}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                                style={{
                                                                    textAlign: "center",
                                                                }}
                                                            >
                                                                <font
                                                                    style={{
                                                                        margin: "28px auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.b4}
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl3"
                                                                style={{
                                                                    textAlign: "center",
                                                                }}
                                                            >
                                                                <font
                                                                    style={{
                                                                        margin: "28px auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.b4}
                                                                </font>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                
                                                <Row
                                                    justify="center"
                                                    className="pricing-row-1 "
                                                    id="sb-url-optimization"
                                                >
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right"
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <b
                                                                style={{
                                                                    margin: "auto 0% auto 12%",
                                                                    width: "78%",
                                                                }}
                                                                className="sb-plan-header"
                                                            >
                                                                <Trans>URLs CONTROL</Trans>
                                                            </b>
                                                            {/* <div
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={(e) => {
                                                                    let obj = {};
                                                                    let temp =
                                                                        this.state["sub2"];
                                                                    obj["sub2"] = temp ? 0 : 1;
                                                                    this.setState(obj);
                                                                }}
                                                            >
                                                                {this.state["sub2"] ? (
                                                                    <DropupIcon />
                                                                ) : (
                                                                    <DropdownIcon />
                                                                )}
                                                            </div> */}
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right pcl1-null"
                                                    ></Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right pcl2-null"
                                                    ></Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pcl3-null"
                                                    ></Col>
                                                </Row>
                                                {this.state["sub2"] ? (
                                                    <div className="fade-in-div">
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                            >
                                                                {(this.state.showId ==
                                                                    "sb-broken-link" ||
                                                                    this.state.showId ==
                                                                        "sb-broken-link") && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>Broken Link Detect</Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.c1}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.c1}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.c1}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                            >
                                                                {(this.state.showId ==
                                                                    "sb-broken-link-navigation" ||
                                                                    this.state.showId ==
                                                                        "sb-broken-link-auto") && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>Auto Broken Link Navigation</Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.c2}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.c2}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.c2}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                id="sb-long-url-scanner"
                                                            >
                                                                {(this.state.showId ==
                                                                    "sb-long-url-scanner" ||
                                                                    this.state.showId ==
                                                                        "sb-repair-long-url") && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        width: "100%",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            margin: "auto 0% auto 12%",
                                                                            width: "fit-content",
                                                                        }}
                                                                    >
                                                                        <Trans>Long URL Detect</Trans>
                                                                    </div>
                                                                    {/* <NewSvg /> */}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right text-center pcl1"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.c3}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.c3}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.c3}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                id="sb-long-url-scanner"
                                                            >
                                                                {(this.state.showId ==
                                                                    "sb-long-url-fix" ||
                                                                    this.state.showId ==
                                                                        "sb-repair-long-url") && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        width: "100%",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            margin: "auto 0% auto 12%",
                                                                            width: "fit-content",
                                                                        }}
                                                                    >
                                                                        <Trans>Long URL Fix</Trans>
                                                                    </div>
                                                                    {/* <NewSvg /> */}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right text-center pcl1"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.c4}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.c4}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.c4}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}

                                                <Row
                                                    justify="center"
                                                    className="pricing-row-1 "
                                                >
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right"
                                                        id="sb-google-presence"
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <b
                                                                style={{
                                                                    margin: "auto 0% auto 12%",
                                                                    width: "78%",
                                                                }}
                                                                className="sb-plan-header"
                                                            >
                                                                <Trans>GOOGLE BOOSTER</Trans>
                                                            </b>
                                                            {/* <div
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={(e) => {
                                                                    let obj = {};
                                                                    let temp =
                                                                        this.state["sub3"];
                                                                    obj["sub3"] = temp ? 0 : 1;
                                                                    this.setState(obj);
                                                                }}
                                                            >
                                                                {this.state["sub3"] ? (
                                                                    <DropupIcon />
                                                                ) : (
                                                                    <DropdownIcon />
                                                                )}
                                                            </div> */}
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right pcl1-null"
                                                    ></Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right pcl2-null"
                                                    ></Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pcl3-null"
                                                    ></Col>
                                                </Row>
                                                {this.state["sub3"] ? (
                                                    <div className="fade-in-div">
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                            >
                                                                {this.state.showId ==
                                                                    "sb-sitemap" && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>Sitemap</Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.d1}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.d1}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.d1}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                            >
                                                                {this.state.showId ==
                                                                    "sb-json-ld-basic" && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>Basic Snippets</Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.d2}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.d2}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.d2}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row "
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                            >
                                                                {this.state.showId ==
                                                                    "sb-json-ld-advanced" && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>Advanced Snippets</Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.d3}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.d3}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.d3}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row"
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                id="sb-google-index"
                                                            >
                                                                {this.state.showId ==
                                                                    "sb-google-index" && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        width: "100%",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            margin: "auto 0% auto 12%",
                                                                            width: "fit-content",
                                                                        }}
                                                                    >
                                                                        <Trans>
                                                                            URLs Verification
                                                                        </Trans>
                                                                    </div>
                                                                    {/* <NewSvg /> */}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                {firstColumm.check.d4}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                {secondColumm.check.d4}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                {thirdColumm.check.d4}
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}

                                                <Row justify="center" className="pricing-row-1">
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right"
                                                        id="sb-content-optimization"
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <b
                                                                style={{
                                                                    margin: "auto 0% auto 12%",
                                                                    width: "78%",
                                                                }}
                                                                className="sb-plan-header"
                                                            >
                                                                <Trans>
                                                                    CONTENT OPTIMIZATION
                                                                </Trans>
                                                            </b>
                                                            {/* <div
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={(e) => {
                                                                    let obj = {};
                                                                    let temp =
                                                                        this.state["sub4"];
                                                                    obj["sub4"] = temp ? 0 : 1;
                                                                    this.setState(obj);
                                                                }}
                                                            >
                                                                {this.state["sub4"] ? (
                                                                    <DropupIcon />
                                                                ) : (
                                                                    <DropdownIcon />
                                                                )}
                                                            </div> */}
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right pcl1-null"
                                                    ></Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right pcl2-null"
                                                    ></Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pcl3-null"
                                                    ></Col>
                                                </Row>
                                                {this.state["sub4"] ? (
                                                    <div className="fade-in-div">
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row"
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                id="sb-keyword-research"
                                                            >
                                                                {this.state.showId ==
                                                                    "sb-keyword-research" && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>
                                                                        Keyword Research
                                                                    </Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                {firstColumm.check.e1}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                {secondColumm.check.e1}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                {thirdColumm.check.e1}
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row"
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                id="sb-keyword-audit"
                                                            >
                                                                {this.state.showId ==
                                                                    "sb-keyword-audit" && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>Keyword Audit</Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                {firstColumm.check.e2}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                {secondColumm.check.e2}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                {thirdColumm.check.e2}
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}

                                                <Row justify="center" className="pricing-row-1">
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right"
                                                        id="sb-site-analysis"
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <b
                                                                style={{
                                                                    margin: "auto 0% auto 12%",
                                                                    width: "78%",
                                                                }}
                                                                className="sb-plan-header"
                                                            >
                                                                <Trans>SITE ANALYSIS</Trans>
                                                            </b>
                                                            {/* <div
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={(e) => {
                                                                    let obj = {};
                                                                    let temp =
                                                                        this.state["sub5"];
                                                                    obj["sub5"] = temp ? 0 : 1;
                                                                    this.setState(obj);
                                                                }}
                                                            >
                                                                {this.state["sub5"] ? (
                                                                    <DropupIcon />
                                                                ) : (
                                                                    <DropdownIcon />
                                                                )}
                                                            </div> */}
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        span={6}
                                                        xl={6}
                                                        className="pricing-card pricing-border-right pcl1-null"
                                                    ></Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right pcl2-null"
                                                    ></Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pcl3-null"
                                                    ></Col>
                                                </Row>
                                                {this.state["sub5"] ? (
                                                    <div className="fade-in-div">
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row"
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                id="sb-site-diagnosis"
                                                            >
                                                                {/* {
                                                                                this.state.showId == "sb-site-diagnosis" &&
                                                                                <img
                                                                                    src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                                    style={stylePointer}
                                                                                />
                                                                            } */}
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>
                                                                    Detailed SEO Report
                                                                    </Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.f1}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.f1}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.f1}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row"
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                id="sb-speed-analysis"
                                                            >
                                                                {/* {
                                                                                this.state.showId == "sb-site-diagnosis" &&
                                                                                <img
                                                                                    src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                                    style={stylePointer}
                                                                                />
                                                                            } */}
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>
                                                                        Speed Analysis
                                                                    </Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.f2}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.f2}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.f2}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row"
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                id="sb-amp"
                                                            >
                                                                {/* {
                                                                                this.state.showId == "sb-amp" &&
                                                                                <img
                                                                                    src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                                    style={stylePointer}
                                                                                />
                                                                            } */}
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        width: "100%",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            margin: "auto 0% auto 12%",
                                                                            width: "fit-content",
                                                                        }}
                                                                    >
                                                                        <Trans>
                                                                            Instant Page
                                                                        </Trans>
                                                                    </div>
                                                                    {/* <NewSvg /> */}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                {firstColumm.check.f3}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                {secondColumm.check.f3}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                {thirdColumm.check.f3}
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row"
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                id="sb-amp"
                                                            >
                                                                {this.state.showId ==
                                                                    "sb-amp" && (
                                                                    <img
                                                                        src="https://media3.giphy.com/media/L14hTCPrgdE2Ppvu2W/giphy.gif"
                                                                        style={stylePointer}
                                                                    />
                                                                )}
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        width: "100%",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            margin: "auto 0% auto 12%",
                                                                            width: "fit-content",
                                                                        }}
                                                                    >
                                                                        <Trans>AMP</Trans>
                                                                    </div>
                                                                    {/* <NewSvg /> */}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                {firstColumm.check.f4}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                {secondColumm.check.f4}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                {thirdColumm.check.f4}
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row"
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                id="sb-img-compress"
                                                            >
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        width: "100%",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            margin: "auto 0% auto 12%",
                                                                            width: "fit-content",
                                                                        }}
                                                                    >
                                                                        <Trans>
                                                                            Image Compress
                                                                        </Trans>
                                                                    </div>
                                                                    {/* <NewSvg /> */}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.f5}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.f5}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.f5}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}

                                                <Row
                                                    justify="center"
                                                    className={
                                                        "pricing-row-1 " +
                                                        this.state.classRowSupport
                                                    }
                                                >
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right"
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <b
                                                                style={{
                                                                    margin: "auto 0% auto 12%",
                                                                    width: "78%",
                                                                }}
                                                                className="sb-plan-header"
                                                            >
                                                                <Trans>SUPPORT</Trans>
                                                            </b>
                                                            {/* <div
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={(e) => {
                                                                    let obj = {};
                                                                    let temp =
                                                                        this.state["sub8"];
                                                                    obj["sub8"] = temp ? 0 : 1;
                                                                    this.setState({
                                                                        classRowSupport: !temp
                                                                            ? ""
                                                                            : "sb-row-support-plan",
                                                                    });
                                                                    this.setState(obj);
                                                                }}
                                                            >
                                                                {this.state["sub8"] ? (
                                                                    <DropupIcon />
                                                                ) : (
                                                                    <DropdownIcon />
                                                                )}
                                                            </div> */}
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right pcl1-null"
                                                    ></Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pricing-border-right pcl2-null"
                                                    ></Col>
                                                    <Col
                                                        span={6}
                                                        className="pricing-card pcl3-null"
                                                    ></Col>
                                                </Row>
                                                {this.state["sub8"] ? (
                                                    <div
                                                        className={
                                                            "fade-in-div sb-last-option-plan"
                                                        }
                                                    >
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row"
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                            >
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>Livechat</Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.g1}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.g1}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.g1}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row"
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                            >
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>Newsletter</Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {firstColumm.check.g2}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {secondColumm.check.g2}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pcl3"
                                                            >
                                                                <div
                                                                    style={{
                                                                        margin: "auto auto",
                                                                        width: "fit-content",
                                                                    }}
                                                                >
                                                                    {thirdColumm.check.g2}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row
                                                            justify="center"
                                                            className="pricing-row"
                                                        >
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right"
                                                                style={{
                                                                    borderRadius: "0 0 0 16px",
                                                                }}
                                                                id="test"
                                                            >
                                                                <font
                                                                    style={{
                                                                        margin: "auto 0% auto 12%",
                                                                    }}
                                                                >
                                                                    <Trans>
                                                                    Expert Customized Service
                                                                    </Trans>
                                                                </font>
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl1"
                                                            >
                                                                {firstColumm.check.g3}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card pricing-border-right pcl2"
                                                            >
                                                                {secondColumm.check.g3}
                                                            </Col>
                                                            <Col
                                                                span={6}
                                                                className="pricing-card last-card pcl3"
                                                                style={{
                                                                    borderRadius: "0 0 16px 0",
                                                                }}
                                                            >
                                                                {thirdColumm.check.g3}
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </Layout>
                                </div>

                            </div>
                        )
                    }
                </div>

                {this.state.comfirmPremiumPlan ? (<ComfirmPopup
                    visible={1}
                    onCancel={()=>{
                        // console.log('onCancel');
                        this.setState({comfirmPremiumPlan:0});
                    }}
                    comfirmPay={()=>{
                        setCookie({ name: "type_charge", value: "up" },1);
                        setCookie({ name: "plan_charge", value: "pro" },1);

                        fetch(`https://www.google-analytics.com/collect?v=1&t=event&tid=UA-53113273-31&cid=e89af982-d7d8-415c-9bd0-b306d9b1ce53&ec=quick-start&ea=qs-premium&ev=1&el=${shop_name}`)

                        this.chargePlan(proId);
                        
                    }}
                    title={"Confirm upgrade"}
                    textPlan={<>{"Premium Plan: "}<span style={{color: 'rgba(88, 202, 140, 1)',fontWeight: 'bold'}} >$39/{"month"}</span></>}
                    content={"Confirm you’ll upgrade to enjoy more of our advanced and auto features!"}
                    textBtnComfirm={("UPGRADE & START FREE TRIAL")}
                />) : ""}
             
                {this.state.comfirmEnterprisePlan ? (<ComfirmPopup
                    visible={1}
                    onCancel={()=>{
                        // console.log('onCancel');
                        this.setState({comfirmEnterprisePlan:0});
                    }}
                    comfirmPay={()=>{
                        setCookie({ name: "type_charge", value: "up" }, 1);
                        setCookie({ name: "plan_charge", value: "unl" }, 1);

                        fetch(`https://www.google-analytics.com/collect?v=1&t=event&tid=UA-53113273-31&cid=e89af982-d7d8-415c-9bd0-b306d9b1ce53&ec=quick-start&ea=qs-enterprise&ev=1&el=${shop_name}`)

                        this.chargePlan(unlimitedId);

                    }}
                    title={"Confirm upgrade"}
                    textPlan={<>{"Enterprise Plan: "}<span style={{color: 'rgba(88, 202, 140, 1)',fontWeight: 'bold'}}>$79/{"month"}</span></>}
                    content={"Confirm you’ll upgrade to enjoy more of our advanced and auto features!"}
                    textBtnComfirm={("UPGRADE & START FREE TRIAL")}
                />) : ""}  

            </div>
        );
    }
}
export default Pricing;
