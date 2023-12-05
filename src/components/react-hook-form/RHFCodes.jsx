import { useRef } from "react";
import { Stack, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
function RHFCodes({ keyName = "", inputs = [], ...other }) {
  const codesRef = useRef(null);
  const { control } = useFormContext();

  const handleChangeWithNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;

    const fieldIndex = name.replace(keyName, ""); //'code1' => '1' , 'code2' => '2' etc..

    const fieldIntIndex = Number(fieldIndex); // '1' => 1

    const nextField = document.querySelector(
      `input[name=${keyName}${fieldIntIndex + 1}]`
    ); // selects the next field by looking for name attribute in the <input> element (attribute selector)

    if(value.length > maxLength){
        event.target.value = value[0]
    } // shortens the input to one character if it exceeds maxLength = 1
    
    if(value.length >= maxLength && fieldIntIndex < 6 && nextField !== null){
        nextField.focus()
    }

    handleChange(event)
  };
  return (
    <Stack direction={"row"} spacing={2} justifyContent="center" ref={codesRef}>
      {inputs.map((name, index) => (
        <Controller
          control={control}
          key={name}
          name={`${keyName}${index + 1}`}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              autoFocus={index === 0}
              placeholder="-"
              onChange={(event) => {handleChangeWithNextField(event,field.onChange)}}
              onFocus={(event) => event.currentTarget.select()}
              InputProps={{
                sx: {
                  width: { xs: 36, sm: 56 },
                  height: { xs: 36, sm: 56 },
                  "& input": { p: 0, textAlign: "center" },
                },
              }}
              {...other}
            />
          )}
        />
      ))}
    </Stack>
  );
}

export default RHFCodes;
