﻿using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FloweryWaw.Pages
{
    public class Subscribe : PageModel
    {
        public static string ReturningJson { get; set; } = "{}";
        
        [BindProperty]
        public string Name { get; set; }
        
        public void OnGet()
        {
            
        }
        
        public IActionResult OnPost(string email)
        {
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress("lubiekwiatki2020@gmail.com");
                mail.To.Add(new MailAddress(email));
                mail.Subject = "New user wants to subscribe!";
                mail.Body = "Add me to your mailing list: " + email;
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