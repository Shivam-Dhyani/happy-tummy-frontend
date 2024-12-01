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
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { addTiffin, getVegtables } from "../redux/thunks/allThunk";
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

  // Validation schema for the form
  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Employee Name is required"),
    date: Yup.date().required("Date is required"),
    tiffinType: Yup.string().required("Tiffin Type is required"),
    vegetableId: Yup.string().required("Vegetable Selection is required"),
  });

  // Dropdown options
  const tiffinTypes = [
    { name: "Full", value: "full" },
    { name: "Half", value: "half" },
    { name: "Only Sabji", value: "only-sabji" },
  ];

  const handleFormSubmit = (values) => {
    const dateWithZeroTime = dayjs(values.date)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
    const addTiffinPayload = {
      ...values,
      date: dateWithZeroTime.toISOString(),
    };
    dispatch(addTiffin(addTiffinPayload));
  };

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
          return (
            <Form>
              {/* Date Picker */}
              <FormControl
                fullWidth
                margin="normal"
                error={touched.date && Boolean(errors.date)}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  label="Select Date"
                  value={values.date}
                  onChange={(newValue) => {
                    setFieldValue("date", newValue);
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

              {employeesDataStatus === "loading" ||
              vegetablesDataStatus === "loading" ? (
                <Box
                  height={400}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress size={50} />
                </Box>
              ) : vegetablesData.length === 0 ? (
                <Typography color="textSecondary" textAlign="center">
                  No Vegetable Available for this date!
                </Typography>
              ) : (
                <>
                  {/* Employee Name Dropdown */}
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={touched.employeeId && Boolean(errors.employeeId)}
                  >
                    <InputLabel
                      id="employee-name-label"
                      sx={{ backgroundColor: "white", paddingX: "5px" }}
                    >
                      Employee Name
                    </InputLabel>
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
                    <InputLabel
                      id="tiffin-type-label"
                      sx={{ backgroundColor: "white", paddingX: "5px" }}
                    >
                      Tiffin Type
                    </InputLabel>
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
                    <InputLabel
                      id="vegetable-label"
                      sx={{ backgroundColor: "white", paddingX: "5px" }}
                    >
                      Vegetable
                    </InputLabel>
                    <Select
                      labelId="vegetable-label"
                      name="vegetableId"
                      value={values.vegetableId}
                      onChange={(newValue) => {
                        handleChange(newValue);
                        setFieldValue(
                          "vegetableDateId",
                          vegetablesData[0]?._id
                        );
                      }}
                      onBlur={handleBlur}
                      disabled={vegetablesDataStatus !== "success"}
                    >
                      {vegetablesData[0]?.vegetables?.map((veg, idx) => (
                        <MenuItem key={idx} value={veg?._id}>
                          {values.tiffinType === "only-sabji"
                            ? `${veg?.name} (₹${veg?.price})`
                            : veg?.name}
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
                    disabled={addTiffinDataStatus === "loading"}
                  >
                    {addTiffinDataStatus === "loading" && (
                      <Box mr={1} display="flex" justifyContent="center">
                        <CircularProgress color="secondary" size={20} />
                      </Box>
                    )}
                    Submit Order
                  </Button>
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default EmployeeSection;
