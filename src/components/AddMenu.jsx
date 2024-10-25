import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, FieldArray, Form } from "formik";
import * as Yup from "yup";

const AddMenu = () => {
  // Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
    vegetables: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        price: Yup.number().required("Required").positive("Must be +ve"),
      })
    ),
  });

  // Default tomorrow's date
  const initialValues = {
    date: dayjs().add(1, "day"),
    vegetables: [{ name: "", price: "" }],
  };

  return (
    <Box p={3}>
      <Typography variant="h6" marginBottom={2}>
        Set Menu
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form Data", values);
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            {/* Date Picker */}
            <FormControl fullWidth margin="normal">
              <DatePicker
                sx={{ marginBottom: 2 }}
                label="Select Date"
                value={values.date}
                onChange={(newValue) => setFieldValue("date", newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={touched.date && Boolean(errors.date)}
                    helperText={touched.date && errors.date}
                  />
                )}
              />
            </FormControl>

            {/* Vegetables Input */}
            <FieldArray name="vegetables">
              {({ push, remove }) => (
                <>
                  {values.vegetables.map((vegetable, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      gap={1}
                      marginBottom={2}
                    >
                      <FormControl fullWidth>
                        <TextField
                          label={`Vegetable ${index + 1}`}
                          name={`vegetables[${index}].name`}
                          value={vegetable.name}
                          onChange={(e) =>
                            setFieldValue(
                              `vegetables[${index}].name`,
                              e.target.value
                            )
                          }
                          error={Boolean(errors.vegetables?.[index]?.name)}
                          helperText={errors.vegetables?.[index]?.name}
                        />
                      </FormControl>

                      <FormControl fullWidth>
                        <TextField
                          label="Price"
                          type="number"
                          name={`vegetables[${index}].price`}
                          value={vegetable.price}
                          onChange={(e) =>
                            setFieldValue(
                              `vegetables[${index}].price`,
                              e.target.value
                            )
                          }
                          error={Boolean(errors.vegetables?.[index]?.price)}
                          helperText={errors.vegetables?.[index]?.price}
                        />
                      </FormControl>

                      <IconButton onClick={() => remove(index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}

                  {/* Add New Vegetable Button */}
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleIcon />}
                    onClick={() => push({ name: "", price: "" })}
                  >
                    Add Vegetable
                  </Button>
                </>
              )}
            </FieldArray>

            {/* Submit Button */}
            <Box marginTop={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Save Menu
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddMenu;
