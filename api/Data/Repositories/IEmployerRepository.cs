using System.Collections.Generic;
using api.Entities;

namespace api.Data.Repositories
{
    public interface IEmployerRepository
    {
        IEnumerable<Employer> GetEmployers();
        Employer GetEmployer(int employerId);
        void AddEmployer(Employer employer);
        void DeleteEmployer(Employer employer);
        bool Save(); 
    }
}