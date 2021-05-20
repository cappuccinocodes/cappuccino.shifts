using System;
using System.ComponentModel.DataAnnotations;

namespace api.Entities.DTOs
{
    public class ShiftForCreationDto
    {   
        public int EmployerId {get; set; }
        public int LocationId {get; set; }
        public DateTime Start1 {get; set; }
        public DateTime End1 {get; set; }
        public decimal Penalty1 {get; set;}
        public DateTime? Start2 {get; set; }
        public DateTime? End2 {get; set; }
        public decimal? Penalty2 {get; set;}
        public DateTime? Start3 {get; set; }
        public DateTime? End3 {get; set; }
        public decimal? Penalty3 {get; set;}
        public decimal Rate{get; set;}
        public Boolean Paid { get; set; }
    }
}