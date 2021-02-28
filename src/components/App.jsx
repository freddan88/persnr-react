import React, { useState, useEffect } from "react";
import { formatForDatabase, formatForView, getText } from "../utils/functions";
import { personalNumberSettings } from "../data/settings";
import Navbar from "./Navbar";

const App = () => {
  const [userValue, setUserValue] = useState("");
  const [submitedValues, setSubmitedValues] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("sweden");
  const [currentLanguage, setCurrentLanguage] = useState("swedish");
  const [formMessage, setFormMessage] = useState({ type: "", message: "" });

  // Personal Number
  const pnrFormat = personalNumberSettings[currentCountry].format;
  const pnrDelimiter = personalNumberSettings[currentCountry].delimiter;
  const pnrRegexPattern = personalNumberSettings[currentCountry].regexPattern;
  const dateOfBirthLength = pnrFormat.split(pnrDelimiter)[0].length;
  const pnrMaxLength = pnrFormat.length;

  // Translations
  const pnrErrorForValue = getText(currentLanguage, "pnr_error_value");
  const formSuccess = getText(currentLanguage, "form_success");

  useEffect(() => {
    // Documentation hooks as lifecycle-methods:
    // https://dev.to/trentyang/replace-lifecycle-with-hooks-in-react-3d4n
    if (formMessage.type === "") return;
    const messagesTimeout = setTimeout(() => {
      printMessage("", "");
      clearTimeout(messagesTimeout);
    }, 2000);
    return () => clearTimeout(messagesTimeout);
  }, [formMessage]);

  const printMessage = (type, message) => {
    setFormMessage({ type, message });
  };

  const handleChange = (e) => {
    const currentValue = e.target.value.toUpperCase();
    const isDeleting = userValue.length > currentValue.length;
    const deleteChar = isDeleting && currentValue.length === dateOfBirthLength;
    const insertDelimiter = currentValue.length === dateOfBirthLength;
    const valueSliced = currentValue.slice(0, dateOfBirthLength - 1);
    const valueDelimited = currentValue.concat(pnrDelimiter);
    if (deleteChar) return setUserValue(valueSliced);
    if (isDeleting) return setUserValue(currentValue);
    if (pnrDelimiter && insertDelimiter) return setUserValue(valueDelimited);
    setUserValue(currentValue.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userValue.length > 0 && userValue.match(pnrRegexPattern)) {
      const currentObject = {
        currentCountry,
        submitedValue: userValue,
        databaseValue: userValue,
      };
      const values = [...submitedValues, currentObject];
      printMessage("success", formSuccess);
      setSubmitedValues(values);
      setUserValue("");
      return;
    }
    printMessage("error", pnrErrorForValue);
  };

  const renderNumbers = () => {
    return submitedValues.map((value, i) => {
      const databaseValue = formatForDatabase(value.databaseValue);
      const userCountry = getText(currentLanguage, value.currentCountry);
      return (
        <div className="values-container" key={i}>
          <small>{userCountry}</small>
          <p>
            <strong>{getText(currentLanguage, "formated_value")}:</strong>
            <span>{formatForView(databaseValue)}</span>
          </p>
          <p>
            <strong>{getText(currentLanguage, "formated_db_value")}:</strong>
            <span>{databaseValue}</span>
          </p>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <Navbar
        language={currentLanguage}
        setCountry={setCurrentCountry}
        setLanguage={setCurrentLanguage}
        setValue={setUserValue}
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor="persnr">{getText(currentLanguage, "pnr")}</label>
        <small>
          {getText(currentLanguage, "format")}: {pnrFormat}
        </small>
        <div className="input-field">
          <input
            required
            autoFocus
            type="text"
            id="persnr"
            name="persnr"
            value={userValue}
            autoComplete="off"
            onChange={handleChange}
            title={pnrErrorForValue}
            maxLength={pnrMaxLength}
            pattern={pnrRegexPattern}
          />
          <span>&#10003;</span>
        </div>
        <small className={formMessage.type}>{formMessage.message}</small>
        <input type="submit" value={getText(currentLanguage, "submit")} />
      </form>
      <hr />
      {renderNumbers()}
    </div>
  );
};

export default App;
