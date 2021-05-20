using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class Employer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]  
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Shift> Shifts { get; set; }
    }
}