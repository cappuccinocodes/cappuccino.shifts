using System;
using System.Collections.Generic;
using System.Linq;
using api.Data;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Repositories
{
    public class EmployerRepository: IEmployerRepository, IDisposable
    {
        private readonly DataContext _context;

        public EmployerRepository(DataContext context )
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }


        public IEnumerable<Employer> GetEmployers()
        {

            return _context.EmployersPortfolio
            .Include(c => c.Shifts)
            .OrderBy(s => s.Id)
            .ToList();
        }

         public Employer GetEmployer(int employerId)
        {
            return _context.EmployersPortfolio.FirstOrDefault(c => c.Id == employerId);
        }

        public void AddEmployer(Employer employer)
        {
            if (employer == null)
            {
                throw new ArgumentNullException(nameof(Employer));
            }

            _context.EmployersPortfolio.Add(employer);
        }

        public void DeleteEmployer(Employer Employer)
        {
            _context.EmployersPortfolio.Remove(Employer);
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