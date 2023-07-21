import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ExtensionIcon from "@mui/icons-material/Extension";
import { useState } from "react";

interface Props {
  data: {
    message: string;
  };
}

interface ControlProps {
  onSave(data: Props): void;
  onChange(data: Props): void;
}

const PluginButton = ({ data }: Props) => {
  return <button onClick={() => alert(data.message)}>message</button>;
};

/**
 * We export render function to be called by DexAppBuilder dinamically
 * @param data
 * @returns
 */
export function render({ data }: Props) {
  return <PluginButton data={data} />;
}

const defaultValues = {
  message: "dexkit rocks",
};

/**
 * Render controls is called by DexAppBuilder to render a form to update this section and add data
 * @param controls
 * @returns
 */
export function renderControls(controls: ControlProps) {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    controls.onChange({ data: defaultValues });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    controls.onSave({ data: defaultValues });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" direction="column">
        <Grid item>
          <TextField
            id="message-input"
            name="message"
            label="Name"
            type="text"
            value={formValues.message}
            onChange={handleInputChange}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
}

/**
 * Metadata used to display plugin on DexAppBuilder
 */
export const metadata = {
  type: "plugin",
  title: "Example Button",
  subtitle: "Example Button to be used inside DexAppBuilder",
  category: "misc", // misc, swap, nft, exchange, web3
  icon: <ExtensionIcon />,
};
