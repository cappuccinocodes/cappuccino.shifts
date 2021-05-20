using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class Shift
    {
        [Key]  
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]    
        public int Id { get; set; }
        public int EmployerId {get; set; }
        public Employer Employer { get; set; }
        public int LocationId {get; set; }
        public Location Location { get; set; }

        public DateTime Start1 {get; set; }
        public DateTime End1 {get; set; }
        public TimeSpan? Duration1 {get; set; }
        public decimal Penalty1 {get; set;}

        public DateTime? Start2 {get; set; }
        public DateTime? End2 {get; set; }
        public TimeSpan? Duration2 {get; set; }
        public decimal? Penalty2 {get; set;}
        
        public DateTime? Start3 {get; set; }
        public DateTime? End3 {get; set; }
        public TimeSpan? Duration3 {get; set; }
        public decimal? Penalty3 {get; set;}
        
        public DateTime ShiftStart { get; set; }
        public DateTime ShiftEnd { get; set; }
        public TimeSpan ShiftDuration { get; set; }
        public decimal Rate{get; set;}
        public decimal? Money { get; set; }
        public Boolean? Paid { get; set; }
    }
}