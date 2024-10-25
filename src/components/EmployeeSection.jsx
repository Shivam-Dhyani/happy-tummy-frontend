import {
  MenuItem,
  Container,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  addTiffin,
  getEmployees,
  getVegtables,
} from "../redux/thunks/allThunk";
import { useEffect } from "react";

const EmployeeSection = () => {
  const dispatch = useDispatch();
  const {
    employeesData,
    employeesDataStatus,
    vegetablesData,
    vegetablesDataStatus,
  } = useSelector((state) => state.all);

  // Validation schema for the form
  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Employee Name is required"),
    date: Yup.date().required("Date is required"),
    tiffinType: Yup.string().required("Tiffin Type is required"),
    vegetableId: Yup.string().required("Vegetable selection is required"),
  });

  // Dropdown options
  const tiffinTypes = ["Full", "Half", "Only Veggie"];

  const handleFormSubmit = (values) => {
    console.log(values);
    const addTiffinPayload = {
      ...values,
    };
    dispatch(addTiffin(addTiffinPayload));
  };

  // API Calls
  useEffect(() => {
    dispatch(getEmployees());
    const todayDate = dayjs().format("YYYY-MM-DD");
    const getVegetablesPayload = { date: todayDate };
    dispatch(getVegtables(getVegetablesPayload));
  }, [dispatch]);

  return (
    <Container>
      <Formik
        initialValues={{
          employeeId: "",
          date: dayjs().set("hour", 0).set("minute", 0).set("second", 0),
          tiffinType: "",
          vegetableId: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched,
          errors,
          touched,
        }) => (
          <Form>
            {/* Employee Name Dropdown */}
            <FormControl
              fullWidth
              margin="normal"
              error={touched.employeeId && Boolean(errors.employeeId)}
            >
              <InputLabel id="employee-name-label">Employee Name</InputLabel>
              <Select
                labelId="employee-name-label"
                name="employeeId"
                value={values.employeeId}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={employeesDataStatus !== "success"}
              >
                {employeesData.map((employee, idx) => (
                  <MenuItem key={idx} value={employee?._id}>
                    {employee?.name}
                  </MenuItem>
                ))}
              </Select>
              {touched?.employeeId && errors?.employeeId && (
                <FormHelperText>{errors.employeeId}</FormHelperText>
              )}
            </FormControl>
            {/* Date Picker */}
            <FormControl
              fullWidth
              margin="normal"
              error={touched.date && Boolean(errors.date)}
            >
              <DatePicker
                label="Select Date"
                value={values.date}
                onChange={(newValue) => {
                  setFieldValue("date", newValue);
                  console.log("newValue:", newValue);

                  const getVegetablesPayload = {
                    date: dayjs(newValue).format("YYYY-MM-DD"),
                  };
                  dispatch(getVegtables(getVegetablesPayload));
                }}
                onBlur={() => {
                  setFieldTouched("date", true);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={touched.date && Boolean(errors.date)}
                  />
                )}
              />
              {touched.date && errors.date && (
                <FormHelperText>{errors.date}</FormHelperText>
              )}
            </FormControl>

            {/* Tiffin Type Dropdown */}
            <FormControl
              fullWidth
              margin="normal"
              error={touched.tiffinType && Boolean(errors.tiffinType)}
            >
              <InputLabel id="tiffin-type-label">Tiffin Type</InputLabel>
              <Select
                labelId="tiffin-type-label"
                name="tiffinType"
                value={values.tiffinType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {tiffinTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {touched.tiffinType && errors.tiffinType && (
                <FormHelperText>{errors.tiffinType}</FormHelperText>
              )}
            </FormControl>

            {/* Vegetable Dropdown */}
            <FormControl
              fullWidth
              margin="normal"
              error={touched.vegetableId && Boolean(errors.vegetableId)}
            >
              <InputLabel id="vegetable-label">Vegetable</InputLabel>
              <Select
                labelId="vegetable-label"
                name="vegetableId"
                value={values.vegetableId}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={vegetablesDataStatus !== "success"}
              >
                {vegetablesData.map((veg, idx) => (
                  <MenuItem key={idx} value={veg?._id}>
                    {veg?.name}
                  </MenuItem>
                ))}
              </Select>
              {touched.vegetableId && errors.vegetableId && (
                <FormHelperText>{errors.vegetableId}</FormHelperText>
              )}
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit Order
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EmployeeSection;
