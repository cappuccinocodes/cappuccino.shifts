using System.Collections.Generic;
using api.Entities;

namespace api.Data.Repositories
{
    public interface IShiftRepository
    {
        IEnumerable<Shift> GetShifts();  
        Shift GetShift(int shiftId);    
        void AddShift(Shift shift);  
        void DeleteShift(Shift shift);  
        void UpdateShift(Shift shift);
        bool Save();
    }
}