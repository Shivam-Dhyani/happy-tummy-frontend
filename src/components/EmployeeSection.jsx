import {
  MenuItem,
  Container,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Typography,
  Box,
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
import { useEffect, useRef } from "react";
import { resetAddTiffinDataStatus } from "../redux/slices/allSlice";

const EmployeeSection = () => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const {
    employeesData,
    employeesDataStatus,
    vegetablesData,
    vegetablesDataStatus,
    addTiffinDataStatus,
  } = useSelector((state) => state.all);

  console.log("vegetablesData::", vegetablesData);

  // Validation schema for the form
  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Employee Name is required"),
    date: Yup.date().required("Date is required"),
    tiffinType: Yup.string().required("Tiffin Type is required"),
    vegetableId: Yup.string().required("Vegetable selection is required"),
  });

  // Dropdown options
  const tiffinTypes = [
    { name: "Full", value: "full" },
    { name: "Half", value: "half" },
    { name: "Only Veggie", value: "only-veggie" },
  ];

  const handleFormSubmit = (values) => {
    const dateWithZeroTime = dayjs(values.date)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
    console.log("values::", dateWithZeroTime.toISOString());
    const addTiffinPayload = {
      ...values,
      date: dateWithZeroTime.toISOString(),
    };
    dispatch(addTiffin(addTiffinPayload));
  };

  // API Call for get Employees
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  // API Call for get vegetables
  useEffect(() => {
    if (addTiffinDataStatus === "idle") {
      const todayDate = dayjs()
        .add(1, "day")
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toISOString();
      const getVegetablesPayload = { date: todayDate };
      dispatch(getVegtables(getVegetablesPayload));
    }
  }, [addTiffinDataStatus, dispatch]);

  useEffect(() => {
    if (addTiffinDataStatus === "success") {
      formikRef.current.resetForm();
      dispatch(resetAddTiffinDataStatus());
    }
  }, [addTiffinDataStatus, dispatch]);

  return (
    <Container>
      <Typography pt={3} variant="h6" marginBottom={1}>
        Select Your Tiffin
      </Typography>
      <Formik
        innerRef={formikRef}
        initialValues={{
          employeeId: "",
          date: dayjs().add(1, "day"),
          tiffinType: "",
          vegetableId: "",
          vegetableDateId: "",
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
        }) => {
          // console.log("values::", values.date);
          return (
            <Form>
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
                      date: dayjs(newValue)
                        .hour(0)
                        .minute(0)
                        .second(0)
                        .millisecond(0)
                        .toISOString(),
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
                  {tiffinTypes.map((type, idx) => (
                    <MenuItem key={idx} value={type?.value}>
                      {type?.name}
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
                  onChange={(newValue) => {
                    handleChange(newValue);
                    setFieldValue("vegetableDateId", vegetablesData[0]?._id);
                  }}
                  onBlur={handleBlur}
                  disabled={vegetablesDataStatus !== "success"}
                >
                  {vegetablesData[0]?.vegetables?.map((veg, idx) => (
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
              <Button
                sx={{ marginTop: 2 }}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit Order
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default EmployeeSection;
