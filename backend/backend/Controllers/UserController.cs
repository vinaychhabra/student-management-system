using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        MySqlConnection con = new MySqlConnection("server=localhost;user=root;persistsecurityinfo=True;database=sms_db;password=''");

        [HttpPost("Registration")]
        public string Registration(UserClass user)
        {
            UserResponceMessageClass responce = new UserResponceMessageClass();

            string Id = Guid.NewGuid().ToString();

            MySqlCommand cmd = new MySqlCommand("INSERT INTO Users (user_id, email, username, password, address, phone_no, user_role)" +
                "VALUES(@Id, @Email, @UserName, @Password, @Address, @PhoneNumber, @UserRole)", con);

            cmd.Parameters.AddWithValue("@Id", Id);
            cmd.Parameters.AddWithValue("@Email", user.Email);
            cmd.Parameters.AddWithValue("@UserName", user.UserName);
            cmd.Parameters.AddWithValue("@Password", user.Password);
            cmd.Parameters.AddWithValue("@Address", user.Address);
            cmd.Parameters.AddWithValue("@PhoneNumber", user.PhoneNumber);
            cmd.Parameters.AddWithValue("@UserRole", user.UserRole);

            try
            {
                con.Open();
                int i = cmd.ExecuteNonQuery();

                if (i > 0)
                {
                    responce.Status = "200";
                    responce.Message = "Successfully Login";
                    responce.UserName = user.UserName;
                    responce.Token = Id;
                    responce.Role = user.UserRole;

                    return JsonConvert.SerializeObject(responce);
                }
                else
                {
                    responce.Status = "400";
                    responce.Message = "User Cannot Register";

                    return JsonConvert.SerializeObject(responce);
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
            UserResponceMessageClass responce = new UserResponceMessageClass();
            MySqlCommand cmd = new MySqlCommand("SELECT * FROM Users WHERE email = @Email AND password = @Password", con);

            cmd.Parameters.AddWithValue("@Email", user.Email);
            cmd.Parameters.AddWithValue("@Password", user.Password);

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

                        responce.Status = "200";
                        responce.Message = "Successfully Login";
                        responce.UserName = userName;
                        responce.Token = userId;
                        responce.Role = userRole;

                        // Close the first DataReader before executing the second query
                        reader.Close();

                        MySqlDataAdapter da = new MySqlDataAdapter("SELECT * FROM Users WHERE email = @Email AND password = @Password", con);

                        da.SelectCommand.Parameters.AddWithValue("@Email", user.Email);
                        da.SelectCommand.Parameters.AddWithValue("@Password", user.Password);

                        DataTable dt = new DataTable();

                        da.Fill(dt);
                        if (dt.Rows.Count > 0)
                        {
                            responce.Data = JsonConvert.SerializeObject(dt);
                        }

                        return JsonConvert.SerializeObject(responce);
                    }
                    else
                    {
                        // User not found
                        responce.Status = "400";
                        responce.Message = "Invalid Credentials";

                        return JsonConvert.SerializeObject(responce);
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
