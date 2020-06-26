using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

namespace FloweryWaw.Pages
{
    public class IndexModel : PageModel
    {
        [BindProperty]
        public string Name { get; set; }
        [BindProperty]
        public string Email { get; set; }
        [BindProperty]
        public string Message { get; set; }
        [BindProperty]
        public string Subject { get; set; }

        public static string ReturningJson { get; set; } = "{}";

        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }

        public IActionResult OnPost(string email, string name, string message)
        {
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress(email, name);
                mail.To.Add(new MailAddress("lubiekwiatki2020@gmail.com"));
                mail.Subject = "New email from user: " + name;
                mail.Body = message;
                mail.IsBodyHtml = true;
                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.Credentials = new NetworkCredential("lubiekwiatki2020@gmail.com", "lubiekwiatki");
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                }
            }

            return new ContentResult { Content = ReturningJson, ContentType = "application/json" };
        }

    }
}
