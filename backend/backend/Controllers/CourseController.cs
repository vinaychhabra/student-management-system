using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Data;
using System.Collections.Generic;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        MySqlConnection con = new MySqlConnection("server=localhost;user=root;persistsecurityinfo=True;database=sms_db;password=''");

        public CourseController()
        {
            // Ensure the course table exists
            CheckAndCreateCourseTable();
        }

        [HttpGet("GetCourses")]
        public string GetCourses()
        {
            try
            {
                con.Open();

                // Check if the table exists, create it if not
                CheckAndCreateCourseTable();

                MySqlCommand cmd = new MySqlCommand("SELECT * FROM course", con);
                MySqlDataAdapter adapter = new MySqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                adapter.Fill(dt);

                CourseResponseMessageClass response = new CourseResponseMessageClass();
                List<GetCourseClass> courseList = new List<GetCourseClass>();

                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        GetCourseClass getCourse = new GetCourseClass();
                        getCourse.CourseID = Convert.ToString(dt.Rows[i]["course_id"]);
                        getCourse.CourseName = Convert.ToString(dt.Rows[i]["course_name"]);
                        getCourse.Instructor = Convert.ToString(dt.Rows[i]["instructor"]);
                        getCourse.Credits = Convert.ToInt32(dt.Rows[i]["credits"]);
                        courseList.Add(getCourse);
                    }

                    if (courseList.Count > 0)
                    {
                        response.Status = "200";
                        response.Data = JsonConvert.SerializeObject(courseList);
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

        [HttpPost("InsertCourse")]
        public string PostCourse(CourseClass course)
        {
            CourseResponseMessageClass response = new CourseResponseMessageClass();
            string courseId = Guid.NewGuid().ToString();

            // Check if the table exists, create it if not
            CheckAndCreateCourseTable();

            MySqlCommand cmd = new MySqlCommand($"INSERT INTO course (course_id, course_name, instructor, credits) VALUES ('{courseId}', '{course.CourseName}', '{course.Instructor}', {course.Credits})", con);

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
                    response.Message = "Course Cannot be Inserted";
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

        // Add this method to check and create the "course" table if not exists
        private void CheckAndCreateCourseTable()
        {
            try
            {
                con.Open();

                MySqlCommand cmd = new MySqlCommand(
                    "CREATE TABLE IF NOT EXISTS course (" +
                    "course_id VARCHAR(36) NOT NULL PRIMARY KEY," +
                    "course_name VARCHAR(255) NOT NULL," +
                    "instructor VARCHAR(255) NOT NULL," +
                    "credits INT NOT NULL)", con);

                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                // Handle the exception or log the error
                Console.WriteLine($"Error checking/creating 'course' table: {ex.Message}");
            }
            finally
            {
                con.Close();
            }
        }

        [HttpGet("FindCourse/{id}")]
        public string GetCourse(string id)
        {
            CourseResponseMessageClass response = new CourseResponseMessageClass();

            MySqlDataAdapter adapter = new MySqlDataAdapter($"SELECT * FROM course WHERE course_id = '{id}'", con);

            DataTable dt = new DataTable();

            adapter.Fill(dt);
            List<GetCourseClass> courseEditList = new List<GetCourseClass>();

            if (dt.Rows.Count > 0)
            {
                response.Data = JsonConvert.SerializeObject(dt);
                response.Status = "200";

                return JsonConvert.SerializeObject(response);
            }
            else
            {
                response.Status = "404";
                return JsonConvert.SerializeObject(response);
            }
        }

        [HttpPut("UpdateCourse/{id}")]
        public string PutCourse(string id, CourseClass course)
        {
            CourseResponseMessageClass response = new CourseResponseMessageClass();

            MySqlCommand cmd = new MySqlCommand($"UPDATE course SET course_name = '{course.CourseName}', instructor = '{course.Instructor}', credits = {course.Credits} WHERE course_id = '{id}'", con);

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
                    response.Message = "Course Cannot be Updated";
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

        [HttpDelete("DeleteCourse/{id}")]
        public string DeleteCourse(string id)
        {
            CourseResponseMessageClass response = new CourseResponseMessageClass();
            MySqlCommand cmd = new MySqlCommand($"DELETE FROM course WHERE course_id = '{id}'", con);

            try
            {
                con.Open();
                int i = cmd.ExecuteNonQuery();

                if (i > 0)
                {
                    response.Status = "200";
                    response.Message = "Course Deleted Successfully";
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
