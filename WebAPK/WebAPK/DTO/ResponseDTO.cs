namespace WebAPK.DTO
{
    public class ResponseDTO
    {
        public string Token { get; set; } = null;
        public string Result { get; set; }

        public ResponseDTO(string message) {
            Result= message;
        }
        public ResponseDTO(string token,string message)
        {
            Result = message;
            Token = token;
        }
    }
}
