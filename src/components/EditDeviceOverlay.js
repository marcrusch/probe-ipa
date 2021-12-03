import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import valuesConfig from "../config/values.config";

export default function EditDeviceOverlay({
  device,
  onEdit: onEditProp,
  onDelete: onDeleteProp,
  onCreate: onCreateProp,
  onCancel,
}) {
  let initial = {
    operatingSystem: "",
    keyboardLayout: "",
    displaySize: "",
    modelYear: "",
    comment: "",
  };
  if (onEditProp) {
    initial = {
      operatingSystem: device.operatingSystem,
      keyboardLayout: device.keyboardLayout,
      displaySize: device.displaySize,
      modelYear: device.modelYear,
      comment: device.comment,
    };
  }

  const [values, setValues] = useState(initial);

  const onEdit = () => {
    onEditProp({ id: device._id, data: values });
  };

  const onDelete = () => {
    onDeleteProp({ id: device._id });
  };

  const onCreate = () => {
    onCreateProp(values);
  };

  const onValueChange = (valueName, value) => {
    setValues({ ...values, [valueName]: value });
  };

  return (
    <>
      <div className="edit-device-overlay">
        <div className="edit-device-overlay__window">
          {onEditProp && (
            <div className="edit-device-overlay__title">Edit Device</div>
          )}
          {onCreateProp && (
            <div className="edit-device-overlay__title">Create Device</div>
          )}
          <form className="device-overlay__edit-form">
            {onEditProp && (
              <div className="device-overlay__edit-form-item">
                <TextField
                  placeholder="Id"
                  label="Id"
                  value={device._id}
                  disabled
                />
              </div>
            )}
            <div className="device-overlay__edit-form-item">
              <FormControl fullWidth>
                <InputLabel id="operating-system-select-label">
                  Operating System
                </InputLabel>
                <Select
                  labelId="operating-system-select-label"
                  value={values.operatingSystem}
                  label="Operating System"
                  onChange={(e) =>
                    onValueChange("operatingSystem", e.target.value)
                  }
                >
                  {valuesConfig.operatingSystem.map((item) => (
                    <MenuItem value={item} key={`menuItem__${item}`}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="device-overlay__edit-form-item">
              <FormControl fullWidth>
                <InputLabel id="keyboard-layout-select-label">
                  Keyboard Layout
                </InputLabel>
                <Select
                  labelId="keyboard-layout-select-label"
                  value={values.keyboardLayout}
                  label="Keyboard Layout"
                  onChange={(e) =>
                    onValueChange("keyboardLayout", e.target.value)
                  }
                >
                  {valuesConfig.keyboardLayout.map((item) => (
                    <MenuItem value={item} key={`menuItem__${item}`}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="device-overlay__edit-form-item">
              <FormControl fullWidth>
                <InputLabel id="display-size-select-label">
                  Display Size
                </InputLabel>
                <Select
                  labelId="display-size-select-label"
                  value={values.displaySize}
                  label="Display Size"
                  onChange={(e) => onValueChange("displaySize", e.target.value)}
                >
                  {valuesConfig.displaySize.map((item) => (
                    <MenuItem value={item} key={`menuItem__${item}`}>
                      {item.slice(5) + '"'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="device-overlay__edit-form-item">
              <FormControl fullWidth>
                <InputLabel id="model-year-select-label">Model Year</InputLabel>
                <Select
                  labelId="model-year-select-label"
                  value={values.modelYear}
                  label="Model Year"
                  onChange={(e) => onValueChange("modelYear", e.target.value)}
                >
                  {valuesConfig.modelYear.map((item) => (
                    <MenuItem value={item} key={`menuItem__${item}`}>
                      {item.slice(5)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="device-overlay__edit-form-item">
              <TextField
                placeholder="Comment"
                label="Comment"
                fullWidth
                value={values.comment}
                onChange={(e) => onValueChange("comment", e.target.value)}
              />
            </div>
          </form>
          <div className="device-overlay__operations">
            <Button onClick={onCancel} sx={{ margin: "10px" }}>
              Cancel
            </Button>
            {onDeleteProp && (
              <Button
                onClick={onDelete}
                variant="contained"
                sx={{ margin: "10px" }}
              >
                Delete Device
              </Button>
            )}
            {onEditProp && (
              <Button
                onClick={onEdit}
                variant="contained"
                sx={{ margin: "10px" }}
              >
                Edit Device
              </Button>
            )}
            {onCreateProp && (
              <Button
                onClick={onCreate}
                variant="contained"
                sx={{ margin: "10px" }}
              >
                Create Device
              </Button>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .edit-device-overlay {
          position: fixed;
          width: 100vw;
          height: 100vh;
          background-color: #ffffffaa;
          z-index: 10;
          top: 0;
          left: 0;
        }

        .edit-device-overlay__title {
          margin: 0;
        }

        .edit-device-overlay__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .edit-device-overlay__window {
          position: absolute;
          background-color: #ffffff;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid #444;
          border-radius: 10px;
          padding: 25px;
        }

        .device-overlay__edit-form-item {
          padding: 10px 0;
        }
      `}</style>
    </>
  );
}
