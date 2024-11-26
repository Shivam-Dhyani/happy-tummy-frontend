import { useRef } from "react";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FieldArray, Form } from "formik";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addVegetable } from "../redux/thunks/allThunk";
import { useEffect } from "react";
import { resetAddVegetableDataStatus } from "../redux/slices/allSlice";

const AddMenu = () => {
  const dispatch = useDispatch();
  const formikRef = useRef();

  const { addVegetableDataStatus } = useSelector((state) => state.all);

  useEffect(() => {
    if (addVegetableDataStatus === "success") {
      formikRef.current.resetForm();
      dispatch(resetAddVegetableDataStatus());
    }
  }, [addVegetableDataStatus, dispatch]);

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

  const handleSubmitMenu = (values) => {
    const dateWithZeroTime = dayjs(values.date)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
    const addMenuPayload = {
      ...values,
      date: dateWithZeroTime.toISOString(),
    };
    dispatch(addVegetable(addMenuPayload));
  };

  // Default tomorrow's date
  const initialValues = {
    date: dayjs().add(1, "day"),
    vegetables: [{ name: "", price: 40 }],
  };

  return (
    <Box p={3}>
      <Typography variant="h6" marginBottom={2}>
        Add Menu
      </Typography>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitMenu}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur,
        }) => (
          <Form>
            {/* Date Picker */}
            <FormControl fullWidth margin="normal">
              <DatePicker
                format="DD/MM/YYYY"
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.vegetables?.[index]?.name &&
                            Boolean(errors.vegetables?.[index]?.name)
                          }
                          helperText={
                            touched.vegetables?.[index]?.name &&
                            errors.vegetables?.[index]?.name
                          }
                        />
                      </FormControl>

                      <FormControl fullWidth>
                        <TextField
                          label="Price"
                          type="number"
                          name={`vegetables[${index}].price`}
                          value={vegetable.price}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.vegetables?.[index]?.price &&
                            Boolean(errors.vegetables?.[index]?.price)
                          }
                          helperText={
                            touched.vegetables?.[index]?.price &&
                            errors.vegetables?.[index]?.price
                          }
                        />
                      </FormControl>

                      {values?.vegetables?.length > 1 && (
                        <IconButton onClick={() => remove(index)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                  ))}

                  {/* Add New Vegetable Button */}
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleIcon />}
                    onClick={() => push({ name: "", price: 40 })}
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
                disabled={addVegetableDataStatus === "loading"}
              >
                {addVegetableDataStatus === "loading" && (
                  <Box mr={1} display="flex" justifyContent="center">
                    <CircularProgress color="secondary" size={20} />
                  </Box>
                )}
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
