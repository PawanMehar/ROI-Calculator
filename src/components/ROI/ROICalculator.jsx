import cancleIcon from "../../assets/icon.svg";
import cakeIcon from "../../assets/icon-round-512.svg";
import pencilIcon from "../../assets/Vector.svg";
import downArrow from "../../assets/downArrow.svg";
import "./ROI.scss";
import { useEffect, useState } from "react";
import { timeFrames } from "./variables/ROIConstants";
const ROICalculator = () => {
  const conversionRate = 8.39;
  const [currency, setCurrency] = useState("usd");
  const [investment, setInvestment] = useState("");
  const [timeFrame, setTimeFrame] = useState({ key: 0, value: 7 });
  const [totalReturn, setReturn] = useState("");
  const [apy, setApy] = useState("");
  const [hide, setHide] = useState(true);
  let isUSD = currency == "usd";

  useEffect(() => {
    convertCurrency(investment, currency, "input");
    convertCurrency(totalReturn, currency, "output");
  }, [currency]);

  const handleOnchange = (e, key) => {
    if (key == "investment") {
      setInvestment(e.target.value);
    } else {
      setReturn(e.target.value);
    }
  };

  const handleTimeFrame = (obj, i) => {
    setTimeFrame({
      key: i,
      value: obj.value
    });
  };

  const handleCurrency = () => {
    let value = currency == "usd" ? "cake" : "usd";
    setCurrency(value);
  };

  const convertCurrency = (value, type, key) => {
    let currencyValue =
      type === "usd" ? value * conversionRate : value / conversionRate;
    if (key == "input")
      investment &&
        setInvestment(String(Number(currencyValue).toFixed(2) || ""));
    else totalReturn && setReturn(String(Number(currencyValue).toFixed(2)));
  };

  const changeCurrency = (value, type) => {
    let currencyValue =
      type == "usd" ? value / conversionRate : value * conversionRate;
    return String(Number(currencyValue).toFixed(2));
  };

  const calculteAPY = () => {
    let input = +investment;
    let gain = +totalReturn - input;
    let apy = ((gain / input + 1) ** (365 / timeFrame.value) - 1) * 100;
    setApy(apy);
  };

  const validateNumber = (e) => {
    var key = e.key;
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      e.preventDefault();
    }
  };

  const handleCancle = () => {
    setInvestment("");
    setReturn("");
  };

  return (
    <div className="main">
      <div className="title">
        <h1>ROI Calculator </h1>
        <img src={cancleIcon} alt="" />
      </div>
      <div className="currency">
        <img src={cakeIcon} alt="" />
        <span className="cake">Cake</span>
        <button
          className={currency === "cake" ? "activeCurrency" : "inactive"}
          onClick={handleCurrency}
        >
          {/* inactive   activeCurrency*/}
          <span></span>
        </button>
        <span>USD</span>
      </div>
      <div className="inputBalance">
        <input
          type="text"
          value={investment}
          onChange={(e) => handleOnchange(e, "investment")}
          onKeyPress={validateNumber}
          placeholder="Enter amount to invest"
        />{" "}
        {investment && currency.toUpperCase()}
      </div>
      <div className="userBalance">
        <div>
          <button className="btn active">USER BALANCE</button>
          <button className="btn">$1000</button>
          <button className="btn">$100</button>
        </div>
        <div className="converted">
          {isUSD ? (
            <p>~ {changeCurrency(investment, currency) || ""} cake</p>
          ) : (
            <p>~ ${changeCurrency(investment, currency)}</p>
          )}
        </div>
      </div>

      <div className="timeFrame">
        <p className="title">Timeframe</p>
        {timeFrames.map((ele, i) => {
          return (
            <button
              className={timeFrame.key === i ? "activePill" : "pill"}
              type="text"
              onClick={() => handleTimeFrame(ele, i)}
              key={i}
            >
              {ele.title}
            </button>
          );
        })}
      </div>
      <div className="AcceleratedAPY">
        <p className="title">Enable Accelerated APY</p>
        <button>
          <span></span>
        </button>
      </div>
      <div className="timeFrameBtn">
        <button className="activePill" type="text">
          Tier 1
        </button>
        <button className="pill" type="text">
          Tier 2
        </button>
        <button className="pill" type="text">
          Tier 3
        </button>
        <button className="pill" type="text">
          Tier 4
        </button>
        <button className="pill" type="text">
          Tier 5
        </button>
      </div>
      <div className="outputBalace">
        <p>ROI at Current Rates</p>
        <div className="outputBox">
          <img src={pencilIcon} alt="" />
          <input
            type="text"
            value={totalReturn}
            onChange={(e) => handleOnchange(e, "return")}
            onKeyPress={validateNumber}
            placeholder="Enter the total return "
          />
          {totalReturn && currency.toUpperCase()}
        </div>
      </div>
      <div className="convertedOutput">
        {isUSD ? (
          <p>~ {changeCurrency(totalReturn, currency) || ""} cake</p>
        ) : (
          <p>~ ${changeCurrency(totalReturn, currency)}</p>
        )}
      </div>
      <div className="submit">
        <button
          className="apply"
          disabled={!investment || !totalReturn}
          onClick={calculteAPY}
        >
          Apply
        </button>
        <button className="cancle" onClick={handleCancle}>
          Cancel
        </button>
      </div>
      <div className="hide" onClick={() => setHide(!hide)}>
        <p>{hide ? "Show" : "Hide"} details </p>
        <img src={downArrow} />
      </div>
      <div className="APY">
        <p>APY</p>
        <p className="apyValue">{apy ? `${Number(apy).toFixed(2)} %` : ""}</p>
      </div>
      <div className={hide ? "dnone" : "notes"}>
        <ul>
          <li>Calculated based on current rates</li>
          <li>
            All fugures are estimates provided for your convenience only, and by
            no means represent guaranted returns.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ROICalculator;
