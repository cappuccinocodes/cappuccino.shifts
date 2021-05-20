using System;
using System.Collections.Generic;
using System.Linq;
using api.Entities;
using api.Helpers;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Repositories
{
    public class ShiftRepository: IShiftRepository, IDisposable
    {
        private readonly DataContext _context;
        private CalculateDuration calculateDuration = new CalculateDuration();
        private CalculateMoney calculateMoney = new CalculateMoney();

        public ShiftRepository(DataContext context )
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public IEnumerable<Shift> GetShifts()
        {

            return _context.ShiftsPortfolio
            .Include(s => s.Employer)
            .Include(s => s.Location)
            .OrderBy(s => s.ShiftStart)
            .ToList();
        }

        public Shift GetShift(int shiftId)
        {
            return _context.ShiftsPortfolio
            .Include(s => s.Employer)
            .Include(s => s.Location)
            .FirstOrDefault(t => t.Id == shiftId)
            ;
        }

        public void AddShift(Shift shift)
        {
            decimal duration2Decimal = 0;
            decimal duration3Decimal = 0;

            if (shift.Start2 == null) {
            shift.Start2 = DateTime.MinValue; 
            shift.End2 = DateTime.MinValue; 
            shift.ShiftStart = shift.Start1;
            } else {
                 shift.ShiftStart = calculateDuration.calculateStart((DateTime)shift.Start1, (DateTime)shift.Start2, (DateTime)shift.Start3);
            }

            if (shift.Start3 == null) {
            shift.Start3 = DateTime.MinValue; 
            shift.End3 = DateTime.MinValue; 
            }

            if (shift == null)
            {
                throw new ArgumentNullException(nameof(shift));
            }

            decimal duration1Decimal = calculateDuration.getDurationDecimal((DateTime)shift.Start1, (DateTime) shift.End1);
            duration2Decimal = calculateDuration.getDurationDecimal((DateTime)shift.Start2, (DateTime) shift.End2);
            duration3Decimal = calculateDuration.getDurationDecimal((DateTime)shift.Start3, (DateTime) shift.End3);
            shift.Duration3 = calculateDuration.getDurationTimeSpan((DateTime)shift.Start3, (DateTime) shift.End3);
            
           
    
            shift.Money = calculateMoney.getMoney(duration1Decimal, duration2Decimal, duration3Decimal, shift.Penalty1, shift.Penalty2, shift.Penalty3, shift.Rate);
            
            shift.Duration1 = calculateDuration.getDurationTimeSpan((DateTime)shift.Start1, (DateTime) shift.End1);
            shift.Duration2 = calculateDuration.getDurationTimeSpan((DateTime)shift.Start2, (DateTime) shift.End2);

            shift.ShiftEnd = calculateDuration.calculateEnd((DateTime)shift.End1, (DateTime) shift.End2, (DateTime)shift.End3);
            shift.ShiftDuration = calculateDuration.getShiftDuration((TimeSpan)shift.Duration1, (TimeSpan)shift.Duration2, (TimeSpan)shift.Duration3);
            
        
            Console.WriteLine ("Posted shift = " + shift.ShiftStart);
            // Console.WriteLine ("ShiftEnd = " + shift.ShiftEnd);
            // Console.WriteLine ("ShiftDuration = " + shift.ShiftDuration);
            


            _context.ShiftsPortfolio.Add(shift);
        }

        public void DeleteShift(Shift Shift)
        {
            _context.ShiftsPortfolio.Remove(Shift);
        }

        public void UpdateShift (Shift shift) {
            decimal duration2Decimal = 0;
            decimal duration3Decimal = 0;

            if (shift.Start2 == null) {
            shift.Start2 = DateTime.MinValue; 
            shift.End2 = DateTime.MinValue; 
            shift.ShiftStart = shift.Start1;
            } else {
                 shift.ShiftStart = calculateDuration.calculateStart((DateTime)shift.Start1, (DateTime)shift.Start2, (DateTime)shift.Start3);
            }

            if (shift.Start3 == null) {
            shift.Start3 = DateTime.MinValue; 
            shift.End3 = DateTime.MinValue; 
            }

            if (shift == null)
            {
                throw new ArgumentNullException(nameof(shift));
            }

            decimal duration1Decimal = calculateDuration.getDurationDecimal((DateTime)shift.Start1, (DateTime) shift.End1);
            duration2Decimal = calculateDuration.getDurationDecimal((DateTime)shift.Start2, (DateTime) shift.End2);
            duration3Decimal = calculateDuration.getDurationDecimal((DateTime)shift.Start3, (DateTime) shift.End3);
            shift.Duration3 = calculateDuration.getDurationTimeSpan((DateTime)shift.Start3, (DateTime) shift.End3);
            
           
    
            shift.Money = calculateMoney.getMoney(duration1Decimal, duration2Decimal, duration3Decimal, shift.Penalty1, shift.Penalty2, shift.Penalty3, shift.Rate);
            
            shift.Duration1 = calculateDuration.getDurationTimeSpan((DateTime)shift.Start1, (DateTime) shift.End1);
            shift.Duration2 = calculateDuration.getDurationTimeSpan((DateTime)shift.Start2, (DateTime) shift.End2);

            shift.ShiftEnd = calculateDuration.calculateEnd((DateTime)shift.End1, (DateTime) shift.End2, (DateTime)shift.End3);
            shift.ShiftDuration = calculateDuration.getShiftDuration((TimeSpan)shift.Duration1, (TimeSpan)shift.Duration2, (TimeSpan)shift.Duration3);
            
        
            Console.WriteLine ("Posted shift = " + shift.ShiftStart);
            // Console.WriteLine ("ShiftEnd = " + shift.ShiftEnd);
            // Console.WriteLine ("ShiftDuration = " + shift.ShiftDuration);
            


            _context.ShiftsPortfolio.Update(shift);
            
        }
        
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
               // dispose resources when needed
            }
        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}