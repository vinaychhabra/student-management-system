using System;
using System.Data;
using System.Security.Cryptography;
using System.Text;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        MySqlConnection con = new MySqlConnection("server=localhost;user=root;persistsecurityinfo=True;database=sms_db;password=''");

        // Method to hash passwords using SHA-256
        public static string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }

        [HttpPost("Registration")]
        public string Registration(UserClass user)
        {
            UserResponceMessageClass response = new UserResponceMessageClass();

            string Id = Guid.NewGuid().ToString();

            MySqlCommand cmd = new MySqlCommand("INSERT INTO Users (user_id, email, username, password, address, phone_no, user_role)" +
                "VALUES(@Id, @Email, @UserName, @Password, @Address, @PhoneNumber, @UserRole)", con);

            cmd.Parameters.AddWithValue("@Id", Id);
            cmd.Parameters.AddWithValue("@Email", user.Email);
            cmd.Parameters.AddWithValue("@UserName", user.UserName);

            // Hash the password before storing it
            string hashedPassword = HashPassword(user.Password);
            cmd.Parameters.AddWithValue("@Password", hashedPassword);

            cmd.Parameters.AddWithValue("@Address", user.Address);
            cmd.Parameters.AddWithValue("@PhoneNumber", user.PhoneNumber);
            cmd.Parameters.AddWithValue("@UserRole", user.UserRole);

            try
            {
                con.Open();
                int i = cmd.ExecuteNonQuery();

                if (i > 0)
                {
                    response.Status = "200";
                    response.Message = "Successfully Registered";
                    response.UserName = user.UserName;
                    response.Token = Id;
                    response.Role = user.UserRole;

                    return JsonConvert.SerializeObject(response);
                }
                else
                {
                    response.Status = "400";
                    response.Message = "User Cannot Register";

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

        [HttpPost("Login")]
        public string Login(LoginClass user)
        {
            UserResponceMessageClass response = new UserResponceMessageClass();
            MySqlCommand cmd = new MySqlCommand("SELECT * FROM Users WHERE email = @Email", con);

            cmd.Parameters.AddWithValue("@Email", user.Email);

            // Hash the entered password for comparison
            string hashedEnteredPassword = HashPassword(user.Password);
            cmd.Parameters.AddWithValue("@Password", hashedEnteredPassword);

            try
            {
                con.Open();
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        // User found, fetch data
                        string userId = reader["user_id"].ToString();
                        string userName = reader["username"].ToString();
                        string userRole = reader["user_role"].ToString();

                        response.Status = "200";
                        response.Message = "Successfully Login";
                        response.UserName = userName;
                        response.Token = userId;
                        response.Role = userRole;

                        // Close the first DataReader before executing the second query
                        reader.Close();

                        MySqlDataAdapter da = new MySqlDataAdapter("SELECT * FROM Users WHERE email = @Email AND password = @Password", con);

                        da.SelectCommand.Parameters.AddWithValue("@Email", user.Email);
                        da.SelectCommand.Parameters.AddWithValue("@Password", hashedEnteredPassword);

                        DataTable dt = new DataTable();

                        da.Fill(dt);
                        if (dt.Rows.Count > 0)
                        {
                            response.Data = JsonConvert.SerializeObject(dt);
                        }

                        return JsonConvert.SerializeObject(response);
                    }
                    else
                    {
                        // User not found
                        response.Status = "400";
                        response.Message = "Invalid Credentials";

                        return JsonConvert.SerializeObject(response);
                    }
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
