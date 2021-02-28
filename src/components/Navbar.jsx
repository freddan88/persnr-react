import React from "react";
import { languages } from "../data/languages";
import { getText } from "../utils/functions";

const Navbar = (props) => {
  const SELECT_LANGUAGES = getText(props.language, "select_languages");

  const handleChange = (e) => {
    const valueObject = JSON.parse(e.target.value);
    props.setLanguage(valueObject.language);
    props.setCountry(valueObject.country);
    props.setValue("");
  };

  const renderOptions = () => {
    return languages.map((language, i) => {
      return (
        <option key={i} value={JSON.stringify(language.values)}>
          {getText(props.language, language.values.language)}
        </option>
      );
    });
  };

  return (
    <nav>
      <label htmlFor="language">{SELECT_LANGUAGES}:</label>
      <select name="language" id="language" onChange={handleChange}>
        {renderOptions()}
      </select>
    </nav>
  );
};

export default Navbar;
