import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { IoCloudUploadOutline } from "react-icons/io5";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Dashboard = () => {
  //   Upload file
  const [loading, setLoading] = useState("");

  const [rows, setRows] = useState([]);

  const fileInputRef = useRef(null);

  const fileInputRef1 = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };
  const handleImportClick1 = () => {
    fileInputRef1.current.click();
  };

  const handleFileUpload = (e) => {
    console.log("check");
    const file = e.target.files[0];
    console.log("file", file);
    setLoading(true);

    if (file) {
      const formData = new FormData();
      formData.append("movies", file); // Append file to FormData with a name
      console.log("formData", formData);
      axios
        .post(`http://127.0.0.1:8000/santa/employee/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set appropriate content type
          },
        })
        .then((res) => {
          if (res) {
            toast.success("File uploaded successfully", {
              position: "top-right",
              closeButton: true, // Allow manual close
              closeOnClick: true, // Close on click
            });
            setLoading(false);
            getData();
          }
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setLoading(false);
          toast.error("Something Went Wrong", {
            position: "top-right",
            closeButton: true, // Allow manual close
            closeOnClick: true, // Close on click
          });
        })
        .finally(() => {
          // Reset the file input value to allow the same file to be uploaded again
          e.target.value = null;
        });
    }
  };

  //  Get Data

  const getData = () => {
    axios
      .get(`http://127.0.0.1:8000/santa/employee/`, {
        headers: {
          "Content-Type": "multipart/form-data", // Set appropriate content type
        },
      })
      .then((res) => {
        setRows(res?.data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setLoading(false);
        toast.error("Something Went Wrong", {
          position: "top-right",
          closeButton: true,
          closeOnClick: true,
        });
      });
  };

  const [assign, setAssign] = useState([]);

  const [emp, setEmp] = useState([]);

  const handleFileUpload1 = (e) => {
    console.log("check");
    const file = e.target.files[0];
    console.log("file", file);
    setLoading(true);

    if (file) {
      const formData = new FormData();
      formData.append("movies", file); // Append file to FormData with a name
      console.log("formData", formData);
      axios
        .post(`http://127.0.0.1:8000/santa/AssignmentTaskList/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set appropriate content type
            Accept: "application/json",
          },
        })
        .then((res) => {
          if (res) {
            toast.success("File uploaded successfully", {
              position: "top-right",
              closeButton: true, // Allow manual close
              closeOnClick: true, // Close on click
            });
            setLoading(false);
            setAssign(res?.data?.Assinment);
            setEmp(res?.data?.EmployeeList);
          }
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setLoading(false);
          toast.error("Something Went Wrong", {
            position: "top-right",
            closeButton: true, // Allow manual close
            closeOnClick: true, // Close on click
          });
        })
        .finally(() => {
          // Reset the file input value to allow the same file to be uploaded again
          e.target.value = null;
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4 " style={{ height: "700px" }}>
      <Typography className="text-center fw-bold fs-4">
        Secret Santa Game
      </Typography>
      <Box
        sx={{ width: "100%" }}
        className="mb-2 d-flex justify-content-between"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Button
            className="d-flex gap-2 align-items-center rounded-1 bg-info text-white px-3"
            sx={{ height: "33px" }}
            onClick={handleImportClick}
          >
            <span>
              <IoCloudUploadOutline style={{ fontSize: 18 }} />
            </span>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <Typography sx={{ textTransform: "capitalize" }}>
              Upload Employee List
            </Typography>
          </Button>
          {/* Uncomment if needed */}
          <Button
            className="d-flex gap-2 align-items-center rounded-1 bg-info text-white px-3"
            sx={{ height: "33px" }}
            onClick={handleImportClick1}
          >
            <span>
              <IoCloudUploadOutline style={{ fontSize: 18 }} />
            </span>
            <input
              type="file"
              ref={fileInputRef1}
              style={{ display: "none" }}
              onChange={handleFileUpload1}
            />
            <Typography sx={{ textTransform: "capitalize" }}>
              Upload Previous Year Employee List
            </Typography>
          </Button>
        </div>
      </Box>
      <div
        style={{
          alignItems: "center",
          textAlign: "start",
          paddingBottom: "10px",
        }}
      >
        <h4>Employee's List</h4>
      </div>

      <div style={{ maxHeight: "600px", overflowY: "auto" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, minHeight: 400 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow
                sx={{
                  color: "grey",
                }}
              >
                <TableCell>SI No</TableCell>
                <TableCell align="center">Employee Name</TableCell>
                <TableCell align="center">Employee Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        style={{
          alignItems: "center",
          textAlign: "start",
          paddingBottom: "10px",
        }}
      >
        <h4>Previouse Year Employee Assignment List</h4>
      </div>
      <div style={{ maxHeight: "600px", overflowY: "auto" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, minHeight: 400 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow
                sx={{
                  color: "grey",
                }}
              >
                <TableCell>SI No</TableCell>
                <TableCell align="center">Employee Name</TableCell>
                <TableCell align="center">Employee Email</TableCell>
                <TableCell align="center">Child Name</TableCell>
                <TableCell align="center">Child Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emp?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{row?.employee_name}</TableCell>
                  <TableCell align="center">{row?.employee_email}</TableCell>
                  <TableCell align="center">{row?.secret_child_name}</TableCell>
                  <TableCell align="center">
                    {row?.secret_child_email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        style={{
          alignItems: "center",
          textAlign: "start",
          paddingBottom: "10px",
        }}
      >
        <h4>Assignment List</h4>
      </div>
      <div style={{ maxHeight: "600px", overflowY: "auto" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, minHeight: 400 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow
                sx={{
                  color: "grey",
                }}
              >
                <TableCell>SI No</TableCell>
                <TableCell align="center">Employee Name</TableCell>
                <TableCell align="center">Employee Email</TableCell>
                <TableCell align="center">Child Name</TableCell>
                <TableCell align="center">Child Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assign?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{row?.Employee_Name}</TableCell>
                  <TableCell align="center">{row?.Employee_EmailID}</TableCell>
                  <TableCell align="center">{row?.Secret_Child_Name}</TableCell>
                  <TableCell align="center">
                    {row?.Secret_Child_EmailID}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {loading && ( // Display loader when loading state is true
        <Box
          sx={{
            height: "85%",
            width: "100%",
          }}
          className="d-flex justify-content-center mt-4"
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
