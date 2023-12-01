using backend.Models;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        MySqlConnection con = new MySqlConnection("server=localhost;user=root;persistsecurityinfo=True;database=sms_db;password=''");

        [HttpGet("GetStudent")]
        public string GetStudent()
        {
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand("SELECT student.*, course.course_name FROM student LEFT JOIN course ON student.course = course.course_id", con);
                MySqlDataAdapter adapter = new MySqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                adapter.Fill(dt);

                StudentResponceMessageClass response = new StudentResponceMessageClass();
                List<GetStudentClass> studentList = new List<GetStudentClass>();

                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        GetStudentClass getStudent = new GetStudentClass();
                        getStudent.StudentID = Convert.ToString(dt.Rows[i]["student_id"]);
                        getStudent.FirstName = Convert.ToString(dt.Rows[i]["first_name"]);
                        getStudent.LastName = Convert.ToString(dt.Rows[i]["last_name"]);
                        getStudent.Email = Convert.ToString(dt.Rows[i]["email"]);
                        getStudent.PhoneNumber = Convert.ToString(dt.Rows[i]["phone_no"]);
                        getStudent.UserID = Convert.ToString(dt.Rows[i]["user_id"]);
                        getStudent.Course = Convert.ToString(dt.Rows[i]["course_name"]);
                        studentList.Add(getStudent);
                    }

                    if (studentList.Count > 0)
                    {
                        response.Status = "200";
                        response.Data = JsonConvert.SerializeObject(studentList);
                        return JsonConvert.SerializeObject(response);
                    }
                    else
                    {
                        return JsonConvert.SerializeObject("No data Found");
                    }
                }
                else
                {
                    return JsonConvert.SerializeObject("No data Found");
                }
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject($"Error: {ex.Message}");
            }
            finally
            {
                con.Close();
            }
        }


        [HttpPost("InsertStudent")]
        public string PostStudent(StudentClass student)
        {
            StudentResponceMessageClass response = new StudentResponceMessageClass();
            string Id = Guid.NewGuid().ToString();

            MySqlCommand cmd = new MySqlCommand("INSERT INTO Student (student_id, first_name, last_name, email, phone_no, user_id, course) VALUES (@Id, @FirstName, @LastName, @Email, @PhoneNumber, @UserId, @Course)", con);
            cmd.Parameters.AddWithValue("@Id", Id);
            cmd.Parameters.AddWithValue("@FirstName", student.FirstName);
            cmd.Parameters.AddWithValue("@LastName", student.LastName);
            cmd.Parameters.AddWithValue("@Email", student.Email);
            cmd.Parameters.AddWithValue("@PhoneNumber", student.PhoneNumber);
            cmd.Parameters.AddWithValue("@UserId", student.UserID);
            cmd.Parameters.AddWithValue("@Course", student.Course);

            try
            {
                con.Open();
                int i = cmd.ExecuteNonQuery();

                if (i > 0)
                {
                    response.Status = "200";
                    response.Message = "Successfully Inserted Data";
                    return JsonConvert.SerializeObject(response);
                }
                else
                {
                    response.Status = "400";
                    response.Message = "Student Cannot be Inserted";
                    return JsonConvert.SerializeObject(response);
                }
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject($"Error: {ex.Message}");
            }
            finally
            {
                con.Close();
            }
        }

        [HttpPut("UpdateStudent/{id}")]
        public string PutStudent(string id, StudentClass student)
        {
            StudentResponceMessageClass response = new StudentResponceMessageClass();

            MySqlCommand cmd = new MySqlCommand("UPDATE student SET first_name = @FirstName, last_name = @LastName, email = @Email, phone_no = @PhoneNumber, course = @Course WHERE student_id = @Id", con);
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.Parameters.AddWithValue("@FirstName", student.FirstName);
            cmd.Parameters.AddWithValue("@LastName", student.LastName);
            cmd.Parameters.AddWithValue("@Email", student.Email);
            cmd.Parameters.AddWithValue("@PhoneNumber", student.PhoneNumber);
            cmd.Parameters.AddWithValue("@Course", student.Course);

            try
            {
                con.Open();
                int i = cmd.ExecuteNonQuery();

                if (i > 0)
                {
                    response.Status = "200";
                    response.Message = "Successfully Updated Data";
                    return JsonConvert.SerializeObject(response);
                }
                else
                {
                    response.Status = "400";
                    response.Message = "Student Cannot be Updated";
                    return JsonConvert.SerializeObject(response);
                }
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject($"Error: {ex.Message}");
            }
            finally
            {
                con.Close();
            }
        }
        [HttpGet("FindStudent/{id}")]
        public string FindStudent(string id)
        {
            try
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand("SELECT student.*, course.course_name FROM student LEFT JOIN course ON student.course = course.course_id WHERE student.student_id = @Id", con);
                cmd.Parameters.AddWithValue("@Id", id);
                MySqlDataAdapter adapter = new MySqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                adapter.Fill(dt);

                StudentResponceMessageClass response = new StudentResponceMessageClass();
                List<GetStudentClass> studentList = new List<GetStudentClass>();

                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        GetStudentClass getStudent = new GetStudentClass();
                        getStudent.StudentID = Convert.ToString(dt.Rows[i]["student_id"]);
                        getStudent.FirstName = Convert.ToString(dt.Rows[i]["first_name"]);
                        getStudent.LastName = Convert.ToString(dt.Rows[i]["last_name"]);
                        getStudent.Email = Convert.ToString(dt.Rows[i]["email"]);
                        getStudent.PhoneNumber = Convert.ToString(dt.Rows[i]["phone_no"]);
                        getStudent.UserID = Convert.ToString(dt.Rows[i]["user_id"]);
                        getStudent.Course = Convert.ToString(dt.Rows[i]["course_name"]);
                        studentList.Add(getStudent);
                    }

                    if (studentList.Count > 0)
                    {
                        response.Status = "200";
                        response.Data = JsonConvert.SerializeObject(studentList);
                        return JsonConvert.SerializeObject(response);
                    }
                    else
                    {
                        return JsonConvert.SerializeObject("Student not found");
                    }
                }
                else
                {
                    return JsonConvert.SerializeObject("Student not found");
                }
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject($"Error: {ex.Message}");
            }
            finally
            {
                con.Close();
            }
        }

        [HttpDelete("DeleteStudent/{id}")]
        public string DeleteStudent(string id)
        {
            StudentResponceMessageClass response = new StudentResponceMessageClass();
            MySqlCommand cmd = new MySqlCommand("DELETE FROM student WHERE student_id = @Id", con);
            cmd.Parameters.AddWithValue("@Id", id);

            try
            {
                con.Open();
                int i = cmd.ExecuteNonQuery();

                if (i > 0)
                {
                    response.Status = "200";
                    response.Message = "Student Deleted Successfully";
                    return JsonConvert.SerializeObject(response);
                }
                else
                {
                    response.Status = "400";
                    response.Message = "No Data Found";
                    return JsonConvert.SerializeObject(response);
                }
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject($"Error: {ex.Message}");
            }
            finally
            {
                con.Close();
            }
        }
    }
}
