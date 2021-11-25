import { Select, MenuItem } from "@mui/material";
import valuesConfig from "../config/values.config";
import { useState } from "react";
export default function Filter({ setFilters }) {
  const initial = {
    operatingSystem: "",
    keyboardLayout: "",
    displaySize: "",
    modelYear: "",
    availability: "",
  };

  const [values, setValues] = useState(initial);
  return (
    <>
      <div className="filter">
        <div className="filter__item">
          <Select label="Operating System" placeholder="Keyboard Layout">
            {valuesConfig.operatingSystem.map((os) => (
              <MenuItem>{os}</MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
}
