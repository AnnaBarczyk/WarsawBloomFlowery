using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace FloweryWaw.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }

        public void OnPost()
        {
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress("lubiekwiatki@gmail.com");
                mail.To.Add("dzolwlive@gmail.com");
                mail.Subject = "Hello";
                mail.Body = "Body hello";
                mail.IsBodyHtml = true;
                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.Credentials = new NetworkCredential("lubiekwiatki2020@gmail.com", "lubiekwiatki");
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                    // label1.Text = "Mail sent"
                }
            }
        }
    }
}
