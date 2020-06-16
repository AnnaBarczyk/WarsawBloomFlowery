using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public string Subject { get; set; }

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
                MailAddress MailTo = new MailAddress(Email, "From");
                mail.From = new MailAddress("lubiekwiatki2020@gmail.com", "Kwiaciarnia");
                mail.To.Add(MailTo);
                mail.Subject = Subject;
                mail.Body = Message;
                mail.IsBodyHtml = true;
                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.Credentials = new NetworkCredential("lubiekwiatki2020@gmail.com", "lubiekwiatki");
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                }
            }
        }
    }
}
