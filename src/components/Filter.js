import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import valuesConfig from "../config/values.config";
export default function Filter({ values, setValues }) {
  const initial = {
    operatingSystem: "",
    keyboardLayout: "",
    displaySize: "",
    modelYear: "",
    availability: "",
  };
  const onValueChange = (valueName, value) => {
    setValues({ ...values, [valueName]: value });
  };
  return (
    <>
      <div className="filter">
        <h2 className="filter__title">Filter devices</h2>
        <div className="filter__grid">
          <div className="filter__item">
            <FormControl fullWidth>
              <InputLabel id="filter-item__select-label">
                Operating System
              </InputLabel>
              <Select
                labelId="filter-item__select-label"
                value={values.operatingSystem}
                label="Operating System"
                onChange={(e) =>
                  onValueChange("operatingSystem", e.target.value)
                }
              >
                <MenuItem value="All" key={`menuItem__all`}>
                  All
                </MenuItem>
                {valuesConfig.operatingSystem.map((item) => (
                  <MenuItem value={item} key={`menuItem__${item}`}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="filter__item">
            <FormControl fullWidth>
              <InputLabel id="filter-item__select-label">
                Keyboard Layout
              </InputLabel>
              <Select
                labelId="filter-item__select-label"
                value={values.keyboardLayout}
                label="Keyboard Layout"
                onChange={(e) =>
                  onValueChange("keyboardLayout", e.target.value)
                }
              >
                <MenuItem value="All" key={`menuItem__all`}>
                  All
                </MenuItem>
                {valuesConfig.keyboardLayout.map((item) => (
                  <MenuItem value={item} key={`menuItem__${item}`}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="filter__item">
            <FormControl fullWidth>
              <InputLabel id="filter-item__select-label">
                Display Size
              </InputLabel>
              <Select
                labelId="filter-item__select-label"
                value={values.displaySize}
                label="Display Size"
                onChange={(e) => onValueChange("displaySize", e.target.value)}
              >
                <MenuItem value="All" key={`menuItem__all`}>
                  All
                </MenuItem>
                {valuesConfig.displaySize.map((item) => (
                  <MenuItem value={item} key={`menuItem__${item}`}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="filter__item">
            <FormControl fullWidth>
              <InputLabel id="filter-item__select-label">Model Year</InputLabel>
              <Select
                labelId="filter-item__select-label"
                value={values.modelYear}
                label="Model Year"
                onChange={(e) => onValueChange("modelYear", e.target.value)}
              >
                <MenuItem value="All" key={`menuItem__all`}>
                  All
                </MenuItem>
                {valuesConfig.modelYear.map((item) => (
                  <MenuItem value={item} key={`menuItem__${item}`}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="filter__item">
            <FormControl fullWidth>
              <InputLabel id="filter-item__select-label">
                Availability
              </InputLabel>
              <Select
                labelId="filter-item__select-label"
                value={values.availability}
                label="Availability"
                onChange={(e) => onValueChange("availability", e.target.value)}
              >
                <MenuItem value="All" key={`menuItem__all`}>
                  All
                </MenuItem>
                <MenuItem value="current-available" key={`menuItem__available`}>
                  Currently Available
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <style jsx>{`
        .filter {
          text-align: center;
        }
        .filter__grid {
          display: flex;
          margin-top: 20px;
        }
        .filter__item {
          flex: 1;
          padding: 0 10px;
          text-align: left;
        }
      `}</style>
    </>
  );
}
