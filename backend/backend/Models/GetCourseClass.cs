namespace backend.Models
{
    public class GetCourseClass
    {
        public string CourseID { get; set; } = string.Empty;
        public string CourseName { get; set; } = string.Empty;
        public string Instructor { get; set; } = string.Empty;
        public int Credits { get; set; }
    }
}
